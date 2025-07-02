import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { LangContext } from '../App';

const translations = {
  fr: {
    title: 'Charte de Confidentialité – Utilisateurs & Administrateurs',
    project: 'Projet : Chatbot Étudiant',
    version: 'Version : 1.0 – Juillet 2025',
    article1: 'Article 1 – Objet',
    obj: "La présente charte a pour objet de définir les engagements de confidentialité et de protection des données à caractère personnel que tout utilisateur, développeur ou administrateur s'engage à respecter dans le cadre de l'utilisation ou de la gestion du chatbot. Ce document s'inscrit dans le respect du Règlement (UE) 2016/679 du Parlement européen et du Conseil (RGPD) relatif à la protection des personnes physiques à l'égard du traitement des données à caractère personnel.",
    ref1: 'Références :',
    ref1List: ['Article 1 du RGPD', 'Article 1 de la loi Informatique et Libertés n°78-17 modifiée'],
    article2: 'Article 2 – Principes de confidentialité',
    princ: 'Tout traitement de données personnelles réalisé dans le cadre de ce projet respecte les principes fondamentaux du RGPD, à savoir :',
    princList: [
      'Licéité, loyauté et transparence du traitement (Art. 5.1.a RGPD)',
      'Finalité déterminée, explicite et légitime (Art. 5.1.b RGPD)',
      'Minimisation des données : seules les données strictement nécessaires sont collectées (Art. 5.1.c)',
      'Exactitude des données (Art. 5.1.d)',
      'Limitation de la durée de conservation (Art. 5.1.e)',
      'Sécurité et confidentialité des données (Art. 5.1.f et Art. 32 RGPD)',
      'Responsabilité du responsable de traitement (Art. 5.2 RGPD)'
    ],
    article3: "Article 3 – Engagements de l'utilisateur",
    user: "L'utilisateur du chatbot s'engage à :",
    userList: [
      'Ne fournir que des données exactes, pertinentes et nécessaires à l\'utilisation du service',
      'Ne pas transmettre de données sensibles (au sens de l\'article 9 du RGPD) sauf si explicitement requis et encadré',
      'Respecter les conditions générales d\'utilisation du service',
      'Ne pas tenter d\'extraire, de détourner ou d\'exploiter illégalement les données du système'
    ],
    ref2: 'Références :',
    ref2List: [
      'Article 9 RGPD : Traitement de catégories particulières de données',
      'Article 25 RGPD : Protection des données dès la conception'
    ],
    article4: 'Article 4 – Engagements du personnel / administrateurs',
    admin: 'Toute personne ayant un accès aux données personnelles via l\'interface d\'administration ou les systèmes internes s\'engage à :',
    adminList: [
      'Ne pas divulguer d\'informations personnelles à des tiers non autorisés',
      'Utiliser les données exclusivement dans le cadre de ses fonctions',
      'Assurer la sécurité de son poste de travail, de ses identifiants d\'accès et éviter tout accès non autorisé',
      'Signaler immédiatement toute violation ou suspicion de violation de données personnelles auprès du délégué à la protection des données (DPO) ou du responsable du traitement'
    ],
    ref3: 'Références :',
    ref3List: [
      'Article 29 RGPD : Accès uniquement sur instruction du responsable du traitement',
      'Article 32 RGPD : Obligation de sécurité',
      'Article 33 & 34 RGPD : Obligation de notification en cas de violation de données'
    ],
    article5: 'Article 5 – Droits des personnes concernées',
    rights: 'Conformément aux articles 12 à 22 du RGPD, toute personne concernée par un traitement peut exercer les droits suivants :',
    rightsList: [
      'Droit d\'accès à ses données personnelles (Art. 15)',
      'Droit de rectification (Art. 16)',
      'Droit à l\'effacement (« droit à l\'oubli » – Art. 17)',
      'Droit à la limitation du traitement (Art. 18)',
      'Droit à la portabilité (Art. 20)',
      'Droit d\'opposition (Art. 21)',
      'Droit de ne pas faire l\'objet d\'une décision automatisée (Art. 22)'
    ],
    rightsEnd: 'Ces droits peuvent être exercés à tout moment auprès du responsable de traitement désigné ou du Délégué à la Protection des Données (DPO), si applicable.',
    article6: 'Article 6 – Sanctions en cas de non-respect',
    sanctions: 'Tout manquement aux obligations de cette charte pourra entraîner :',
    sanctionsList: [
      'Un signalement à la direction du projet ou à l\'autorité compétente',
      'Des mesures disciplinaires internes si applicable (dans un cadre professionnel ou académique)',
      'Une notification à la CNIL (Commission Nationale de l\'Informatique et des Libertés) en cas de violation de données personnelles (Art. 33 RGPD)',
      "Des sanctions administratives pouvant aller jusqu'à 20 millions d'euros ou 4 % du chiffre d'affaires annuel mondial selon l'article 83 du RGPD"
    ],
    seePolicy: 'Voir la politique de confidentialité',
  },
  en: {
    title: 'Privacy Charter – Users & Administrators',
    project: 'Project: Student Chatbot',
    version: 'Version: 1.0 – July 2025',
    article1: 'Article 1 – Purpose',
    obj: 'This charter defines the confidentiality and personal data protection commitments that every user, developer, or administrator undertakes to respect when using or managing the chatbot. This document complies with Regulation (EU) 2016/679 of the European Parliament and Council (GDPR) on the protection of natural persons with regard to the processing of personal data.',
    ref1: 'References:',
    ref1List: ['Article 1 of the GDPR', 'Article 1 of the amended French Data Protection Act No. 78-17'],
    article2: 'Article 2 – Privacy Principles',
    princ: 'All personal data processing carried out as part of this project complies with the fundamental principles of the GDPR, namely:',
    princList: [
      'Lawfulness, fairness and transparency of processing (Art. 5.1.a GDPR)',
      'Specified, explicit and legitimate purpose (Art. 5.1.b GDPR)',
      'Data minimization: only strictly necessary data is collected (Art. 5.1.c)',
      'Data accuracy (Art. 5.1.d)',
      'Limitation of storage period (Art. 5.1.e)',
      'Data security and confidentiality (Art. 5.1.f and Art. 32 GDPR)',
      'Accountability of the data controller (Art. 5.2 GDPR)'
    ],
    article3: 'Article 3 – User Commitments',
    user: 'The chatbot user undertakes to:',
    userList: [
      'Only provide accurate, relevant, and necessary data for the use of the service',
      'Not transmit sensitive data (within the meaning of Article 9 of the GDPR) unless explicitly required and regulated',
      'Comply with the general terms of use of the service',
      'Not attempt to extract, divert, or illegally exploit system data'
    ],
    ref2: 'References:',
    ref2List: [
      'Article 9 GDPR: Processing of special categories of data',
      'Article 25 GDPR: Data protection by design'
    ],
    article4: 'Article 4 – Staff / Administrator Commitments',
    admin: 'Anyone with access to personal data via the admin interface or internal systems undertakes to:',
    adminList: [
      'Not disclose personal information to unauthorized third parties',
      'Use the data exclusively as part of their duties',
      'Ensure the security of their workstation, access credentials, and prevent any unauthorized access',
      'Immediately report any breach or suspected breach of personal data to the Data Protection Officer (DPO) or the data controller'
    ],
    ref3: 'References:',
    ref3List: [
      'Article 29 GDPR: Access only on instruction from the data controller',
      'Article 32 GDPR: Security obligation',
      'Articles 33 & 34 GDPR: Notification obligation in the event of a data breach'
    ],
    article5: 'Article 5 – Rights of Data Subjects',
    rights: 'In accordance with Articles 12 to 22 of the GDPR, any data subject may exercise the following rights:',
    rightsList: [
      'Right of access to their personal data (Art. 15)',
      'Right to rectification (Art. 16)',
      'Right to erasure ("right to be forgotten" – Art. 17)',
      'Right to restriction of processing (Art. 18)',
      'Right to data portability (Art. 20)',
      'Right to object (Art. 21)',
      'Right not to be subject to automated decision-making (Art. 22)'
    ],
    rightsEnd: 'These rights may be exercised at any time with the designated data controller or Data Protection Officer (DPO), if applicable.',
    article6: 'Article 6 – Sanctions for Non-Compliance',
    sanctions: 'Any breach of the obligations of this charter may result in:',
    sanctionsList: [
      'A report to the project management or competent authority',
      'Internal disciplinary measures if applicable (in a professional or academic context)',
      'Notification to the CNIL (French Data Protection Authority) in the event of a personal data breach (Art. 33 GDPR)',
      'Administrative sanctions of up to 20 million euros or 4% of annual worldwide turnover according to Article 83 of the GDPR'
    ],
    seePolicy: 'See the privacy policy',
  }
};

const Conditions: React.FC = () => {
  const { lang } = useContext(LangContext);
  const t = translations[lang];
  return (
    <div style={{ minHeight: '100vh', background: '#f7f8fa', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1, maxWidth: 800, margin: '40px auto', background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(50,25,127,0.10)', border: '1.5px solid #f0f0f0', padding: '32px 24px', color: '#111' }}>
        <h1 style={{ color: '#5e2fc0', textAlign: 'center', marginBottom: 24 }}>{t.title}</h1>
        <p style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: 16 }}>{t.project}<br/>{t.version}</p>
        <h2 style={{ color: '#5e2fc0', marginTop: 24 }}>{t.article1}</h2>
        <p>{t.obj}</p>
        <p><b>{t.ref1}</b><br/>{t.ref1List.map((item, i) => <span key={i}>{item}<br/></span>)}</p>
        <h2 style={{ color: '#5e2fc0', marginTop: 24 }}>{t.article2}</h2>
        <p>{t.princ}</p>
        <ul>{t.princList.map((item, i) => <li key={i}>{item}</li>)}</ul>
        <h2 style={{ color: '#5e2fc0', marginTop: 24 }}>{t.article3}</h2>
        <p>{t.user}</p>
        <ul>{t.userList.map((item, i) => <li key={i}>{item}</li>)}</ul>
        <p><b>{t.ref2}</b><br/>{t.ref2List.map((item, i) => <span key={i}>{item}<br/></span>)}</p>
        <h2 style={{ color: '#5e2fc0', marginTop: 24 }}>{t.article4}</h2>
        <p>{t.admin}</p>
        <ul>{t.adminList.map((item, i) => <li key={i}>{item}</li>)}</ul>
        <p><b>{t.ref3}</b><br/>{t.ref3List.map((item, i) => <span key={i}>{item}<br/></span>)}</p>
        <h2 style={{ color: '#5e2fc0', marginTop: 24 }}>{t.article5}</h2>
        <p>{t.rights}</p>
        <ul>{t.rightsList.map((item, i) => <li key={i}>{item}</li>)}</ul>
        <p>{t.rightsEnd}</p>
        <h2 style={{ color: '#5e2fc0', marginTop: 24 }}>{t.article6}</h2>
        <p>{t.sanctions}</p>
        <ul>{t.sanctionsList.map((item, i) => <li key={i}>{item}</li>)}</ul>
        <div style={{ marginTop: 32, textAlign: 'center' }}>
          <a href="/politique" style={{ color: '#fff', background: '#5e2fc0', padding: '10px 24px', borderRadius: 8, textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1rem', boxShadow: '0 2px 8px rgba(94,47,192,0.10)' }}>
            {t.seePolicy}
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Conditions; 