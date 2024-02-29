import React, {useState, useEffect} from 'react'
import styles from './css/controlPanel.module.css'


const ControlPanel = ({moves, onTimerZero}) => {
  const [time, setTime] = useState({
    minutes: 5,
    seconds: 0
  });
  const [timerReachedZero, setTimerReachedZero] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  

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
              onTimerZero();
              return { minutes: 0, seconds: 0 };
            }
    
            return { minutes, seconds };
          });
        }, 1000);
    
        return () => clearInterval(countdownClock);
      }, [onTimerZero]);

  return (


    <div className={styles.header}>
        <div className={styles.name}>Name</div>

        <div className={styles.moves} id={styles.counter}>Moves Left: {moves} </div>

        <div className={styles.clock} id={styles.timer}>
  {`${time.minutes}:${time.seconds < 10 ? '0' : ''}${time.seconds}`}
        </div>
    
      </div>



  )
}

export default ControlPanel