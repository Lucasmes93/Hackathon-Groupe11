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
  const [consent, setConsent] = useState<boolean>(false);

  const webcamRef = useRef<Webcam>(null);
  const navigate = useNavigate();

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
      <div className={styles['header-full']}>
        <Header />
      </div>
      <div className={styles['register-container']}>
        <h2 className={styles['register-title']}>{t.title}</h2>
        <form onSubmit={handleSubmit} className={styles['register-form']}>
          <div className={styles['form-group']}>
            <label>{t.lastName} <span className={styles.required}>*</span>:</label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              required
              className={styles['input']}
            />
          </div>
          <div className={styles['form-group']}>
            <label>{t.firstName} <span className={styles.required}>*</span>:</label>
            <input
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              required
              className={styles['input']}
            />
          </div>
          <div className={styles['form-group']}>
            <label>{t.birthDate} <span className={styles.required}>*</span>:</label>
            <input
              type="date"
              name="dateNaissance"
              value={formData.dateNaissance}
              onChange={handleChange}
              required
              className={styles['input']}
            />
          </div>
          <div className={styles['form-group']}>
            <label>{t.email} <span className={styles.required}>*</span>:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={styles['input']}
            />
          </div>
          <div className={styles['form-group']}>
            <label>{t.takePhoto}:</label>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={300}
              height={200}
              videoConstraints={{ facingMode: 'user' }}
              className={styles['webcam']}
            />
            <button 
              type="button" 
              onClick={capturePhoto} 
              className={styles['capture-btn']}
              disabled={!webcamRef.current}
            >
              {t.capture}
            </button>
          </div>
          {formData.photo && (
            <div className={styles['photo-preview']}>
              <p>{t.preview}:</p>
              <img src={formData.photo} alt="Capture" width={300} />
            </div>
          )}
          <div className={styles['consent-group']}>
            <input
              type="checkbox"
              id="consent"
              checked={consent}
              onChange={e => setConsent(e.target.checked)}
              required
              className={styles['consent-checkbox']}
            />
            <label htmlFor="consent" className={styles['consent-label']}>
              {t.consent}
              <a 
                href="/conditions" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles['conditions-link']}
              >
                {t.conditions}
              </a>.
            </label>
          </div>
          <div className={styles['submit-group']}>
            <button type="submit" className={styles['submit-btn']}>
              {t.submit}
            </button>
          </div>
        </form>
      </div>
      <div className={styles['footer-full']}>
        <Footer />
      </div>
    </div>
  );
};

export default Register;