import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";
import Webcam from "react-webcam";
import Header from '../components/Header';
import Footer from '../components/Footer';

const FaceRecognition: React.FC = () => {
    const webcamRef = useRef<Webcam>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [modelsLoaded, setModelsLoaded] = useState<boolean>(false);
    const [faceMatcher, setFaceMatcher] = useState<faceapi.FaceMatcher | null>(null);

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
                console.log("✅ Models loaded!");
            } catch (error) {
                console.error("❌ Error loading models:", error);
            }
        };
        loadModels();
    }, []);

    useEffect(() => {
        const loadKnownFaces = async () => {
            const labels = ["Lucas", "Iles"];
            const descriptions: faceapi.LabeledFaceDescriptors[] = [];

            for (const label of labels) {
                try {
                    const imageUrl = `${process.env.PUBLIC_URL}/known/${label}.jpg`;
                    const img = await faceapi.fetchImage(imageUrl);

                    const detection = await faceapi
                        .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
                        .withFaceLandmarks()
                        .withFaceDescriptor();

                    if (!detection) {
                        console.warn(`No face detected for ${label}`);
                        continue;
                    }

                    descriptions.push(
                        new faceapi.LabeledFaceDescriptors(label, [detection.descriptor])
                    );
                } catch (error) {
                    console.error(`Error loading face for ${label}:`, error);
                }
            }

            if (descriptions.length > 0) {
                const matcher = new faceapi.FaceMatcher(descriptions, 0.6);
                setFaceMatcher(matcher);
                console.log("✅ Known faces loaded");
            } else {
                console.warn("No known faces loaded");
            }
        };

        if (modelsLoaded) loadKnownFaces();
    }, [modelsLoaded]);

    // Live detection
    useEffect(() => {
        if (!modelsLoaded || !faceMatcher) return;

        const interval = setInterval(async () => {
            if (!webcamRef.current || !canvasRef.current) return;

            const video = webcamRef.current.video;
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
            if (!ctx) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            resized.forEach((detection) => {
                const box = detection.detection.box;
                const bestMatch = faceMatcher.findBestMatch(detection.descriptor);
                const drawBox = new faceapi.draw.DrawBox(box, {
                    label: bestMatch.toString(),
                });
                drawBox.draw(canvas);
            });
        }, 500);

        return () => clearInterval(interval);
    }, [modelsLoaded, faceMatcher]);

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#f7f8fa'
        }}>
            <Header />

            <main style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '2rem',
                position: 'relative',
                margin: '2rem 0'
            }}>
                <div style={{
                    position: 'relative',
                    width: '720px',
                    height: '560px',
                    border: '2px solid #5e2fc0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}>
                    <Webcam
                        ref={webcamRef}
                        audio={false}
                        style={{
                            position: "absolute",
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '6px'
                        }}
                    />
                    <canvas
                        ref={canvasRef}
                        style={{
                            position: "absolute",
                            width: '100%',
                            height: '100%',
                            borderRadius: '6px'
                        }}
                    />
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default FaceRecognition;