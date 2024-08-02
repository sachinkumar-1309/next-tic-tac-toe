// "use client";
// import React, { useState } from "react";

// function Square({ value, onSquareClick }) {
//   return (
//     <div
//       className="bg-slate-900 relative rounded w-20 h-20 font-bold flex justify-center items-center
//       drop-shadow-[18px_10px_10px_black] m-4 text-3xl text-white hover:scale-110 selection:bg-transparent selection:text-blue-600"
//       onClick={onSquareClick}>
//       {value}
//     </div>
//   );
// }

// function Board() {
//   const [xIsNext, setXIsNext] = useState(true);
//   const [Squares, setSquares] = useState(Array(9).fill(null));

//   let status = [];
//   const winner = calculateWinner(Squares);
//   if (winner) {
//     status = "Winner: " + winner;
//   } else {
//     status = "Next player: " + (xIsNext ? "X" : "O");
//   }

//   function handleClick(i) {
//     if (Squares[i] || calculateWinner(Squares)) {
//       return;
//     }
//     const nextSquares = Squares.slice();
//     if (xIsNext) {
//       nextSquares[i] = "X";
//     } else {
//       nextSquares[i] = "O";
//     }

//     setSquares(nextSquares);
//     setXIsNext(!xIsNext);
//   }
//   const resetGame = () => {
//     setBoard(initialBoard);
//     setCurrentPlayer('X');
//     setGameActive(true);
//   };

//   return (
//     <>
//       <div className="flex flex-col">
//         <div className="">
//           <h1 className="text-4xl font-sans font-bold drop-shadow-[8px_4px_11px_white] text-gray-200 selection:bg-transparent selection:text-gray-800 py-5 mb-3 ml-4 text-left ">
//             {status}
//           </h1>
//         </div>
//         <div className="w-full">
//           <div className="flex ">
//             <Square
//               value={Squares[0]}
//               onSquareClick={() => {
//                 handleClick(0);
//               }}
//             />
//             <Square
//               value={Squares[1]}
//               onSquareClick={() => {
//                 handleClick(1);
//               }}
//             />
//             <Square
//               value={Squares[2]}
//               onSquareClick={() => {
//                 handleClick(2);
//               }}
//             />
//           </div>

//           <div className="flex">
//             <Square
//               value={Squares[3]}
//               onSquareClick={() => {
//                 handleClick(3);
//               }}
//             />
//             <Square
//               value={Squares[4]}
//               onSquareClick={() => {
//                 handleClick(4);
//               }}
//             />
//             <Square
//               value={Squares[5]}
//               onSquareClick={() => {
//                 handleClick(5);
//               }}
//             />
//           </div>

//           <div className="flex">
//             <Square
//               value={Squares[6]}
//               onSquareClick={() => {
//                 handleClick(6);
//               }}
//             />
//             <Square
//               value={Squares[7]}
//               onSquareClick={() => {
//                 handleClick(7);
//               }}
//             />
//             <Square
//               value={Squares[8]}
//               onSquareClick={() => {
//                 handleClick(8);
//               }}
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// const page = () => {
//   const [xIsNext, setXIsNext] = useState(true);
//   const [history, setHistory] = useState(Array(9).fill(null));

//   return (
//     <div className="game w-full h-screen flex ">
//       <div className="game-board w-full flex justify-center items-center">
//         <Board />
//       </div>
//       <div className="game-info"></div>
//     </div>
//   );
// };

// function calculateWinner(Squares) {
//   const lines = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
//   ];
//   for (let i = 0; i < lines.length; i++) {
//     const [a, b, c] = lines[i];
//     if (Squares[a] && Squares[a] === Squares[b] && Squares[a] === Squares[c]) {
//       return Squares[a];
//     }
//   }
//   return null;
// }

// export default page;
"use client";
import { useState } from "react";
import styles from "./TicTacToe.module.css";
import { GrPowerReset } from "react-icons/gr";

const TicTacToe = () => {
	const initialBoard = Array(9).fill(null);
	const [board, setBoard] = useState(initialBoard);
	const [currentPlayer, setCurrentPlayer] = useState("cross"); // Use "cross" and "circle"
	const [gameActive, setGameActive] = useState(true);

	const handleCellClick = (index) => {
		if (board[index] || !gameActive) return;

		const newBoard = [...board];
		newBoard[index] = currentPlayer;
		setBoard(newBoard);

		const winner = checkForWinner(newBoard);
		if (winner) {
			setGameActive(false);
			alert(`${winner === "cross" ? "X" : "O"} wins!`);
		} else if (!newBoard.includes(null)) {
			setGameActive(false);
			alert("Draw!");
		} else {
			setCurrentPlayer(currentPlayer === "cross" ? "circle" : "cross");
		}
	};

	const checkForWinner = (board) => {
		const winningCombinations = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];

		for (let combination of winningCombinations) {
			const [a, b, c] = combination;
			if (board[a] && board[a] === board[b] && board[a] === board[c]) {
				return board[a];
			}
		}
		return null;
	};

	const resetGame = () => {
		setBoard(initialBoard);
		setCurrentPlayer("cross");
		setGameActive(true);
	};

	return (
		<div className="relative flex justify-center items-center ">
			<div className={styles.gameBoard}>
				<div className="absolute top-[-13%] left-2 w-24 h-24">
					<div className={styles.cross}></div>
				</div>
				<div className="absolute top-[-13%] left-16 w-24 h-24">
					<div className={styles.circle}></div>
				</div>

				<button className={styles.resetButton} onClick={resetGame}>
					<GrPowerReset />
				</button>
				{board.map((cell, index) => (
          <div
          key={index}
          className={`${styles.cell} `}
          onClick={() => handleCellClick(index)}>
						{cell === "cross" && <div className={styles.cross}></div>}
						{cell === "circle" && <div className={styles.circle}></div>}
					</div>
				))}
			</div>
		</div>
	);
};

export default TicTacToe;
