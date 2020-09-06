/** @format */

import React from "react";
import "./App.css";

import Canvas from "./canvas";
let columns = 10;
let rows = 8;
let grid;
let movement = 0;
let highlight = 6;

const create2dGrid = () => {
  const arr = new Array(rows);
  for (let i = 0; i < rows; i++) {
    arr[i] = new Array(rows);
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns + 1; j++) {
      if (j === highlight) {
        arr[i][j] = 1;
      } else {
        arr[i][j] = 0;
      }
    }
  }
  // console.table(arr);
  return arr;
};

grid = create2dGrid();

const setHightlight = () => {
  let next = grid;
  if (highlight < -1) {
    highlight = 10;
  }
  // console.log(highlight);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns + 1; j++) {
      if (j === highlight && highlight >= -1) {
        next[i][j] = grid[i][j + 1];
      } else if (highlight === 10) {
        if (j === 10) {
          next[i][j] = 1;
        }
      } else {
        // next[i][j] = grid[i][j + 1];
        next[i][j] = 0;
      }
    }
  }
  // console.table(next)
  return next;
};

const draw2dGrid = (ctx, grid) => {
  let cellSize = ctx.canvas.width / columns;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.lineWidth = 1;
  movement += 1;
  // setHightlight();

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns + 1; j++) {
      let x = cellSize * i;
      let y = cellSize * j;
      let xPos = y - movement;

      if (grid[i][j] === 0) {
        ctx.beginPath();
        ctx.rect(xPos, x + cellSize, cellSize, cellSize);
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.closePath();
      } else {
        ctx.beginPath();
        ctx.rect(xPos, x + cellSize, cellSize, cellSize);
        ctx.fillStyle = "darkgreen";
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.closePath();
      }
      if (xPos + cellSize <= -1) {
        movement = 0;
        highlight--;
        // setHightlight()
        grid = setHightlight();
      }
    }
  }

  // }
  // console.log(highlight);
  // return highlight
};

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        Canvas - Infinite Scrolling Array
        <Canvas
          create2dGrid={create2dGrid}
          draw2dGrid={draw2dGrid}
          setHightlight={setHightlight}
          grid={grid}
        ></Canvas>
      </header>
    </div>
  );
}

export default App;
