import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./css/canvas.module.css";
import TakeControl from "../controlPanel/takeControl";
import ControlPanel from "../controlPanel/controlPanel";

// Utility functions
const createGrid = (
  totalRows,
  totalColumns,
  combinedMoves,
  colorMapping,
  colorClasses,
  styles
) => {
  const squares = [];
  for (let i = 0; i < totalRows * totalColumns; i++) {
    const squareId = (i + 1).toString();
    const color = combinedMoves[squareId] || "white";
    const colorClass = colorClasses[color] || "";

    squares.push(
      <div
        key={i + 1}
        className={`${styles.square} ${colorClass}`}
        id={squareId}
        data-color-index={Object.keys(colorMapping).find(
          (key) => colorMapping[key] === color
        )}
      ></div>
    );
  }
  return squares;
};

const combineMoves = (oldMoves, previousMoves) => {
  const combinedMoves = { ...oldMoves };
  previousMoves.forEach((move) => {
    combinedMoves[move.squareId] = move.color;
  });
  return combinedMoves;
};

const disableColorChanges = (setGrid, clickedSquares) => {
  setGrid((prevGrid) => {
    return prevGrid.map((square) => {
      if (!clickedSquares.some((sq) => sq.squareId === square.key)) {
        return React.cloneElement(square, { onClick: null });
      }
      return square;
    });
  });
};

function ExistingCanvas({
  previousMoves,
  colorMapping,
  colorClasses,
  canvasId,
}) {
  const [oldMoves, setOldMoves] = useState({});
  const [grid, setGrid] = useState([]);
  const [clickedSquares, setClickedSquares] = useState([]);
  const [moves, setMoves] = useState(20);
  const [user, setUser] = useState(false);
  const [username, setUsername] = useState("");
  const [gridChangeable, setGridChangeable] = useState(false);
  const [timerReachedZero, setTimerReachedZero] = useState(false);
  const totalRows = 85;
  const totalColumns = 65;

  const handleChangeColor = (event) => {
    console.log("Change color called");
    if (!gridChangeable) {
      console.log("Grid is not changeable.");
      return;
    }

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

    square.className = `${styles.square} ${colorClasses[nextColor]}`;
    square.dataset.colorIndex = nextColorIndex;

    setMoves((prevMoves) => prevMoves - 1);
    if (moves <= 0) {
      disableColorChanges(setGrid, clickedSquares);
    }
  };
console.log(moves)
  useEffect(() => {
    if (moves <= 0) {
      disableColorChanges(setGrid, clickedSquares);
    }
  }, [moves])

  useEffect(() => {
    const fetchCurrentUsers = async () => {
      try {
        if (canvasId) {
          const response = await axios.get(`/currentUsers/${canvasId}`);
          const entries = response.data;
          console.log("Fetched current users:", entries);

          const squareIdToColor = {};
          entries.forEach((entry) => {
            entry.moves.forEach((move) => {
              squareIdToColor[move.squareId] = move.color;
            });
          });

          setOldMoves(squareIdToColor);
        }
      } catch (error) {
        console.error("Error fetching current users:", error);
      }
    };

    fetchCurrentUsers();
  }, [canvasId]);

  useEffect(() => {
    const combinedMoves = combineMoves(oldMoves, []);
    console.log("Combining moves in useEffect:", combinedMoves);
    setGrid(
      createGrid(
        totalRows,
        totalColumns,
        combinedMoves,
        colorMapping,
        colorClasses,
        styles
      )
    );
  }, [oldMoves]);

  useEffect(() => {
    if (timerReachedZero || moves === 0) {
      console.log(
        "Timer reached zero or moves are zero. Disabling color changes."
      );
      disableColorChanges(setGrid, clickedSquares);

      const dataToSend = {
        canvasId: canvasId,
        squares: clickedSquares,
        users: username,
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
          data: {
            canvasId: dataToSend.canvasId,
            users: dataToSend.users || "apmanager",
          },
        })
        .then((response) => {
          console.log("Active user deleted successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error deleting active user:", error);
        });
    }
  }, [timerReachedZero, moves]);

  useEffect(() => {
    if (gridChangeable) {
      const squares = document.querySelectorAll(`.${styles.square}`);
      squares.forEach((square) => {
        square.addEventListener("click", handleChangeColor);
      });

      return () => {
        squares.forEach((square) => {
          square.removeEventListener("click", handleChangeColor);
        });
      };
    }
  }, [gridChangeable, moves]);

  useEffect(() => {
    setMoves(20 - clickedSquares.length);
  }, [clickedSquares]);

  useEffect(() => {
    if (clickedSquares.length === 20) {
      disableColorChanges(setGrid, clickedSquares);
    }
  }, [clickedSquares.length]);

  const handleTimerZero = () => {
    setTimerReachedZero(true);
  };

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        if (canvasId) {
          setBlankCanvas(false);
        }
      } catch (error) {
        console.error("Error checking users:", error);
      }
    };
    fetchEntry();
  }, [canvasId]);

  const handleStartTurn = (username) => {
    console.log("Starting turn for user:", username);
    setUser(true);
    setUsername(username);

    // Ensure the grid is set to changeable only after it is fully set up
    const combinedMoves = combineMoves(oldMoves, clickedSquares);
    console.log("Combined moves in handleStartTurn:", combinedMoves);
    setGrid(
      createGrid(
        totalRows,
        totalColumns,
        combinedMoves,
        colorMapping,
        colorClasses,
        styles
      )
    );

    // Delay setting gridChangeable to ensure grid is updated first
    setTimeout(() => {
      setGridChangeable(true);
      console.log("Grid is now changeable.");
    }, 0);
  };

  return (
    <>
      {user ? (
        <ControlPanel
          moves={moves}
          onTimerZero={handleTimerZero}
          username={username}
        />
      ) : (
        <TakeControl canvasId={canvasId} onStartTurn={handleStartTurn} />
      )}
      <div className={styles.grid}>{grid}</div>
    </>
  );
}

export default ExistingCanvas;
