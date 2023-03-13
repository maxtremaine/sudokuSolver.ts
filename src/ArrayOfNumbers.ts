export class ArrayOfNumbers {
  readonly numbers: number[];

  constructor(numbers: number[]) {
    this.numbers = numbers;
  }

  static from(numbers: number[]): ArrayOfNumbers {
    return new ArrayOfNumbers(numbers);
  }

  static fromSudokuFile(fileString: string): [string, ArrayOfNumbers] {
    // Check length.
    if (fileString.length !== 167) {
      return [
        `Expected fileString to have .length 167, found ${fileString.length}.`,
        ArrayOfNumbers.from([]),
      ];
    }

    // Check characters.
    for (const character of fileString) {
      if (!sudokuFileValues.includes(character)) {
        return [
          `A .sudoku file cannot contain ${character}.`,
          ArrayOfNumbers.from([]),
        ];
      }
    }

    return [
      "",
      ArrayOfNumbers.from(
        // Use conversion indexes to find values.
        fileToStringConversionIndexes.map((x) => fileString[x])
          // Swap underscores for zeros.sd
          .map((x) => {
            if (x === "_") {
              return 0;
            } else {
              return Number(x);
            }
          }),
      ),
    ];
  }

  map(fn: (x: number) => number): ArrayOfNumbers {
    return ArrayOfNumbers.from(this.numbers.map(fn));
  }

  filter(fn: (x: number) => boolean): ArrayOfNumbers {
    return ArrayOfNumbers.from(this.numbers.filter(fn));
  }

  sort(): ArrayOfNumbers {
    const newArray = this.numbers;
    newArray.sort();
    return ArrayOfNumbers.from(newArray);
  }

  getMissingDigits(): ArrayOfNumbers {
    return new ArrayOfNumbers(
      [...Array(10).keys()].slice(1) // Range from 1 to 9, inclusive.
        .filter((x) => !this.numbers.includes(x)),
    );
  }

  hasDuplicates(): boolean {
    return !this.numbers.every((x, i, arr) => arr.lastIndexOf(x) === i); // Not all unique.
  }

  replace(i: number, newValue: number): ArrayOfNumbers {
    return ArrayOfNumbers.from(
      this.numbers.slice(0, i)
        .concat([newValue])
        .concat(this.numbers.slice(i + 1)),
    );
  }

  uniqueValues(): ArrayOfNumbers {
    const acc: number[] = [];
    for (const x of this.numbers) {
      if (!acc.includes(x)) acc.push(x);
    }
    return ArrayOfNumbers.from(acc);
  }

  isValidSudoku(): [boolean, string] {
    if (this.numbers.length !== 81) {
      return [false, `Expected length of 81, got ${this.numbers.length}.`];
    }

    for (let i = 0; i < this.numbers.length; i++) {
      if (this.numbers[i] < 0 || this.numbers[i] > 9) {
        return [
          false,
          `Cells must be between 0 and 9, got ${this.numbers[i]} at ${i}.`,
        ];
      }
    }

    for (const group of groups) {
      if (
        ArrayOfNumbers.from(group)
          .map((x) => this.numbers[x])
          .filter((x) => x !== 0)
          .hasDuplicates()
      ) {
        return [false, "Not a valid puzzle."];
      }
    }

    return [true, ""];
  }

  getRelatedCells(index: number) {
    return ArrayOfNumbers.from(
      groups.filter((group) => group.includes(index))
        .flat(),
    )
      .uniqueValues()
      .map((i) => this.numbers[i])
      .filter((x) => x !== 0)
      .uniqueValues()
      .sort();
  }

  getBlankCells(): BlankCell[] {
    const acc: BlankCell[] = [];
    this.numbers.forEach((cell, index) => {
      if (cell === 0) {
        acc.push({
          index,
          possibleValues: ArrayOfNumbers.from(this.numbers)
            .getRelatedCells(index)
            .getMissingDigits(),
        });
      }
    });
    return acc.sort((x, y) =>
      x.possibleValues.numbers.length - y.possibleValues.numbers.length
    );
  }
}

type BlankCell = {
  index: number;
  possibleValues: ArrayOfNumbers;
};

const sudokuFileValues = [
  "_",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  " ",
  "\n",
  "|",
  "_",
  "-",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
];

const fileToStringConversionIndexes = [
  16,
  17,
  18,
  20,
  21,
  22,
  24,
  25,
  26,
  30,
  31,
  32,
  34,
  35,
  36,
  38,
  39,
  40,
  44,
  45,
  46,
  48,
  49,
  50,
  52,
  53,
  54,
  72,
  73,
  74,
  76,
  77,
  78,
  80,
  81,
  82,
  86,
  87,
  88,
  90,
  91,
  92,
  94,
  95,
  96,
  100,
  101,
  102,
  104,
  105,
  106,
  108,
  109,
  110,
  128,
  129,
  130,
  132,
  133,
  134,
  136,
  137,
  138,
  142,
  143,
  144,
  146,
  147,
  148,
  150,
  151,
  152,
  156,
  157,
  158,
  160,
  161,
  162,
  164,
  165,
  166,
];

const groups = [
  // Rows
  [0, 1, 2, 3, 4, 5, 6, 7, 8],
  [9, 10, 11, 12, 13, 14, 15, 16, 17],
  [18, 19, 20, 21, 22, 23, 24, 25, 26],
  [27, 28, 29, 30, 31, 32, 33, 34, 35],
  [36, 37, 38, 39, 40, 41, 42, 43, 44],
  [45, 46, 47, 48, 49, 50, 51, 52, 53],
  [54, 55, 56, 57, 58, 59, 60, 61, 62],
  [63, 64, 65, 66, 67, 68, 69, 70, 71],
  [72, 73, 74, 75, 76, 77, 78, 79, 80],
  // Columns
  [0, 9, 18, 27, 36, 45, 54, 63, 72],
  [1, 10, 19, 28, 37, 46, 55, 64, 73],
  [2, 11, 20, 29, 38, 47, 56, 65, 74],
  [3, 12, 21, 30, 39, 48, 57, 66, 75],
  [4, 13, 22, 31, 40, 49, 58, 67, 76],
  [5, 14, 23, 32, 41, 50, 59, 68, 77],
  [6, 15, 24, 33, 42, 51, 60, 69, 78],
  [7, 16, 25, 34, 43, 52, 61, 70, 79],
  [8, 17, 26, 35, 44, 53, 62, 71, 80],
  // Boxes
  [0, 1, 2, 9, 10, 11, 18, 19, 20],
  [3, 4, 5, 12, 13, 14, 21, 22, 23],
  [6, 7, 8, 15, 16, 17, 24, 25, 26],
  [27, 28, 29, 36, 37, 38, 45, 46, 47],
  [30, 31, 32, 39, 40, 41, 48, 49, 50],
  [33, 34, 35, 42, 43, 44, 51, 52, 53],
  [54, 55, 56, 63, 64, 65, 72, 73, 74],
  [57, 58, 59, 66, 67, 68, 75, 76, 77],
  [60, 61, 62, 69, 70, 71, 78, 79, 80],
];
