import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { generateList } from "../../utils/faker";
import { WordFind } from "../../utils/grid2";
import Completion from "../Completion/Completion";
const { orientations } = WordFind();
const Grid2 = () => {
	const [grid, setGrid] = useState([[]]);
	const [words, setWords] = useState<string[]>([]);
	const [foundWords, setFoundWords] = useState<
		{ x: number; y: number; word: string }[]
	>([]);
	const [isCompleted, setIsCompleted] = useState(false);
	const foundStrings = useRef(new Set());
	const currentRef = useRef("");
	const [selectedWords, setSelectedWords] = useState<
		{ x: number; y: number; word: string }[]
	>([]);
	const checkForWords = (
		word: string,
		temp: { x: number; y: number; word: string }[]
	) => {
		const isFound = words.some((item) => item == word);
		if (isFound) {
			foundStrings.current.add(word);
			setFoundWords([...foundWords, ...temp]);
			setSelectedWords([]);
			currentRef.current = "";
		}
		return isFound;
	};
	const setStartNode = (rowIndex: number, collndex: number, word: string) => {
		if (!selectedWords.length) {
			setSelectedWords([{ x: rowIndex, y: collndex, word: word }]);
		} else {
			// checkForWords('');
			setSelectedWords([]);
		}
	};

	const setEndPoint = (rowIndex: number, collndex: number) => {
		if (!selectedWords.length) return;
		const start = selectedWords[0];
		if (start.x == rowIndex && start.y == collndex) return;
		// horizontal check
		if (start.x == rowIndex && start.y != collndex) {
			const dir = start.y - collndex;

			const temp = [start];
			let word = "";
			for (let i = 0; i <= Math.abs(dir); i++) {
				const idx = start.y + i * (dir < 0 ? 1 : -1);
				word += grid[rowIndex][idx];
				temp.push({
					x: rowIndex,
					y: idx,
					word: grid[rowIndex][idx],
				});
				if (checkForWords(word, temp)) return;
				if (checkForWords(word.split("").reverse().join(""), temp))
					return;
			}
			currentRef.current = word;
			setSelectedWords(temp);
		}
		// vertical check
		if (start.x != rowIndex && start.y == collndex) {
			const dir = rowIndex - start.x;
			const temp = [start];
			let word = "";
			for (let i = 0; i <= Math.abs(dir); i++) {
				const idx = start.x + i * (dir > 0 ? 1 : -1);
				word += grid[idx][collndex];
				temp.push({
					y: collndex,
					x: idx,
					word: grid[idx][collndex],
				});
				if (checkForWords(word, temp)) return;
				if (checkForWords(word.split("").reverse().join(""), temp))
					return;
			}
			currentRef.current = word;
			setSelectedWords(temp);
		}
		// diagonal dir
		if (Math.abs(start.x - rowIndex) == Math.abs(start.y - collndex)) {
			const dirX = rowIndex - start.x;
			const dirY = collndex - start.y;
			const temp = [start];
			let word = "";
			for (let i = 0; i <= Math.abs(dirX); i++) {
				const idxR = start.x + i * (dirX > 0 ? 1 : -1);
				const idxC = start.y + i * (dirY > 0 ? 1 : -1);
				word += grid[idxR][idxC];
				temp.push({
					y: idxC,
					x: idxR,
					word: grid[idxR][idxC],
				});
				if (checkForWords(word, temp)) return;
				if (checkForWords(word.split("").reverse().join(""), temp))
					return;
			}
			currentRef.current = word;
			setSelectedWords(temp);
		}
	};

	const solvePuzzle = () => {
		const soln = WordFind().solve(grid, words);
		const temp = [];

		for (const i of soln.found) {
			for (let j = 0; j < i.overlap; j++) {
				const t = orientations[i.orientation](i.x, i.y, j);
				temp.push({ y: t.x, x: t.y, word: grid[t.x][t.y] });
			}
		}
		setFoundWords(temp);
	};
	const newPuzzle = () => {
		const words = generateList();
		const list = WordFind().newPuzzle(words, {
			height: 12,
			width: 12,
			fillBlanks: true,
		});
		foundStrings.current = new Set();
		setGrid(list);
		setWords(words);
		setFoundWords([]);
		setSelectedWords([]);
		setIsCompleted(false);
	};
	useEffect(() => {
		newPuzzle();
	}, []);
	useEffect(() => {
		if (words.length && foundStrings.current.size == words.length) {
			setIsCompleted(true);
		}
	});
	return (
		<div className="h-screen w-full flex items-center justify-center bg-slate-900 gap-4">
			<div className="w-max grid grid-cols-12 content-center gap-2">
				{grid.map((item, rowIndex: number) => {
					return item.map((word: string, columnIndex: number) => {
						const isSelected = selectedWords.some(
							(item) =>
								item.x == rowIndex && item.y == columnIndex
						);
						const isFound = foundWords.some(
							(item) =>
								item.x == rowIndex && item.y == columnIndex
						);
						return (
							<div
								id={`${rowIndex}-${columnIndex}`}
								className={twMerge(
									"w-10 h-10 capitalize text-white bg-slate-700 flex items-center justify-center rounded-md transition-all",
									`${
										isSelected
											? "bg-yellow-400 scale-110"
											: ""
									} ${
										isFound ? "bg-green-400 scale-105" : ""
									}`
								)}
								onClick={() =>
									setStartNode(rowIndex, columnIndex, word)
								}
								onMouseEnter={() => {
									setEndPoint(rowIndex, columnIndex);
								}}>
								{word}
							</div>
						);
					});
				})}
			</div>
			<div className="flex flex-col items-start gap-2  max-w-[15rem] flex-wrap">
				<button
					onClick={newPuzzle}
					className="bg-slate-400 px-4 py-2 font-bold text-white rounded-lg">
					New Puzzle
				</button>
				<button
					onClick={solvePuzzle}
					className="bg-slate-400 px-4 py-2 font-bold text-white rounded-lg">
					Solve
				</button>
				<div className="flex gap-2  max-w-[15rem] flex-wrap">
					{words.map((item) => (
						<div
							className={twMerge(
								"px-4 py-2 font-bold bg-white rounded-lg",
								`${
									foundStrings.current.has(item)
										? "line-through"
										: ""
								}`
							)}>
							{item}
						</div>
					))}
				</div>
			</div>
			{isCompleted && <Completion onClick={newPuzzle} />}
		</div>
	);
};

export default Grid2;
