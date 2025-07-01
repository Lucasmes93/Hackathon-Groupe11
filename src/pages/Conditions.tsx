import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Conditions: React.FC = () => (
  <div style={{ minHeight: '100vh', background: '#f7f8fa', display: 'flex', flexDirection: 'column' }}>
    <Header />
    <main style={{ flex: 1, maxWidth: 800, margin: '40px auto', background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(50,25,127,0.10)', border: '1.5px solid #f0f0f0', padding: '32px 24px', color: '#111' }}>
      <h1 style={{ color: '#5e2fc0', textAlign: 'center', marginBottom: 24 }}>Charte de Confidentialité – Utilisateurs & Administrateurs</h1>
      <p style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: 16 }}>Projet : Chatbot Étudiant<br/>Version : 1.0 – Juillet 2025</p>
      <h2 style={{ color: '#5e2fc0', marginTop: 24 }}>Article 1 – Objet</h2>
      <p>La présente charte a pour objet de définir les engagements de confidentialité et de protection des données à caractère personnel que tout utilisateur, développeur ou administrateur s'engage à respecter dans le cadre de l'utilisation ou de la gestion du chatbot.<br/>Ce document s'inscrit dans le respect du Règlement (UE) 2016/679 du Parlement européen et du Conseil (RGPD) relatif à la protection des personnes physiques à l'égard du traitement des données à caractère personnel.</p>
      <p><b>Références :</b><br/>• Article 1 du RGPD<br/>• Article 1 de la loi Informatique et Libertés n°78-17 modifiée</p>
      <h2 style={{ color: '#5e2fc0', marginTop: 24 }}>Article 2 – Principes de confidentialité</h2>
      <p>Tout traitement de données personnelles réalisé dans le cadre de ce projet respecte les principes fondamentaux du RGPD, à savoir :</p>
      <ul>
        <li>Licéité, loyauté et transparence du traitement (Art. 5.1.a RGPD)</li>
        <li>Finalité déterminée, explicite et légitime (Art. 5.1.b RGPD)</li>
        <li>Minimisation des données : seules les données strictement nécessaires sont collectées (Art. 5.1.c)</li>
        <li>Exactitude des données (Art. 5.1.d)</li>
        <li>Limitation de la durée de conservation (Art. 5.1.e)</li>
        <li>Sécurité et confidentialité des données (Art. 5.1.f et Art. 32 RGPD)</li>
        <li>Responsabilité du responsable de traitement (Art. 5.2 RGPD)</li>
      </ul>
      <h2 style={{ color: '#5e2fc0', marginTop: 24 }}>Article 3 – Engagements de l'utilisateur</h2>
      <p>L'utilisateur du chatbot s'engage à :</p>
      <ul>
        <li>Ne fournir que des données exactes, pertinentes et nécessaires à l'utilisation du service</li>
        <li>Ne pas transmettre de données sensibles (au sens de l'article 9 du RGPD) sauf si explicitement requis et encadré</li>
        <li>Respecter les conditions générales d'utilisation du service</li>
        <li>Ne pas tenter d'extraire, de détourner ou d'exploiter illégalement les données du système</li>
      </ul>
      <p><b>Références :</b><br/>• Article 9 RGPD : Traitement de catégories particulières de données<br/>• Article 25 RGPD : Protection des données dès la conception</p>
      <h2 style={{ color: '#5e2fc0', marginTop: 24 }}>Article 4 – Engagements du personnel / administrateurs</h2>
      <p>Toute personne ayant un accès aux données personnelles via l'interface d'administration ou les systèmes internes s'engage à :</p>
      <ul>
        <li>Ne pas divulguer d'informations personnelles à des tiers non autorisés</li>
        <li>Utiliser les données exclusivement dans le cadre de ses fonctions</li>
        <li>Assurer la sécurité de son poste de travail, de ses identifiants d'accès et éviter tout accès non autorisé</li>
        <li>Signaler immédiatement toute violation ou suspicion de violation de données personnelles auprès du délégué à la protection des données (DPO) ou du responsable du traitement</li>
      </ul>
      <p><b>Références :</b><br/>• Article 29 RGPD : Accès uniquement sur instruction du responsable du traitement<br/>• Article 32 RGPD : Obligation de sécurité<br/>• Article 33 & 34 RGPD : Obligation de notification en cas de violation de données</p>
      <h2 style={{ color: '#5e2fc0', marginTop: 24 }}>Article 5 – Droits des personnes concernées</h2>
      <p>Conformément aux articles 12 à 22 du RGPD, toute personne concernée par un traitement peut exercer les droits suivants :</p>
      <ul>
        <li>Droit d'accès à ses données personnelles (Art. 15)</li>
        <li>Droit de rectification (Art. 16)</li>
        <li>Droit à l'effacement (« droit à l'oubli » – Art. 17)</li>
        <li>Droit à la limitation du traitement (Art. 18)</li>
        <li>Droit à la portabilité (Art. 20)</li>
        <li>Droit d'opposition (Art. 21)</li>
        <li>Droit de ne pas faire l'objet d'une décision automatisée (Art. 22)</li>
      </ul>
      <p>Ces droits peuvent être exercés à tout moment auprès du responsable de traitement désigné ou du Délégué à la Protection des Données (DPO), si applicable.</p>
      <h2 style={{ color: '#5e2fc0', marginTop: 24 }}>Article 6 – Sanctions en cas de non-respect</h2>
      <p>Tout manquement aux obligations de cette charte pourra entraîner :</p>
      <ul>
        <li>Un signalement à la direction du projet ou à l'autorité compétente</li>
        <li>Des mesures disciplinaires internes si applicable (dans un cadre professionnel ou académique)</li>
        <li>Une notification à la CNIL (Commission Nationale de l'Informatique et des Libertés) en cas de violation de données personnelles (Art. 33 RGPD)</li>
        <li>Des sanctions administratives pouvant aller jusqu'à 20 millions d'euros ou 4 % du chiffre d'affaires annuel mondial selon l'article 83 du RGPD</li>
      </ul>
      <div style={{ marginTop: 32, textAlign: 'center' }}>
        <a href="/politique" style={{ color: '#fff', background: '#5e2fc0', padding: '10px 24px', borderRadius: 8, textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1rem', boxShadow: '0 2px 8px rgba(94,47,192,0.10)' }}>
          Voir la politique de confidentialité
        </a>
      </div>
    </main>
    <Footer />
  </div>
);

export default Conditions; 