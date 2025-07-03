import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";
import Webcam from "react-webcam";

const FaceRecognition = () => {
  const webcamRef = useRef<any>();
  const canvasRef = useRef<any>();
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [faceMatcher, setFaceMatcher] = useState<faceapi.FaceMatcher | null>(null);
  const [lastRecognized, setLastRecognized] = useState<string | null>(null);

  // Chargement des modèles
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

  // Chargement des visages connus
  // Chargement des visages connus
useEffect(() => {
  const loadKnownFaces = async () => {
    try {
      const response = await fetch("http://localhost:8000/pictures");
      const data: string[] = await response.json();
      console.log("🔍 Données visages chargées :", data);

      const descriptions: faceapi.LabeledFaceDescriptors[] = [];

      for (const url of data) {
        if (!url || typeof url !== 'string') {
          console.warn(`❌ URL invalide : ${url}`);
          continue;
        }

        const fileName = url.split("/").pop(); // ex: "Yvann_De Souza_1751467128.jpg"
        const label = fileName?.split(".")[0] ?? "unknown"; // remove .jpg

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

  // Détection live
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
      <div className="camera-container">
        <Webcam ref={webcamRef} audio={false} className="webcam" />
        <canvas ref={canvasRef} className="canvas" />
      </div>

      <style>{`
        .app-container {
          text-align: center;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding: 30px;
          background: linear-gradient(135deg, #5e2fc0 100%, #f6f4ff 0%);
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
          background: linear-gradient(135deg, #5e2fc0 0%, #f6f4ff 100%);        }

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