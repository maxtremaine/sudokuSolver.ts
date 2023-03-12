export class ArrayOfNumbers {
  private readonly numbers: number[];

  constructor(numbers: number[]) {
    this.numbers = numbers;
  }

  static from(numbers: number[]): ArrayOfNumbers {
    return new ArrayOfNumbers(numbers);
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
