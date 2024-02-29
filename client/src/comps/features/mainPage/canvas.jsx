import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import TakeControl from "../controlPanel/takeControl";
import ControlPanel from "../controlPanel/controlPanel";
import styles from "./css/canvas.module.css";
import axios from 'axios'
function Canvas() {
  const [clickedSquares, setClickedSquares] = useState(new Set());
  const [moves, setMoves] = useState(20);
  const [grid, setGrid] = useState([]);
  const [user, setUser] = useState(false);
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
      setClickedSquares(
        (prevClickedSquares) => new Set([...prevClickedSquares, squareId])
      ); // Update clickedSquares with the new square's ID

      const colors = [
        styles.color1,
        styles.color2,
        styles.color3,
        styles.color4,
        styles.color5,
      ];
      const currentColorIndex = square.dataset.colorIndex || 0;
      const nextColorIndex = (parseInt(currentColorIndex) + 1) % colors.length;

      square.className = styles.square + " " + colors[nextColorIndex];
      square.dataset.colorIndex = nextColorIndex;

      // Increment moves by 1
    }

    if (moves <= 0) {
      // Perform necessary actions when moves reaches 0
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
  };

  //prop passed from controlpanel to disable 
  const handleTimerZero = () => {
    //setTimerReachedZero(true);
    disableColorChanges();
  };

  useEffect(() => {
    // Fetch auction information when component mounts
    axios
      .get(`/activeUser`)
      .then((response) => {
        // Update state with fetched auction information
        
        setUser(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching auction info:", error);
      });
  }, []);

  return (
    <div className={styles.container}>
      {!user ?<TakeControl /> : <ControlPanel moves={moves} onTimerZero={handleTimerZero} />}
      
      
      <div className={styles.grid}>{grid}</div>
     
    </div>
  );
}

export default Canvas;
