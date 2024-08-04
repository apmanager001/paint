import React from "react";

export const createGrid = (
  totalRows,
  totalColumns,
  combinedMoves,
  colorMapping,
  colorClasses,
  changeColor,
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
        onClick={changeColor}
      ></div>
    );
  }
  return squares;
};

export const combineMoves = (oldMoves, previousMoves) => {
  const combinedMoves = { ...oldMoves };
  previousMoves.forEach((move) => {
    combinedMoves[move.squareId] = move.color;
  });
  return combinedMoves;
};

export const handleChangeColor = (
  event,
  colorMapping,
  colorClasses,
  styles,
  setClickedSquares,
  setMoves,
  moves,
  gridChangeable,
  disableColorChanges
) => {
  if (!gridChangeable) {
    return;
  }

  const square = event.target;
  const squareId = square.id;
  const currentColorIndex = parseInt(square.dataset.colorIndex) || 0;
  const nextColorIndex = (currentColorIndex + 1) % Object.keys(colorMapping).length;
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
};

export const disableColorChanges = (setGrid, clickedSquares) => {
  setGrid((prevGrid) => {
    return prevGrid.map((square) => {
      if (!clickedSquares.some((sq) => sq.squareId === square.key)) {
        return React.cloneElement(square, { onClick: null });
      }
      return square;
    });
  });
};
