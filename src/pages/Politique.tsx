import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { LangContext } from '../App';

const translations = {
  fr: {
    title: 'Politique de confidentialité du projet "Chatbot Étudiant"',
    lastUpdate: 'Dernière mise à jour : 01/07/2025',
    controller: 'Responsable du traitement : HackSquad',
    dpo: 'Contact DPO :',
    dpoMail: 'maxime-jules-elliott.feltrin@estiam.com',
    objectTitle: '1. Objet',
    object: 'La présente politique de confidentialité a pour objectif d\'informer les utilisateurs de la manière dont leurs données personnelles sont collectées, traitées et protégées dans le cadre de l\'utilisation du chatbot mis à disposition par HackSquad.',
    dataTitle: '2. Données collectées',
    data: 'Nous collectons uniquement les données nécessaires à l\'identification des utilisateurs et au bon fonctionnement du chatbot :',
    dataList: ['Nom et prénom', 'Adresse e-mail', 'Date de naissance', 'Photographie (facultative ou obligatoire selon le cas)'],
    purposeTitle: '3. Finalités du traitement',
    purpose: 'Les données sont traitées pour les finalités suivantes :',
    purposeList: ['Authentification de l\'utilisateur', 'Personnalisation des réponses du chatbot', 'Suivi pédagogique ou statistique interne', 'Archivage temporaire à des fins de traçabilité'],
    legalTitle: '4. Base légale du traitement',
    legal: 'Le traitement est fondé sur :',
    legalList: ["Le consentement de l'utilisateur (article 6.1.a du RGPD)", "L'intérêt légitime de l'établissement pour assurer le fonctionnement pédagogique du service (article 6.1.f)",],
    retentionTitle: '5. Durée de conservation',
    retention: 'Les données sont conservées pendant une durée maximale de 12 mois après la dernière utilisation du service, sauf demande de suppression anticipée par l\'utilisateur.',
    recipientsTitle: '6. Destinataires des données',
    recipients: 'Les données personnelles ne sont accessibles qu\'aux personnes autorisées :',
    recipientsList: ["Membres de l'équipe projet", 'Responsable pédagogique', 'Prestataires techniques dans le cadre du maintien du système (sous contrat de confidentialité)'],
    securityTitle: '7. Sécurité des données',
    security: 'Des mesures techniques et organisationnelles strictes sont mises en œuvre pour protéger les données :',
    securityList: ['Chiffrement des données en transit (TLS) et au repos (AES-256)', 'Authentification sécurisée', 'Accès restreint et journalisé', "Surveillance et audit de l'infrastructure"],
    rightsTitle: '8. Droits des utilisateurs',
    rights: 'Conformément au RGPD, vous disposez des droits suivants :',
    rightsList: ["Droit d'accès à vos données", 'Droit de rectification', 'Droit à l\'effacement ("droit à l\'oubli")', 'Droit de limitation du traitement', 'Droit à la portabilité', 'Droit de retirer votre consentement à tout moment'],
    rightsContact: 'Pour exercer vos droits, vous pouvez contacter :',
    transferTitle: '9. Transferts hors Union Européenne',
    transfer: "Aucun transfert de données hors de l'Union Européenne n'est effectué dans le cadre de ce traitement.",
    claimTitle: '10. Réclamation',
    claim: 'Vous avez le droit de déposer une réclamation auprès de la CNIL',
    claimLink: 'www.cnil.fr',
    seeCharter: 'Voir la charte de confidentialité',
  },
  en: {
    title: 'Privacy Policy of the "Student Chatbot" Project',
    lastUpdate: 'Last update: 07/01/2025',
    controller: 'Data Controller: HackSquad',
    dpo: 'DPO Contact:',
    dpoMail: 'maxime-jules-elliott.feltrin@estiam.com',
    objectTitle: '1. Purpose',
    object: 'This privacy policy aims to inform users about how their personal data is collected, processed, and protected when using the chatbot provided by HackSquad.',
    dataTitle: '2. Data Collected',
    data: 'We only collect the data necessary to identify users and ensure the proper functioning of the chatbot:',
    dataList: ['First and last name', 'Email address', 'Date of birth', 'Photograph (optional or mandatory as applicable)'],
    purposeTitle: '3. Purposes of Processing',
    purpose: 'Data is processed for the following purposes:',
    purposeList: ['User authentication', 'Personalization of chatbot responses', 'Internal educational or statistical tracking', 'Temporary archiving for traceability purposes'],
    legalTitle: '4. Legal Basis for Processing',
    legal: 'Processing is based on:',
    legalList: ["User's consent (Article 6.1.a GDPR)", "The institution's legitimate interest in ensuring the educational operation of the service (Article 6.1.f)"],
    retentionTitle: '5. Data Retention Period',
    retention: 'Data is retained for a maximum of 12 months after the last use of the service, unless the user requests earlier deletion.',
    recipientsTitle: '6. Data Recipients',
    recipients: 'Personal data is only accessible to authorized persons:',
    recipientsList: ['Project team members', 'Educational supervisor', 'Technical service providers for system maintenance (under confidentiality agreement)'],
    securityTitle: '7. Data Security',
    security: 'Strict technical and organizational measures are implemented to protect data:',
    securityList: ['Encryption of data in transit (TLS) and at rest (AES-256)', 'Secure authentication', 'Restricted and logged access', 'Infrastructure monitoring and auditing'],
    rightsTitle: '8. User Rights',
    rights: 'In accordance with the GDPR, you have the following rights:',
    rightsList: ['Right to access your data', 'Right to rectification', 'Right to erasure ("right to be forgotten")', 'Right to restriction of processing', 'Right to data portability', 'Right to withdraw your consent at any time'],
    rightsContact: 'To exercise your rights, you can contact:',
    transferTitle: '9. Transfers outside the European Union',
    transfer: 'No data transfers outside the European Union are carried out as part of this processing.',
    claimTitle: '10. Complaint',
    claim: 'You have the right to file a complaint with the CNIL',
    claimLink: 'www.cnil.fr/en',
    seeCharter: 'See the privacy charter',
  }
};

const Politique: React.FC = () => {
  const { lang } = useContext(LangContext);
  const t = translations[lang];
  return (
    <div style={{ minHeight: '100vh', background: '#f7f8fa', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1, maxWidth: 800, margin: '40px auto', background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(50,25,127,0.10)', border: '1.5px solid #f0f0f0', padding: '32px 24px', color: '#111' }}>
        <h1 style={{ color: '#5e2fc0', textAlign: 'center', marginBottom: 24 }}>{t.title}</h1>
        <p style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: 16 }}>{t.lastUpdate}<br/>{t.controller}<br/>{t.dpo} <a href={`mailto:${t.dpoMail}`} style={{ color: '#5e2fc0', textDecoration: 'underline' }}>{t.dpoMail}</a></p>
        <h2 style={{ color: '#5e2fc0', marginTop: 24 }}>{t.objectTitle}</h2>
        <p>{t.object}</p>
        <h2 style={{ color: '#5e2fc0', marginTop: 24 }}>{t.dataTitle}</h2>
        <p>{t.data}</p>
        <ul>
          {t.dataList.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
        <h2 style={{ color: '#5e2fc0', marginTop: 24 }}>{t.purposeTitle}</h2>
        <p>{t.purpose}</p>
        <ul>
          {t.purposeList.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
        <h2 style={{ color: '#5e2fc0', marginTop: 24 }}>{t.legalTitle}</h2>
        <p>{t.legal}</p>
        <ul>
          {t.legalList.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
        <h2 style={{ color: '#5e2fc0', marginTop: 24 }}>{t.retentionTitle}</h2>
        <p>{t.retention}</p>
        <h2 style={{ color: '#5e2fc0', marginTop: 24 }}>{t.recipientsTitle}</h2>
        <p>{t.recipients}</p>
        <ul>
          {t.recipientsList.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
        <h2 style={{ color: '#5e2fc0', marginTop: 24 }}>{t.securityTitle}</h2>
        <p>{t.security}</p>
        <ul>
          {t.securityList.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
        <h2 style={{ color: '#5e2fc0', marginTop: 24 }}>{t.rightsTitle}</h2>
        <p>{t.rights}</p>
        <ul>
          {t.rightsList.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
        <p>{t.rightsContact} <a href={`mailto:${t.dpoMail}`} style={{ color: '#5e2fc0', textDecoration: 'underline' }}>{t.dpoMail}</a></p>
        <h2 style={{ color: '#5e2fc0', marginTop: 24 }}>{t.transferTitle}</h2>
        <p>{t.transfer}</p>
        <h2 style={{ color: '#5e2fc0', marginTop: 24 }}>{t.claimTitle}</h2>
        <p>{t.claim} <a href={`https://${t.claimLink}`} target="_blank" rel="noopener noreferrer" style={{ color: '#5e2fc0', textDecoration: 'underline' }}>{t.claimLink}</a></p>
        <div style={{ marginTop: 32, textAlign: 'center' }}>
          <a href="/conditions" style={{ color: '#fff', background: '#5e2fc0', padding: '10px 24px', borderRadius: 8, textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1rem', boxShadow: '0 2px 8px rgba(94,47,192,0.10)' }}>
            {t.seeCharter}
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Politique; 