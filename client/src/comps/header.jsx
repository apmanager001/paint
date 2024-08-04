import React, { useState } from 'react';
import styles from './css/header.module.css';

function Header() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleFaq, setModalVisibleFaq] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };
  const openFaqModal = () => {
    setModalVisibleFaq(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  const closeFaqModal = () => {
    setModalVisibleFaq(false);
  };

  return (
    <div className={styles.containerHeader}>
      <div className={styles.title}>Community Pixel Art</div>
      <div className={styles.faq}>
        <button className={styles.buttons} onClick={openFaqModal}>F.A.Q.</button>
        {modalVisibleFaq && (
          <div id="faqModal" className={styles.modal}>
            <div className={styles.faqModalContent}>
              <span className={styles.close} onClick={closeFaqModal}>&times;</span>
                
                <h2>F.A.Q.</h2>
                <ol>
                  <li>How do I play?</li>
                    <p>Start by clicking the control button and see if anyone else has control</p>
                  <li>What do I set my name as?</li>
                    <p>Any name you would like. Best to make it a nickname though, everyone can see it.</p>
                </ol>
            </div>
          </div>
        )}

      </div>
      <div className={styles.rules}>
        <button className={styles.buttons} onClick={openModal}>
          Rules
        </button>
        {modalVisible && (
          <div id="ruleModal" className={styles.modal}>
            <div className={styles.modalContent}>
              <span className={styles.close} onClick={closeModal}>&times;</span>
                
                <h2>Rules</h2>
                <ol>
                  <li>Only one user can go at a time.</li>
                  <li>Click the "control" button to participate.</li>
                  <li>Type in your Name.</li>
                  <li>Once you see your name, you have 5 minutes to make your 20 moves</li>
                  <li>If the Clock runs out your moves are automatically submitted.</li>
                  <li>Have Fun!</li>
                </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;

