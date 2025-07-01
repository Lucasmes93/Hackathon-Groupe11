import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';

interface FormData {
  nom: string;
  prenom: string;
  dateNaissance: string;
  photo: string;
}

export const Register: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        nom: '',
        prenom: '',
        dateNaissance: '',
        photo: ''
    });

    const webcamRef = useRef<Webcam>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const capturePhoto = () => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            if (imageSrc) {
                setFormData(prev => ({ ...prev, photo: imageSrc }));
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Données envoyées :', formData);
        alert('Inscription réussie !');
    };

    return (
        <div style={{ maxWidth: 500, margin: 'auto', padding: 20 }}>
            <h2>Inscription Étudiant</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nom :</label><br />
                    <input 
                        type="text" 
                        name="nom" 
                        value={formData.nom} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Prénom :</label><br />
                    <input 
                        type="text" 
                        name="prenom" 
                        value={formData.prenom} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Date de naissance :</label><br />
                    <input 
                        type="date" 
                        name="dateNaissance" 
                        value={formData.dateNaissance} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div style={{ marginTop: 20 }}>
                    <label>Prendre une photo :</label>
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width={300}
                        height={200}
                        videoConstraints={{
                            facingMode: 'user'
                        }}
                    />
                    <br />
                    <button type="button" onClick={capturePhoto}>Capturer</button>
                </div>

                {formData.photo && (
                    <div style={{ marginTop: 20 }}>
                        <p>Prévisualisation de la photo :</p>
                        <img src={formData.photo} alt="Capture" width={300} />
                    </div>
                )}

                <div style={{ marginTop: 20 }}>
                    <button type="submit">S'inscrire</button>
                </div>
            </form>
        </div>
    );
};