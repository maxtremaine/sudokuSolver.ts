export class ArrayOfNumbers {
  private readonly numbers: number[];

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
          // Swap underscores for zeros.
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
}

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
