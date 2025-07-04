import React, { useState, useRef, useContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    error: "Erreur lors de l'inscription"
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
    error: "Registration error"
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
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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
    setWebcamKey(prev => prev + 1);
  };

  const uploadPhotoToServer = async (photoData: string, nom: string, prenom: string) => {
    try {
      const blob = await fetch(photoData).then(res => res.blob());
      const formData = new FormData();
      formData.append('name', nom);
      formData.append('surname', prenom);
      formData.append('image', blob, `student_${Date.now()}.jpg`);

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const result = await response.json();
      return result.filePath;
    } catch (error) {
      console.error('Error uploading photo:', error);
      throw error;
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      alert(t.alertConsent);
      return;
    }
    setIsSubmitting(true);

    try {
      let photoUrl = '';
      if (formData.photo) {
        photoUrl = await uploadPhotoToServer(formData.photo, formData.nom, formData.prenom);
      }

      const requestBody = {
        Nom: formData.nom,
        Prenom: formData.prenom,
        Email: formData.email,
        Date_de_naissance: formData.dateNaissance,
        Photo: photoUrl
      };

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/students/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || t.error);
      }

      await response.json();
      toast.success(t.alertSuccess);
      setFormData({ nom: '', prenom: '', dateNaissance: '', email: '', photo: '' });
      setConsent(false);
      navigate("/facerecognition");
    } catch (error) {
      console.error('Error:', error);
      toast.error(
        typeof error === 'object' && error !== null && 'message' in error
          ? (error as { message: string }).message
          : t.error
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles['register-outer']}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className={styles['header-full']}><Header /></div>
      <div className={styles['register-container']}>
        <h2 className={styles['register-title']}>{t.title}</h2>
        <form onSubmit={handleSubmit} className={styles['register-form']}>
          <div className={styles['form-group']}>
            <label htmlFor="nom">{t.lastName} <span className={styles.required}>*</span>:</label>
            <input type="text" id="nom" name="nom" value={formData.nom} onChange={handleChange} required className={styles.input} />
          </div>
          <div className={styles['form-group']}>
            <label htmlFor="prenom">{t.firstName} <span className={styles.required}>*</span>:</label>
            <input type="text" id="prenom" name="prenom" value={formData.prenom} onChange={handleChange} required className={styles.input} />
          </div>
          <div className={styles['form-group']}>
            <label htmlFor="dateNaissance">{t.birthDate} <span className={styles.required}>*</span>:</label>
            <input type="date" id="dateNaissance" name="dateNaissance" value={formData.dateNaissance} onChange={handleChange} required className={styles.input} />
          </div>
          <div className={styles['form-group']}>
            <label htmlFor="email">{t.email} <span className={styles.required}>*</span>:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className={styles.input} />
          </div>
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
                <Webcam key={webcamKey} audio={false} ref={webcamRef} screenshotFormat="image/jpeg" className={styles['webcam']} />
                <button type="button" onClick={capturePhoto} className={styles['capture-btn']}>
                  {t.capture}
                </button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div className={styles['drop-area']} onDrop={handleDrop} onDragOver={handleDragOver}>
                  <p>{lang === 'fr' ? 'Glissez-déposez une photo ici ou sélectionnez un fichier' : 'Drag & drop a photo or select a file'}</p>
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} id="upload" hidden />
                  <label htmlFor="upload">{lang === 'fr' ? 'Sélectionner une photo' : 'Select a photo'}</label>
                </div>
              </>
            )}
          </div>
          <div className={styles['consent-group']}>
            <input type="checkbox" id="consent" checked={consent} onChange={e => setConsent(e.target.checked)} required />
            <label htmlFor="consent">
              {t.consent}
              <a href="/conditions" target="_blank" rel="noopener noreferrer">{t.conditions}</a>.
            </label>
          </div>
          <div className={styles['submit-group']}>
            <button type="submit" className={styles['submit-btn']} disabled={isSubmitting}>
              {isSubmitting ? 'Processing...' : t.submit}
            </button>
          </div>
        </form>
      </div>
      <div className={styles['footer-full']}><Footer /></div>
    </div>
  );
};

export default Register;
