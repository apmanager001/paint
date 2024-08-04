import React, { useState, useEffect, useLayoutEffect } from "react";
import {toast} from 'react-hot-toast'
import TakeControl from "../controlPanel/takeControl";
import ControlPanel from "../controlPanel/controlPanel";
import styles from "./css/canvas.module.css";
import axios from "axios";
import ExistingCanvas from "./existingCanvas";

function Canvas({ originalCanvasId }) {
  const [clickedSquares, setClickedSquares] = useState([]);
  const [moves, setMoves] = useState(20);
  const [grid, setGrid] = useState([]);
  const [user, setUser] = useState(false);
  const [username, setUsername] = useState('')
  const [gridChangeable, setGridChangeable] = useState(false)
  const [blankCanvas, setBlankCanvas] = useState(false);
  const [timerReachedZero, setTimerReachedZero] = useState(false);
  const [errorMessage,  setErrorMessage] = useState('');

  const totalRows = 85;
  const totalColumns = 65;

  const colorMapping = {
    0: "blue",
    1: "green",
    2: "yellow",
    3: "gray",
    4: "red",
  };

  const colorClasses = {
    blue: styles.color1,
    green: styles.color2,
    yellow: styles.color3,
    gray: styles.color4,
    red: styles.color5,
  };

  useLayoutEffect(() => {
    createGrid();
  }, [gridChangeable]);

  useEffect(() => {
    if (timerReachedZero || moves === 0) {
      disableColorChanges();

      const dataToSend = {
      canvasId: originalCanvasId,
      squares: clickedSquares,
      users: username
    };
      
      axios
        .post("/submitTurn", dataToSend)
        .then((response) => {
          toast.success("Thank you for Being part of the community");
          window.location.href = "/";
        })
        .catch((error) => {
          console.error("Error submitting data:", error);
          setErrorMessage("An error occurred while submitting data");
        });

        axios
          .delete("/deleteActive", {
            data: { canvasId: dataToSend.canvasId, users: dataToSend.users || 'apmanager' },
          })
          .then((response) => {
            console.log("Active user deleted successfully:", response.data);
          })
          .catch((error) => {
            console.error("Error deleting active user:", error);
          });
    }
  }, [timerReachedZero, moves]);

  const changeColor = (event) => {
    if (gridChangeable) {
      const square = event.target;
      const squareId = square.id;
      const currentColorIndex = parseInt(square.dataset.colorIndex) || 0;
      const nextColorIndex =
        (currentColorIndex + 1) % Object.keys(colorMapping).length;
      const nextColor = colorMapping[nextColorIndex];

      setClickedSquares((prevClickedSquares) => {
        const existingSquareIndex = prevClickedSquares.findIndex(
          (sq) => sq.squareId === squareId
        );

        if (existingSquareIndex === -1) {
          return [...prevClickedSquares, { squareId, color: nextColor }];
        } else {
          const updatedSquares = [...prevClickedSquares];
          updatedSquares[existingSquareIndex].color = nextColor;
          return updatedSquares;
        }
      });

      square.className = styles.square + " " + colorClasses[nextColor];
      square.dataset.colorIndex = nextColorIndex;

      if (moves <= 0) {
        disableColorChanges();
      }
    } else {
      return;
    }

  };

  useEffect(() => {
    setMoves(20 - clickedSquares.length);
  }, [clickedSquares]);

  useEffect(() => {
    if (clickedSquares.length === 20) {
      disableColorChanges();
    }
  }, [clickedSquares.length]);

  const createGrid = () => {
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

};

  const disableColorChanges = () => {
    setGrid((prevGrid) => {
      return prevGrid.map((square) => {
        if (!clickedSquares.some((sq) => sq.squareId === square.key)) {
          return React.cloneElement(square, { onClick: null });
        }
        return square;
      });
    });
  };

  const handleTimerZero = () => {
    setTimerReachedZero(true);

  };

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        if (originalCanvasId) {
          setBlankCanvas(false);
        }
      } catch (error) {
        console.error("Error checking users:", error);
      }
    };
    fetchEntry();
  }, [originalCanvasId]);


  const handleStartTurn = (username) => {
    setUser(true)
    setGridChangeable(true)
    setUsername(username);
  }
  return (
    <div className={styles.container}>
      {blankCanvas ? (
        <>
          {user ? (
            <ControlPanel
              moves={moves}
              onTimerZero={handleTimerZero}
              username={username}
            />
          ) : (
            <TakeControl
              canvasId={originalCanvasId}
              onStartTurn={handleStartTurn}
            />
          )}
          <div className={styles.grid}>{grid}</div>
        </>
      ) : (
        <>
          <ExistingCanvas
            canvasId={originalCanvasId}
            previousMoves={clickedSquares}
            colorMapping={colorMapping}
            colorClasses={colorClasses}
            changeColor={changeColor}
          />
        </>
      )}
    </div>
  );
}

export default Canvas;
