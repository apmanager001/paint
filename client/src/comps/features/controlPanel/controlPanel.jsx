import React from 'react'



const ControlPanel = () => {

    useEffect(() => {
        const countDownDate = new Date().getTime() + time.minutes * 60 * 1000 + time.seconds * 1000;
    
        const countdownClock = setInterval(() => {
          setTime((prevTime) => {
            const now = new Date().getTime();
            const distance = countDownDate - now;
    
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
            if (distance < 0) {
              clearInterval(countdownClock);
              setTimerReachedZero(true);
              return { minutes: 0, seconds: 0 };
            }
    
            return { minutes, seconds };
          });
        }, 1000);
    
        return () => clearInterval(countdownClock); // Cleanup on component unmount
      }, []);





  return (


    <div className={styles.header}>
        <div className={styles.name}>Name</div>

        <div className={styles.moves} id={styles.counter}>Moves Left: {moves} </div>

        <div className={styles.clock} id={styles.timer}>
  {`${time.minutes}:${time.seconds < 10 ? '0' : ''}${time.seconds}`}
        </div>
    <div className={styles.controlContainer}>
      <button className={styles.controlBtn} onClick={openModal}>
          Take Control
        </button>
        {modalVisible && (
            <div id="ruleModal" className={styles.modal}>
            <div className={styles.modalContent}>
                <span className={styles.close} onClick={closeModal}>&times;</span>
                 
                 <div className={styles.inputButton}> 
                  <input id={styles.modalInput} placeholder='Your Nickname'></input>
                  
                  <button type="submit" value="Submit" id={styles.modalBtn}>Submit</button></div>
                
            </div>
            </div>
          )}
      </div>
      </div>



  )
}

export default ControlPanel