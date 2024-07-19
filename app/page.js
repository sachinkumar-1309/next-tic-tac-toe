"use client";
import React, { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <div
      className="bg-slate-900 relative rounded w-20 h-20 font-bold flex justify-center items-center 
      drop-shadow-[18px_10px_10px_black] m-4 text-3xl text-white hover:scale-110 selection:bg-transparent selection:text-blue-600"
      onClick={onSquareClick}>
      {value}
    </div>
  );
}

function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [Squares, setSquares] = useState(Array(9).fill(null));

  let status = [];
  const winner = calculateWinner(Squares);
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  function handleClick(i) {
    if (Squares[i] || calculateWinner(Squares)) {
      return;
    }
    const nextSquares = Squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  return (
    <>
      <div className="flex flex-col">
        <div className="">
          <h1 className="text-4xl font-sans font-bold drop-shadow-[8px_4px_11px_white] text-gray-200 selection:bg-transparent selection:text-gray-800 py-5 mb-3 ml-4 text-left ">
            {status}
          </h1>
        </div>
        <div className="w-full">
          <div className="flex ">
            <Square
              value={Squares[0]}
              onSquareClick={() => {
                handleClick(0);
              }}
            />
            <Square
              value={Squares[1]}
              onSquareClick={() => {
                handleClick(1);
              }}
            />
            <Square
              value={Squares[2]}
              onSquareClick={() => {
                handleClick(2);
              }}
            />
          </div>

          <div className="flex">
            <Square
              value={Squares[3]}
              onSquareClick={() => {
                handleClick(3);
              }}
            />
            <Square
              value={Squares[4]}
              onSquareClick={() => {
                handleClick(4);
              }}
            />
            <Square
              value={Squares[5]}
              onSquareClick={() => {
                handleClick(5);
              }}
            />
          </div>

          <div className="flex">
            <Square
              value={Squares[6]}
              onSquareClick={() => {
                handleClick(6);
              }}
            />
            <Square
              value={Squares[7]}
              onSquareClick={() => {
                handleClick(7);
              }}
            />
            <Square
              value={Squares[8]}
              onSquareClick={() => {
                handleClick(8);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

const page = () => {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState(Array(9).fill(null));

  return (
    <div className="game w-full h-screen flex ">
      <div className="game-board w-full flex justify-center items-center">
        <Board />
      </div>
      <div className="game-info"></div>
    </div>
  );
};

function calculateWinner(Squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (Squares[a] && Squares[a] === Squares[b] && Squares[a] === Squares[c]) {
      return Squares[a];
    }
  }
  return null;
}

export default page;
