import React, { useState, useContext } from 'react';
import ChatBox from '../../components/ChatBox/ChatBox';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from './PageWithChat.module.scss';
import { LangContext } from '../../App';

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
    footer: '© ' + new Date().getFullYear() + ' ESTIAM. Tous droits réservés.',
    chatOpen: 'Ouvrir le chat',
    chatClose: 'Fermer le chat',
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
    footer: '© ' + new Date().getFullYear() + ' ESTIAM. All rights reserved.',
    chatOpen: 'Open chat',
    chatClose: 'Close chat',
  }
};

const PageWithChat: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { lang } = useContext(LangContext);
  const t = translations[lang];

  return (
    <div className={styles['page-container']}>
      <Header />
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
      <Footer />
      <button
        className={styles['chatbox-fab']}
        onClick={() => setOpen(o => !o)}
        aria-label={open ? t.chatClose : t.chatOpen}
      >
        {open ? '\u2716' : '\ud83d\udcac'}
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