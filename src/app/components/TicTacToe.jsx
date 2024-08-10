"use client";
import { useState } from "react";
import styles from "./TicTacToe.module.css";
import { GrPowerReset } from "react-icons/gr";

const TicTacToe = () => {
	const initialBoard = Array(9).fill(null);
	const [board, setBoard] = useState(initialBoard);
	const [currentPlayer, setCurrentPlayer] = useState("cross"); // Use "cross" and "circle"
	const [winningCombination, setWinningCombination] = useState([]);
	const [gameActive, setGameActive] = useState(true);

	const handleCellClick = (index) => {
		if (board[index] || !gameActive) return;

		const newBoard = [...board];
		newBoard[index] = currentPlayer;
		setBoard(newBoard);

		const { winner, combination } = checkForWinner(newBoard);
		if (winner) {
			setGameActive(false);
			setWinningCombination(combination);
			// alert(`${winner === "cross" ? "X" : "O"} wins!`);
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
				return { winner: board[a], combination };
			}
		}
		return { winner: null, combination: [] };
	};

	const resetGame = () => {
		setBoard(initialBoard);
		setCurrentPlayer("cross");
		setGameActive(true);
		setWinningCombination([]);
	};

	return (
		<div className="relative flex justify-center items-center ">
			<div className="">
				<div className={styles.gameBoard}>
					<div className="absolute sm:top-[-11%] top-[-16%] left-2 sm:w-28 w-24 sm:h-28 h-24 ">
						<div className={styles.cross}></div>
					</div>
					<div className="absolute sm:top-[-11%] top-[-16%] left-16 sm:w-28 w-24 sm:h-28 h-24">
						<div className={styles.circle}></div>
					</div>
					<div className="absolute sm:px-6 rounded-[8px] sm:top-[-13%] top-[-18%]  left-[38%] w-28 bg-[#1f3540] shadow-custom sm:h-12 h-12 text-[#a8bec9] font-extrabold sm:text-3xl text-2xl">
						<div className="h-full w-full flex justify-center items-center text-[#a8bec9] ">
							{currentPlayer == "cross" ? "X" : "O"}{" "}
							<span className="ml-3 sm:text-xl text-lg  font-bold">TURN</span>
						</div>
					</div>

					<button className={styles.resetButton} onClick={resetGame}>
						<GrPowerReset />
					</button>
					{board.map((cell, index) => (
						<div
							key={index}
							className={`${
								winningCombination.includes(index)
									? styles.winningCell
									: styles.cell
							}`}
							onClick={() => handleCellClick(index)}>
							{cell === "cross" && <div className={`${
								winningCombination.includes(index)
									? styles.winningCross
									: styles.cross
							}`}></div>}
							
							{cell === "circle" && <div className={`${
								winningCombination.includes(index)
									? styles.winningCircle
									: styles.circle
							}`}></div>}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default TicTacToe;
