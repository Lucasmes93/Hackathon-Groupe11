import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FaceRecognition from '../components/FaceRecognition';
import styles from './FaceReco.module.scss';

const FaceReco: React.FC = () => {
  return (
    <div className={styles['facereco-outer']}>
      <Header />
      <main className={styles['facereco-main']}>
        <FaceRecognition />
      </main>
      <Footer />
    </div>
  );
};

export default FaceReco; 