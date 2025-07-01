import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Politique: React.FC = () => (
  <div style={{ minHeight: '100vh', background: '#f7f8fa', display: 'flex', flexDirection: 'column' }}>
    <Header />
    <main style={{ flex: 1, maxWidth: 800, margin: '40px auto', background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(50,25,127,0.10)', border: '1.5px solid #f0f0f0', padding: '32px 24px', color: '#111' }}>
      <h1 style={{ color: '#5e2fc0', textAlign: 'center', marginBottom: 24 }}>Politique de confidentialité du projet "Chatbot Étudiant"</h1>
      <p style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: 16 }}>Dernière mise à jour : 01/07/2025<br/>Responsable du traitement : HackSquad<br/>Contact DPO : <a href="mailto:maxime-jules-elliott.feltrin@estiam.com" style={{ color: '#5e2fc0', textDecoration: 'underline' }}>maxime-jules-elliott.feltrin@estiam.com</a></p>
      <h2 style={{ color: '#5e2fc0', marginTop: 24 }}>1. Objet</h2>
      <p>La présente politique de confidentialité a pour objectif d'informer les utilisateurs de la manière dont leurs données personnelles sont collectées, traitées et protégées dans le cadre de l'utilisation du chatbot mis à disposition par HackSquad.</p>
      <h2 style={{ color: '#5e2fc0', marginTop: 24 }}>2. Données collectées</h2>
      <p>Nous collectons uniquement les données nécessaires à l'identification des utilisateurs et au bon fonctionnement du chatbot :</p>
      <ul>
        <li>Nom et prénom</li>
        <li>Adresse e-mail</li>
        <li>Date de naissance</li>
        <li>Photographie (facultative ou obligatoire selon le cas)</li>
      </ul>
      <h2 style={{ color: '#5e2fc0', marginTop: 24 }}>3. Finalités du traitement</h2>
      <p>Les données sont traitées pour les finalités suivantes :</p>
      <ul>
        <li>Authentification de l'utilisateur</li>
        <li>Personnalisation des réponses du chatbot</li>
        <li>Suivi pédagogique ou statistique interne</li>
        <li>Archivage temporaire à des fins de traçabilité</li>
      </ul>
      <h2 style={{ color: '#5e2fc0', marginTop: 24 }}>4. Base légale du traitement</h2>
      <p>Le traitement est fondé sur :</p>
      <ul>
        <li>Le consentement de l'utilisateur (article 6.1.a du RGPD)</li>
        <li>L'intérêt légitime de l'établissement pour assurer le fonctionnement pédagogique du service (article 6.1.f)</li>
      </ul>
      <h2 style={{ color: '#5e2fc0', marginTop: 24 }}>5. Durée de conservation</h2>
      <p>Les données sont conservées pendant une durée maximale de 12 mois après la dernière utilisation du service, sauf demande de suppression anticipée par l'utilisateur.</p>
      <h2 style={{ color: '#5e2fc0', marginTop: 24 }}>6. Destinataires des données</h2>
      <p>Les données personnelles ne sont accessibles qu'aux personnes autorisées :</p>
      <ul>
        <li>Membres de l'équipe projet</li>
        <li>Responsable pédagogique</li>
        <li>Prestataires techniques dans le cadre du maintien du système (sous contrat de confidentialité)</li>
      </ul>
      <h2 style={{ color: '#5e2fc0', marginTop: 24 }}>7. Sécurité des données</h2>
      <p>Des mesures techniques et organisationnelles strictes sont mises en œuvre pour protéger les données :</p>
      <ul>
        <li>Chiffrement des données en transit (TLS) et au repos (AES-256)</li>
        <li>Authentification sécurisée</li>
        <li>Accès restreint et journalisé</li>
        <li>Surveillance et audit de l'infrastructure</li>
      </ul>
      <h2 style={{ color: '#5e2fc0', marginTop: 24 }}>8. Droits des utilisateurs</h2>
      <p>Conformément au RGPD, vous disposez des droits suivants :</p>
      <ul>
        <li>Droit d'accès à vos données</li>
        <li>Droit de rectification</li>
        <li>Droit à l'effacement ("droit à l'oubli")</li>
        <li>Droit de limitation du traitement</li>
        <li>Droit à la portabilité</li>
        <li>Droit de retirer votre consentement à tout moment</li>
      </ul>
      <p>Pour exercer vos droits, vous pouvez contacter : <a href="mailto:maxime-jules-elliott.feltrin@estiam.com" style={{ color: '#5e2fc0', textDecoration: 'underline' }}>maxime-jules-elliott.feltrin@estiam.com</a></p>
      <h2 style={{ color: '#5e2fc0', marginTop: 24 }}>9. Transferts hors Union Européenne</h2>
      <p>Aucun transfert de données hors de l'Union Européenne n'est effectué dans le cadre de ce traitement.</p>
      <h2 style={{ color: '#5e2fc0', marginTop: 24 }}>10. Réclamation</h2>
      <p>Vous avez le droit de déposer une réclamation auprès de la CNIL (<a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" style={{ color: '#5e2fc0', textDecoration: 'underline' }}>www.cnil.fr</a>) si vous estimez que vos droits ne sont pas respectés.</p>
      <div style={{ marginTop: 32, textAlign: 'center' }}>
        <a href="/conditions" style={{ color: '#fff', background: '#5e2fc0', padding: '10px 24px', borderRadius: 8, textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1rem', boxShadow: '0 2px 8px rgba(94,47,192,0.10)' }}>
          Voir la charte de confidentialité
        </a>
      </div>
    </main>
    <Footer />
  </div>
);

export default Politique; 