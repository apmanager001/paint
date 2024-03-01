import React, {useState} from 'react'
import styles from './css/takeControl.module.css'
import { toast } from "react-hot-toast";
import axios from 'axios';

const TakeControl = ({canvasId, refreshCount}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [username, setUsername] = useState("");
    const openModal = () => {
      setModalVisible(true);
    };

    const closeModal = () => {
      setModalVisible(false);
    };

    const checkIfActive = async () => {
       try { 
      const response = await axios.get('/activeUser');
        if(response.data.length === 0){
          return true
        } else {
          return false
        }
    } catch(error) {
        // Handle error
        console.error("Error checking users:", error);
      };
    }

    const startTurn = async () => {
      try {
        // Call checkIfActive to get the result
        const isActive = await checkIfActive();

        if (isActive === true) {
          // If active, proceed with the API call
          await axios.post(`/startTurn`, { username, canvasId });
          // Handle successful response if needed
          closeModal();
        } else {
          // If not active, show a toast error
          toast.error(
            "Sorry, someone else already has control. Try again soon"
          );
          closeModal();
        }
      } catch (error) {
        // Handle error
        console.error("Error starting turn:", error);
        // Close modal or perform additional error handling if needed
        closeModal();
      }
    };

const handleInputChange = (event) => {
  // Update the nickname state with the value of the input field
  setUsername(event.target.value);
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
              <input
                id={styles.modalInput}
                placeholder="Your Username"
                onChange={handleInputChange}
              ></input>

              <button type="submit" onClick={startTurn} id={styles.modalBtn}>
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