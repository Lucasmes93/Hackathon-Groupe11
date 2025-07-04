import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
 
const FaceRecognition = () => {
  const webcamRef = useRef<any>();
  const canvasRef = useRef<any>();
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [faceMatcher, setFaceMatcher] = useState<faceapi.FaceMatcher | null>(null);
  const [lastRecognized, setLastRecognized] = useState<string | null>(null);
  const navigate = useNavigate();
 

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = import.meta.env.BASE_URL + "models";
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        ]);
        setModelsLoaded(true);
        console.log("✅ Modèles chargés !");
      } catch (error) {
        console.error("❌ Erreur chargement des modèles :", error);
      }
    };
    loadModels();
  }, []);
 

  useEffect(() => {
    const loadKnownFaces = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/pictures`);
        const data: string[] = await response.json();
        console.log("🔍 Données visages chargées :", data);
 
        const descriptions: faceapi.LabeledFaceDescriptors[] = [];
 
        for (const url of data) {
          if (!url || typeof url !== 'string') {
            console.warn(`❌ URL invalide : ${url}`);
            continue;
          }
 
          const fileName = url.split("/").pop();
          const label = fileName?.split(".")[0] ?? "unknown";
 
          try {
            const img = await faceapi.fetchImage(url);
 
            const detection = await faceapi
              .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
              .withFaceLandmarks()
              .withFaceDescriptor();
 
            if (!detection) {
              console.warn(`⚠️ Aucun visage détecté pour ${label}`);
              continue;
            }
 
            descriptions.push(new faceapi.LabeledFaceDescriptors(label, [detection.descriptor]));
          } catch (err) {
            console.error(`❌ Erreur chargement image ${url}`, err);
          }
        }
 
        if (descriptions.length > 0) {
          setFaceMatcher(new faceapi.FaceMatcher(descriptions, 0.6));
          console.log("✅ Visages connus chargés");
        }
      } catch (error) {
        console.error("❌ Erreur chargement visages :", error);
      }
    };
 
    if (modelsLoaded) loadKnownFaces();
  }, [modelsLoaded]);
 
 
  useEffect(() => {
    if (!modelsLoaded || !faceMatcher) return;
 
    const interval = setInterval(async () => {
      const video = webcamRef.current?.video;
      if (!video || video.readyState !== 4) return;
 
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptors();
 
      const canvas = canvasRef.current;
      faceapi.matchDimensions(canvas, {
        width: video.videoWidth,
        height: video.videoHeight,
      });
 
      const resized = faceapi.resizeResults(detections, {
        width: video.videoWidth,
        height: video.videoHeight,
      });
 
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
 
      resized.forEach((detection) => {
        const box = detection.detection.box;
        const bestMatch = faceMatcher.findBestMatch(detection.descriptor);
        const label = bestMatch.label;
        const labelWithDistance = bestMatch.toString();
 
        if (label !== lastRecognized) {
          const synth = window.speechSynthesis;
          synth.cancel();
 
          if (label !== "unknown") {
            console.log(`✅ ${label} reconnu`);
            synth.speak(new SpeechSynthesisUtterance("Accès autorisé - Merci d'entrer"));
            navigate('/access-granted')
          } else {
            console.warn("❌ Visage inconnu - Accès interdit");
            synth.speak(new SpeechSynthesisUtterance("Visage inconnu - Accès interdit"));
          }
          setLastRecognized(label);
        }
 
        const drawBox = new faceapi.draw.DrawBox(box, {
          label: labelWithDistance,
          boxColor: label === "unknown" ? "red" : "green",
          lineWidth: 3,
        });
        drawBox.draw(canvas);
      });
    }, 1000);
 
    return () => clearInterval(interval);
  }, [modelsLoaded, faceMatcher, lastRecognized]);
 
  return (
    <div className="app-container">
      <div className="card-container">
        <div className="camera-container">
          <Webcam ref={webcamRef} audio={false} className="webcam" />
          <canvas ref={canvasRef} className="canvas" />
        </div>
        <p className="scan-invite">Veuillez scanner votre visage</p>
      </div>
 
      <style>{`
        .app-container {
          text-align: center;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding: 60px 0 40px 0;
         
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
 
        .app-title {
          margin-bottom: 10px;
          font-size: 2.5rem;
          color: #222;
          font-weight: bold;
          letter-spacing: 1px;
          text-shadow: 0 2px 8px rgba(94,47,192,0.08);
        }
 
        .scan-invite {
          font-size: 1.3rem;
          color: #fff;
          margin-top: 28px;
          font-weight: 500;
          letter-spacing: 0.5px;
          background: #ff5500;
          padding: 10px 28px;
          border-radius: 24px;
          border: 3px solid #ff5500;
          box-shadow: 0 2px 8px rgba(255,85,0,0.07);
          display: inline-block;
        }
 
        .card-container {
          background: transparent;
          border-radius: 32px;
          box-shadow: 0 10px 32px rgba(94,47,192,0.10), 0 2px 8px rgba(0,0,0,0.08);
          padding: 48px 48px 40px 48px;
          margin-bottom: 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
 
        .camera-container {
          position: relative;
          margin: 0 auto;
          width: 520px;
          height: 520px;
          box-shadow: 0 10px 32px rgba(255,85,0,0.18), 0 2px 8px rgba(0,0,0,0.08);
          border-radius: 50%;
          overflow: hidden;
          background: #ff5500;
          border: 8px solid #ff5500;
          display: flex;
          align-items: center;
          justify-content: center;
        }
 
        .webcam {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
          filter: brightness(1.08) contrast(1.08);
        }
 
        .canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
};
 
export default FaceRecognition;