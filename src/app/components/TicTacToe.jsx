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
		console.log(index);
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
			<div className="">
				<div className={styles.gameBoard}>
					<div className="absolute top-[-13%] left-2 w-24 h-24">
						<div className={styles.cross}></div>
					</div>
					<div className="absolute top-[-13%] left-16 w-24 h-24">
						<div className={styles.circle}></div>
					</div>
					<div className="absolute px-2 rounded top-[-13%] left-[38%] w-28 bg-[#1f3540] h-12 text-[#a8bec9] font-extrabold text-3xl">
						<div className="h-full w-full flex justify-center items-center text-[#a8bec9] ">{currentPlayer == "cross" ? "X" : "O"} <span className="ml-3 text-xl font-bold">TURN</span></div>
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
		</div>
	);
};

export default TicTacToe;
