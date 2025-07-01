import React, { useState } from 'react';
import ChatBox from '../../components/ChatBox/ChatBox';
import styles from './PageWithChat.module.scss';
import estiamLogo from '../../assets/estiam_logo_header.png';

const PageWithChat: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles['page-container']}>
      <header className={styles['header']}>
        <img
          src={estiamLogo}
          alt="Logo Estiam"
          className={styles['logo']}
        />
        <div className={styles['group-info']}>
          <span className={styles['group-name']}>HackSquad</span>
          <span className={styles['group-number']}>Groupe 11</span>
        </div>
      </header>
      <section className={styles['hero']}>
        <h1>L'école d'informatique qui propulse votre avenir numérique</h1>
        <p>
          ESTIAM propose des formations innovantes, du Bac au Bac+5, en alternance ou initial, pour devenir un expert du numérique.
        </p>
        <a
          href="https://www.estiam.education/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles['cta']}
        >
          Découvrir le site officiel
        </a>
      </section>
      <section className={styles['values']} id="valeurs">
        <h2>Nos valeurs</h2>
        <div className={styles['values-list']}>
          <div>
            <strong>Innovation</strong>
            <p>Des programmes à la pointe pour répondre aux besoins du marché.</p>
          </div>
          <div>
            <strong>Accompagnement</strong>
            <p>Un suivi personnalisé pour chaque étudiant.</p>
          </div>
          <div>
            <strong>Ouverture</strong>
            <p>Des campus partout en France et à l'international.</p>
          </div>
        </div>
      </section>
      <footer className={styles['footer']} id="contact">
        <p>© {new Date().getFullYear()} ESTIAM. Tous droits réservés.</p>
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