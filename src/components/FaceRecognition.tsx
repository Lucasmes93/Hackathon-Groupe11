import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";
import Webcam from "react-webcam";

const FaceRecognition = () => {
  const webcamRef = useRef<any>();
  const canvasRef = useRef<any>();
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [faceMatcher, setFaceMatcher] = useState<faceapi.FaceMatcher | null>(null);
  const [lastRecognized, setLastRecognized] = useState<string | null>(null);

  // Chargement des modèles face-api.js
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

  // Chargement des visages connus depuis l'API FastAPI
  useEffect(() => {
    const loadKnownFaces = async () => {
      try {
        const response = await fetch("http://localhost:8000/pictures");
        const data = await response.json();
        const descriptions: faceapi.LabeledFaceDescriptors[] = [];

        for (const item of data) {
          const img = await faceapi.fetchImage(item.url);
          const detection = await faceapi
            .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceDescriptor();

          if (!detection) {
            console.warn(`Aucun visage détecté pour ${item.label}`);
            continue;
          }

          descriptions.push(new faceapi.LabeledFaceDescriptors(item.label, [detection.descriptor]));
        }

        if (descriptions.length > 0) {
          const matcher = new faceapi.FaceMatcher(descriptions, 0.6);
          setFaceMatcher(matcher);
          console.log("✅ Visages connus chargés");
        } else {
          console.warn("⚠️ Aucun visage connu chargé.");
        }
      } catch (error) {
        console.error("Erreur pour le chargement des visages connus :", error);
      }
    };

    if (modelsLoaded) loadKnownFaces();
  }, [modelsLoaded]);

  // Détection en temps réel
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
        const synth = window.speechSynthesis;

        if (label !== lastRecognized) {
          if (label !== "unknown") {
            console.log(`✅ ${label} reconnu`);
            synth.cancel();
            synth.speak(new SpeechSynthesisUtterance("Accès autorisé - Merci d’entrer"));
          } else {
            console.warn("❌ Visage inconnu - Accès interdit");
            synth.cancel();
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
      <h1 className="app-title">🎥 Système de Reconnaissance Faciale</h1>
      <div className="camera-container">
        <Webcam ref={webcamRef} audio={false} className="webcam" />
        <canvas ref={canvasRef} className="canvas" />
      </div>

      <style>{`
        .app-container {
          text-align: center;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding: 30px;
          background: linear-gradient(to right, #1c92d2, #f2fcfe);
          min-height: 100vh;
        }

        .app-title {
          margin-bottom: 30px;
          font-size: 2rem;
          color: #222;
          font-weight: bold;
        }

        .camera-container {
          position: relative;
          margin: 0 auto;
          width: 720px;
          height: 560px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          border-radius: 12px;
          overflow: hidden;
          background-color: #000;
        }

        .webcam {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 12px;
        }

        .canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export default FaceRecognition;
