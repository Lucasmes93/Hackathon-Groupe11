import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";
import Webcam from "react-webcam";

const FaceRecognition = () => {
  const webcamRef = useRef();
  const canvasRef = useRef();
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [faceMatcher, setFaceMatcher] = useState(null);
  const [lastRecognized, setLastRecognized] = useState(null);

  // Chargement des modèles
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + "/models";
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
  useEffect(() => {
    const loadKnownFaces = async () => {
      const labels = ["Lucas", "Iles"];
      const descriptions = [];

      for (const label of labels) {
        try {
          const imageUrl = `${process.env.PUBLIC_URL}/known/${label}.jpg`;
          const img = await faceapi.fetchImage(imageUrl);

          const detection = await faceapi
            .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceDescriptor();

          if (!detection) {
            console.warn(`Aucun visage détecté pour ${label}`);
            continue;
          }

          descriptions.push(
            new faceapi.LabeledFaceDescriptors(label, [detection.descriptor])
          );
        } catch (error) {
          console.error(`Erreur pour ${label} :`, error);
        }
      }

      if (descriptions.length > 0) {
        const matcher = new faceapi.FaceMatcher(descriptions, 0.6);
        setFaceMatcher(matcher);
        console.log("✅ Visages connus chargés");
      } else {
        console.warn("⚠️ Aucun visage connu chargé.");
      }
    };

    if (modelsLoaded) loadKnownFaces();
  }, [modelsLoaded]);

  // Détection en live
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
        const label = bestMatch.toString();
        const synth = window.speechSynthesis;

        // ✅ Reconnue
        if (!label.includes("unknown") && label !== lastRecognized) {
          console.log(`✅ ${label} reconnu`);
          synth.cancel();
          synth.speak(
            new SpeechSynthesisUtterance("Accès autorisé - Merci d’entrer")
          );
          setLastRecognized(label);
        }

        // ❌ Inconnue
        if (label.includes("unknown") && lastRecognized !== "unknown") {
          console.warn("❌ Visage inconnu - Accès interdit");
          synth.cancel();
          synth.speak(
            new SpeechSynthesisUtterance("Visage inconnu - Accès interdit")
          );
          setLastRecognized("unknown");
        }

        // 🎯 Couleur cadre
        const boxColor = label.includes("unknown") ? "red" : "green";

        const drawBox = new faceapi.draw.DrawBox(box, {
          label,
          boxColor,
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

      {/* CSS intégré */}
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
