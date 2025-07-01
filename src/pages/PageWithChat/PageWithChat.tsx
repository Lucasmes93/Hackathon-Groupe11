import React, { useState } from 'react';
import ChatBox from '../../components/ChatBox/ChatBox';
import styles from './PageWithChat.module.scss';
import estiamLogo from '../../assets/estiam_logo_header.png';
import flagFr from '../../assets/flag_fr.png';
import flagEn from '../../assets/flag_en.png';

const translations = {
  fr: {
    groupName: 'HackSquad',
    groupNumber: 'Groupe 11',
    heroTitle: "L'école d'informatique qui propulse votre avenir numérique",
    heroDesc: "ESTIAM propose des formations innovantes, du Bac au Bac+5, en alternance ou initial, pour devenir un expert du numérique.",
    cta: 'Découvrir le site officiel',
    valuesTitle: 'Nos valeurs',
    values: [
      { title: 'Innovation', desc: 'Des programmes à la pointe pour répondre aux besoins du marché.' },
      { title: 'Accompagnement', desc: 'Un suivi personnalisé pour chaque étudiant.' },
      { title: 'Ouverture', desc: "Des campus partout en France et à l'international." },
    ],
    footer: '© ' + new Date().getFullYear() + ' ESTIAM. Tous droits réservés.'
  },
  en: {
    groupName: 'HackSquad',
    groupNumber: 'Group 11',
    heroTitle: 'The IT school that boosts your digital future',
    heroDesc: 'ESTIAM offers innovative programs, from Bachelor to Master, in work-study or initial training, to become a digital expert.',
    cta: 'Discover the official website',
    valuesTitle: 'Our values',
    values: [
      { title: 'Innovation', desc: 'Cutting-edge programs to meet market needs.' },
      { title: 'Support', desc: 'Personalized guidance for every student.' },
      { title: 'Openness', desc: 'Campuses all over France and abroad.' },
    ],
    footer: '© ' + new Date().getFullYear() + ' ESTIAM. All rights reserved.'
  }
};

const PageWithChat: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<'fr' | 'en'>('fr');
  const t = translations[lang];

  return (
    <div className={styles['page-container']}>
      <header className={styles['header']}>
        <img
          src={estiamLogo}
          alt="Logo Estiam"
          className={styles['logo']}
        />
        <div className={styles['group-info']}>
          <span className={styles['group-name']}>{t.groupName}</span>
          <span className={styles['group-number']}>{t.groupNumber}</span>
        </div>
        <div className={styles['lang-switch']}>
          <button
            className={lang === 'fr' ? styles['active-lang'] : ''}
            onClick={() => setLang('fr')}
            aria-label="Français"
          >
            <img src={flagFr} alt="Français" className={styles['flag']} />
          </button>
          <span> | </span>
          <button
            className={lang === 'en' ? styles['active-lang'] : ''}
            onClick={() => setLang('en')}
            aria-label="English"
          >
            <img src={flagEn} alt="English" className={styles['flag']} />
          </button>
        </div>
      </header>
      <section className={styles['hero']}>
        <h1>{t.heroTitle}</h1>
        <p>{t.heroDesc}</p>
        <a
          href="https://www.estiam.education/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles['cta']}
        >
          {t.cta}
        </a>
      </section>
      <section className={styles['values']} id="valeurs">
        <h2>{t.valuesTitle}</h2>
        <div className={styles['values-list']}>
          {t.values.map((v, i) => (
            <div key={i}>
              <strong>{v.title}</strong>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <footer className={styles['footer']} id="contact">
        <p>{t.footer}</p>
      </footer>
      <button
        className={styles['chatbox-fab']}
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Fermer le chat' : 'Ouvrir le chat'}
      >
        {open ? '✖' : '💬'}
      </button>
      {open && (
        <div className={styles['chatbox-fixed']}>
          <ChatBox />
        </div>
      )}
    </div>
  );
};

export default PageWithChat; 