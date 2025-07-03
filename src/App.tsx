import React, { useState, createContext, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import PageWithChat from './pages/PageWithChat/PageWithChat';
import Register from './pages/Register/Register';
import Conditions from './pages/Conditions';
import Politique from './pages/Politique';
import FaceReco from './pages/FaceReco';
import AccessGranted from './components/AccessGranted';

export const LangContext = createContext<{
  lang: 'fr' | 'en';
  setLang: (lang: 'fr' | 'en') => void;
}>({ lang: 'fr', setLang: () => {} });

function App() {
  const [lang, setLang] = useState<'fr' | 'en'>(
    localStorage.getItem('lang') === 'en' ? 'en' : 'fr'
  );

  const handleSetLang = (l: 'fr' | 'en') => {
    setLang(l);
    localStorage.setItem('lang', l);
  };

  return (
    <LangContext.Provider value={{ lang, setLang: handleSetLang }}>
      <Routes>
        <Route path="/" element={<PageWithChat />} />
        <Route path="/register" element={<Register />} />
        <Route path="/conditions" element={<Conditions />} />
        <Route path="/politique" element={<Politique />} />
        <Route path="/facerecognition" element={<FaceReco />} />
        <Route path="/access-granted" element={<AccessGranted />} />
      </Routes>
    </LangContext.Provider>
  );
}

export default App;
