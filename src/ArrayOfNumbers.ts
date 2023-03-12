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

    return ["", ArrayOfNumbers.from([])];
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
