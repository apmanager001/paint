import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import Users from './features/users/users';

import styles from './css/canvas.module.css';

function Canvas() {
  const [clickedSquares, setClickedSquares] = useState(new Set());
  const [moves, setMoves] = useState(20);
  const [grid, setGrid] = useState([]);
  const counterRef = useRef(null);
  const [time, setTime] = useState({
    minutes: 5,
    seconds: 0
  });
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };



  const [timerReachedZero, setTimerReachedZero] = useState(false);
  // Set grid number of Rows and Columns
  const totalRows = 85;
  const totalColumns = 65;

  useLayoutEffect(() => {
    createGrid();
  }, []); // Empty dependency array ensures it runs once on mount

  useEffect(() => {
    if (timerReachedZero) {
      disableColorChanges();
    }
  }, [timerReachedZero]);

  function changeColor(event) {
    const square = event.target;
    const squareId = square.id;
  
    // Check if the square has already been clicked
    if (!clickedSquares.has(squareId)) {
      setClickedSquares((prevClickedSquares) => new Set([...prevClickedSquares, squareId])); // Update clickedSquares with the new square's ID
  
      const colors = [styles.color1, styles.color2, styles.color3, styles.color4, styles.color5];
      const currentColorIndex = square.dataset.colorIndex || 0;
      const nextColorIndex = (parseInt(currentColorIndex) + 1) % colors.length;
  
      square.className = styles.square + ' ' + colors[nextColorIndex];
      square.dataset.colorIndex = nextColorIndex;
  
      // Increment moves by 1
      
    }
  
    if (moves <= 0) {
      // Perform necessary actions when moves reaches 0
      // Additional logic here
      disableColorChanges();
    }
  }
  
  // Call this function separately if needed
  
  useEffect(() => {
    setMoves(20 - clickedSquares.size);
  }, [clickedSquares]);
  

  useEffect(() => {
    if (clickedSquares.size === 20) {
      disableColorChanges();
    }
  }, [clickedSquares.size]);

  
  function createGrid() {
    const squares = [];
    for (let i = 0; i < totalRows * totalColumns; i++) {
      squares.push(
        <div
          key={i + 1}
          className={styles.square}
          id={i + 1}
          onClick={changeColor}
        ></div>
      );
    }
    setGrid(squares);
  }

  const disableColorChanges = () => {
    // Logic to disable color changes, e.g., remove event listeners
    setGrid((prevGrid) => {
      return prevGrid.map((square) => {
        if (!clickedSquares.has(square)) {
          // Disable color changes by removing the onClick handler
          return React.cloneElement(square, { onClick: null });
        }
        return square;
      });
    });
  
    
  }

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
    <div className={styles.container}>
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
      <div className={styles.grid}>{grid}</div>
      <div id={styles.counter} ref={counterRef}>
      </div>
      
       <Users /> 
    </div>
    
  );
}

export default Canvas; 