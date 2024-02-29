import React, {useState} from 'react'
import styles from './css/takeControl.module.css'

const TakeControl = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
      setModalVisible(true);
    };

    const closeModal = () => {
      setModalVisible(false);
    };
  return (
    <div className={styles.controlContainer}>
      <button className={styles.controlBtn} onClick={openModal}>
        Take Control
      </button>
      {modalVisible && (
        <div id="ruleModal" className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={closeModal}>
              &times;
            </span>

            <div className={styles.inputButton}>
              <input id={styles.modalInput} placeholder="Your Nickname"></input>

              <button type="submit" value="Submit" id={styles.modalBtn}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TakeControl