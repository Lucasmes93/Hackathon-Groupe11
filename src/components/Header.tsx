import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import estiamLogo from '../assets/estiam_logo_header.png';
import flagFr from '../assets/flag_fr.png';
import flagEn from '../assets/flag_en.png';
import { LangContext } from '../App';

const translations = {
  fr: {
    home: 'Accueil',
    register: 'Pré-inscription',
  },
  en: {
    home: 'Home',
    register: 'Register',
  },
};

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { lang, setLang } = useContext(LangContext);
  const t = translations[lang];
  return (
    <header style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', background: '#5e2fc0', borderBottom: '2px solid #5e2fc0', boxShadow: '0 2px 8px rgba(94,47,192,0.05)' }}>
      <img src={estiamLogo} alt="Logo Estiam" style={{ height: 90, width: 'auto', marginRight: 40, zIndex: 2 }} />
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}>
        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff', lineHeight: 1 }}>HackSquad</div>
        <div style={{ fontSize: '1.1rem', color: '#fff', marginTop: 4 }}>Groupe 11</div>
      </div>
      <nav style={{ display: 'flex', alignItems: 'center', gap: '1rem', zIndex: 2 }}>
        <button style={{ marginRight: '1rem', background: '#fff', color: '#5e2fc0', border: 'none', borderRadius: '5px', padding: '0.5rem 1.2rem', fontWeight: 'bold', cursor: 'pointer', transition: 'background 0.2s' }} onClick={() => navigate('/')}>{t.home}</button>
        <button style={{ background: '#ff5500', color: '#fff', border: 'none', borderRadius: '5px', padding: '0.5rem 1.2rem', fontWeight: 'bold', cursor: 'pointer', transition: 'background 0.2s' }} onClick={() => navigate('/register')}>{t.register}</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 16 }}>
          <button onClick={() => setLang('fr')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', opacity: lang === 'fr' ? 1 : 0.5 }} aria-label="Français">
            <img src={flagFr} alt="Français" style={{ width: 32, height: 32, borderRadius: 4, boxShadow: '0 1px 4px rgba(50,25,127,0.10)' }} />
          </button>
          <button onClick={() => setLang('en')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', opacity: lang === 'en' ? 1 : 0.5 }} aria-label="English">
            <img src={flagEn} alt="English" style={{ width: 32, height: 32, borderRadius: 4, boxShadow: '0 1px 4px rgba(50,25,127,0.10)' }} />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header; 