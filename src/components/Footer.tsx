import React from 'react';

const Footer: React.FC = () => (
  <footer style={{ textAlign: 'center', padding: '1.2rem', background: '#5e2fc0', borderTop: '2px solid #5e2fc0', color: '#fff', fontWeight: 'bold', marginTop: '2rem', fontSize: '1rem', letterSpacing: '0.5px' }}>
    © {new Date().getFullYear()} ESTIAM - HackSquad. Tous droits réservés.
  </footer>
);

export default Footer; 