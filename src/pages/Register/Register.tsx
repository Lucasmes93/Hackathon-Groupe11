import React, { useState, useRef, useContext } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Webcam from 'react-webcam';
import styles from './Register.module.scss';
import { LangContext } from '../../App';
import type { userFormProps } from '../../types/custom-type';
import { useNavigate } from "react-router-dom";

const translations = {
  fr: {
    title: 'Pré-inscription Étudiant',
    lastName: 'Nom',
    firstName: 'Prénom',
    birthDate: 'Date de naissance',
    email: 'Email',
    takePhoto: 'Prendre une photo',
    capture: 'Capturer',
    preview: 'Prévisualisation de la photo',
    consent: "J'accepte le traitement de mes données personnelles pour l'inscription et j'ai lu les ",
    conditions: "conditions d'utilisation",
    submit: "Envoyer",
    alertConsent: "Vous devez accepter le traitement de vos données pour continuer.",
    alertSuccess: "Inscription réussie !",
    required: 'requis',
  },
  en: {
    title: 'Student Registration',
    lastName: 'Last name',
    firstName: 'First name',
    birthDate: 'Date of birth',
    email: 'Email',
    takePhoto: 'Take a photo',
    capture: 'Capture',
    preview: 'Photo preview',
    consent: 'I accept the processing of my personal data for registration and have read the ',
    conditions: 'terms of use',
    submit: 'Submit',
    alertConsent: 'You must accept the processing of your data to continue.',
    alertSuccess: 'Registration successful!',
    required: 'required',
  }
};

const Register: React.FC = () => {
  const { lang } = useContext(LangContext);
  const t = translations[lang];
  const [formData, setFormData] = useState<userFormProps>({
    nom: '',
    prenom: '',
    dateNaissance: '',
    email: '',
    photo: ''
  });
  const [consent, setConsent] = useState(false);
  const [webcamKey, setWebcamKey] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const webcamRef = useRef<Webcam>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const capturePhoto = () => {
    setError(null);
    const screenshot = webcamRef.current?.getScreenshot();
    if (screenshot) {
      setFormData(prev => ({ ...prev, photo: screenshot }));
    } else {
      setError(lang === 'fr'
        ? "Impossible de capturer l'image. Vérifiez que la webcam est active."
        : "Unable to capture image. Please check that the webcam is active.");
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({ ...prev, photo: event.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({ ...prev, photo: event.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const removePhoto = () => {
    setFormData(prev => ({ ...prev, photo: '' }));
    setWebcamKey(prev => prev + 1); // recharge webcam
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      alert(t.alertConsent);
      return;
    }
    console.log('Submitted data:', formData);
    alert(t.alertSuccess);
    navigate("/facerecognition");
  };

  return (
    <div className={styles['register-outer']}>
      <div className={styles['header-full']}><Header /></div>
      <div className={styles['register-container']}>
        <h2 className={styles['register-title']}>{t.title}</h2>
        <form onSubmit={handleSubmit} className={styles['register-form']}>

          {/* Champs texte explicites */}
          <div className={styles['form-group']}>
            <label htmlFor="nom">{t.lastName} <span className={styles.required}>*</span>:</label>
            <input
              type="text"
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
          <div className={styles['form-group']}>
            <label htmlFor="prenom">{t.firstName} <span className={styles.required}>*</span>:</label>
            <input
              type="text"
              id="prenom"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
          <div className={styles['form-group']}>
            <label htmlFor="dateNaissance">{t.birthDate} <span className={styles.required}>*</span>:</label>
            <input
              type="date"
              id="dateNaissance"
              name="dateNaissance"
              value={formData.dateNaissance}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
          <div className={styles['form-group']}>
            <label htmlFor="email">{t.email} <span className={styles.required}>*</span>:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          {/* Zone webcam/photo */}
          <div className={styles['form-group']}>
            {formData.photo ? (
              <div className={styles['photo-preview']}>
                <p>{t.preview}:</p>
                <img src={formData.photo} alt="Preview" width={220} />
                <button type="button" onClick={removePhoto} className={styles['remove-photo-btn']}>
                  {lang === 'fr' ? 'Supprimer la photo' : 'Remove photo'}
                </button>
              </div>
            ) : (
              <>
                <Webcam
                  key={webcamKey}
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className={styles['webcam']}
                />
                <button
                  type="button"
                  onClick={capturePhoto}
                  className={styles['capture-btn']}
                >
                  {t.capture}
                </button>
                {error && <p style={{ color: 'red' }}>{error}</p>}

                <div
                  className={styles['drop-area']}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  <p>
                    {lang === 'fr'
                      ? 'Glissez-déposez une photo ici ou sélectionnez un fichier'
                      : 'Drag & drop a photo or select a file'}
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    id="upload"
                    hidden
                  />
                  <label htmlFor="upload">
                    {lang === 'fr' ? 'Sélectionner une photo' : 'Select a photo'}
                  </label>
                </div>
              </>
            )}
          </div>

          {/* Consentement */}
          <div className={styles['consent-group']}>
            <input
              type="checkbox"
              id="consent"
              checked={consent}
              onChange={e => setConsent(e.target.checked)}
              required
            />
            <label htmlFor="consent">
              {t.consent}
              <a href="/conditions" target="_blank" rel="noopener noreferrer">
                {t.conditions}
              </a>.
            </label>
          </div>

          {/* Bouton submit */}
          <div className={styles['submit-group']}>
            <button type="submit" className={styles['submit-btn']}>
              {t.submit}
            </button>
          </div>
        </form>
      </div>
      <div className={styles['footer-full']}><Footer /></div>
    </div>
  );
};

export default Register;
