export const WordFind = function () {
	// Letters used to fill blank spots in the puzzle
	const letters = "abcdefghijklmnoprstuvwy";

	const allOrientations = [
		"horizontal",
		"horizontalBack",
		"vertical",
		"verticalUp",
		"diagonal",
		"diagonalUp",
		"diagonalBack",
		"diagonalUpBack",
	];

	const orientations: any = {
		horizontal: function (x: number, y: number, i: number) {
			return { x: x + i, y: y };
		},
		horizontalBack: function (x: number, y: number, i: number) {
			return { x: x - i, y: y };
		},
		vertical: function (x: number, y: number, i: number) {
			return { x: x, y: y + i };
		},
		verticalUp: function (x: number, y: number, i: number) {
			return { x: x, y: y - i };
		},
		diagonal: function (x: number, y: number, i: number) {
			return { x: x + i, y: y + i };
		},
		diagonalBack: function (x: number, y: number, i: number) {
			return { x: x - i, y: y + i };
		},
		diagonalUp: function (x: number, y: number, i: number) {
			return { x: x + i, y: y - i };
		},
		diagonalUpBack: function (x: number, y: number, i: number) {
			return { x: x - i, y: y - i };
		},
	};

	const checkOrientations: any = {
		horizontal: function (
			x: number,
			y: number,
			h: number,
			w: number,
			l: number
		) {
			return w >= x + l;
		},
		horizontalBack: function (
			x: number,
			y: number,
			h: number,
			w: number,
			l: number
		) {
			return x + 1 >= l;
		},
		vertical: function (
			x: number,
			y: number,
			h: number,
			w: number,
			l: number
		) {
			return h >= y + l;
		},
		verticalUp: function (
			x: number,
			y: number,
			h: number,
			w: number,
			l: number
		) {
			return y + 1 >= l;
		},
		diagonal: function (
			x: number,
			y: number,
			h: number,
			w: number,
			l: number
		) {
			return w >= x + l && h >= y + l;
		},
		diagonalBack: function (
			x: number,
			y: number,
			h: number,
			w: number,
			l: number
		) {
			return x + 1 >= l && h >= y + l;
		},
		diagonalUp: function (
			x: number,
			y: number,
			h: number,
			w: number,
			l: number
		) {
			return w >= x + l && y + 1 >= l;
		},
		diagonalUpBack: function (
			x: number,
			y: number,
			h: number,
			w: number,
			l: number
		) {
			return x + 1 >= l && y + 1 >= l;
		},
	};

	const skipOrientations: any = {
		horizontal: function (x: number, y: number, l: number) {
			return { x: 0, y: y + 1 };
		},
		horizontalBack: function (x: number, y: number, l: number) {
			return { x: l - 1, y: y };
		},
		vertical: function (x: number, y: number, l: number) {
			return { x: 0, y: y + 100 };
		},
		verticalUp: function (x: number, y: number, l: number) {
			return { x: 0, y: l - 1 };
		},
		diagonal: function (x: number, y: number, l: number) {
			return { x: 0, y: y + 1 };
		},
		diagonalBack: function (x: number, y: number, l: number) {
			return { x: l - 1, y: x >= l - 1 ? y + 1 : y };
		},
		diagonalUp: function (x: number, y: number, l: number) {
			return { x: 0, y: y < l - 1 ? l - 1 : y + 1 };
		},
		diagonalUpBack: function (x: number, y: number, l: number) {
			return { x: l - 1, y: x >= l - 1 ? y + 1 : y };
		},
	};

	const fillPuzzle = function (words: string[], options: any) {
		const puzzle = [];
		let i, j, len;
		console.log("options = ", options);

		// initialize the puzzle with blanks
		for (i = 0; i < options.height; i++) {
			puzzle.push([]);
			for (j = 0; j < options.width; j++) {
				puzzle[i].push("");
			}
		}

		// add each word into the puzzle one at a time
		len = words.length;
		for (i = 0; i < len; i++) {
			if (!placeWordInPuzzle(puzzle, options, words[i])) {
				// if a word didn't fit in the puzzle, give up
				return null;
			}
		}

		// return the puzzle
		return puzzle;
	};

	const placeWordInPuzzle = function (
		puzzle: string[][],
		options: string[],
		word: string
	) {
		// find all of the best locations where this word would fit
		const locations = findBestLocations(puzzle, options, word);

		if (locations.length === 0) {
			return false;
		}

		// select a location at random and place the word there
		const sel = locations[Math.floor(Math.random() * locations.length)];
		placeWord(puzzle, word, sel.x, sel.y, orientations[sel.orientation]);

		return true;
	};

	const findBestLocations = function (
		puzzle: string[][],
		options: any,
		word: string
	) {
		const locations = [],
			height = options.height,
			width = options.width,
			wordLength = word.length;
		let maxOverlap = 0; // we'll start looking at overlap = 0

		// loop through all of the possible orientations at this position
		for (let k = 0, len = options.orientations.length; k < len; k++) {
			const orientation = options.orientations[k],
				check = checkOrientations[orientation],
				next = orientations[orientation],
				skipTo = skipOrientations[orientation];
			let x = 0;
			let y = 0;

			// loop through every position on the board
			while (y < height) {
				// see if this orientation is even possible at this location
				if (check(x, y, height, width, wordLength)) {
					// determine if the word fits at the current position
					const overlap = calcOverlap(word, puzzle, x, y, next);

					// if the overlap was bigger than previous overlaps that we've seen
					if (
						overlap >= maxOverlap ||
						(!options.preferOverlap && overlap > -1)
					) {
						maxOverlap = overlap;
						locations.push({
							x: x,
							y: y,
							orientation: orientation,
							overlap: overlap,
						});
					}

					x++;
					if (x >= width) {
						x = 0;
						y++;
					}
				} else {
					// if current cell is invalid, then skip to the next cell where
					// this orientation is possible. this greatly reduces the number
					// of checks that we have to do overall
					const nextPossible = skipTo(x, y, wordLength);
					x = nextPossible.x;
					y = nextPossible.y;
				}
			}
		}

		// finally prune down all of the possible locations we found by
		// only using the ones with the maximum overlap that we calculated
		return options.preferOverlap
			? pruneLocations(locations, maxOverlap)
			: locations;
	};

	const calcOverlap = function (
		word: string,
		puzzle: string[][],
		x: number,
		y: number,
		fnGetSquare: any
	) {
		let overlap = 0;

		// traverse the squares to determine if the word fits
		for (let i = 0, len = word.length; i < len; i++) {
			const next = fnGetSquare(x, y, i),
				square = puzzle[next.y][next.x];

			// if the puzzle square already contains the letter we
			// are looking for, then count it as an overlap square
			if (square === word[i]) {
				overlap++;
			}
			// if it contains a different letter, than our word doesn't fit
			// here, return -1
			else if (square !== "") {
				return -1;
			}
		}

		// if the entire word is overlapping, skip it to ensure words aren't
		// hidden in other words
		return overlap;
	};

	const pruneLocations = function (locations: any, overlap: any) {
		const pruned = [];
		for (let i = 0, len = locations.length; i < len; i++) {
			if (locations[i].overlap >= overlap) {
				pruned.push(locations[i]);
			}
		}

		return pruned;
	};

	const placeWord = function (
		puzzle: string[][],
		word: string,
		x: number,
		y: number,
		fnGetSquare: any
	) {
		for (let i = 0, len = word.length; i < len; i++) {
			const next = fnGetSquare(x, y, i);
			puzzle[next.y][next.x] = word[i];
		}
	};

	return {
		validOrientations: allOrientations,

		orientations: orientations,

		newPuzzle: function (words: string[], settings: any) {
			let wordList,
				puzzle,
				attempts = 0;
			const opts = settings || {};

			console.log("newPuzzle() :: settings = ", settings);

			// copy and sort the words by length, inserting words into the puzzle
			// from longest to shortest works out the best
			wordList = words.slice(0).sort(function (a, b) {
				return a.length < b.length ? 1 : 0;
			});

			// initialize the options
			const options = {
				height: opts.height || wordList[0].length,
				width: opts.width || wordList[0].length,
				orientations: opts.orientations || allOrientations,
				fillBlanks:
					opts.fillBlanks !== undefined ? opts.fillBlanks : true,
				maxAttempts: opts.maxAttempts || 3,
				preferOverlap:
					opts.preferOverlap !== undefined
						? opts.preferOverlap
						: true,
			};

			// add the words to the puzzle
			// since puzzles are random, attempt to create a valid one up to
			// maxAttempts and then increase the puzzle size and try again
			while (!puzzle) {
				while (!puzzle && attempts++ < options.maxAttempts) {
					puzzle = fillPuzzle(wordList, options);
				}

				if (!puzzle) {
					options.height++;
					options.width++;
					attempts = 0;
				}
			}

			// fill in empty spaces with random letters
			if (options.fillBlanks) {
				this.fillBlanks(puzzle);
			}

			return puzzle;
		},

		fillBlanks: function (puzzle: string[][]) {
			for (let i = 0, height = puzzle.length; i < height; i++) {
				const row = puzzle[i];
				for (let j = 0, width = row.length; j < width; j++) {
					if (!puzzle[i][j]) {
						const randomLetter = Math.floor(
							Math.random() * letters.length
						);
						puzzle[i][j] = letters[randomLetter];
					}
				}
			}
		},

		solve: function (puzzle: string[][], words: string[]) {
			const options = {
					height: puzzle.length,
					width: puzzle[0].length,
					orientations: allOrientations,
					preferOverlap: true,
				},
				found = [],
				notFound = [];

			for (let i = 0, len = words.length; i < len; i++) {
				const word = words[i],
					locations = findBestLocations(puzzle, options, word);

				if (
					locations.length > 0 &&
					locations[0].overlap === word.length
				) {
					locations[0].word = word;
					found.push(locations[0]);
				} else {
					notFound.push(word);
				}
			}

			return { found: found, notFound: notFound };
		},

		print: function (puzzle: string[][]) {
			let puzzleString = "";
			for (let i = 0, height = puzzle.length; i < height; i++) {
				const row = puzzle[i];
				for (const j = 0, width = row.length; j < width; j++) {
					puzzleString += (row[j] === "" ? " " : row[j]) + " ";
				}
				puzzleString += "\n";
			}

			console.log(puzzleString);
			return puzzleString;
		},
	};
};
