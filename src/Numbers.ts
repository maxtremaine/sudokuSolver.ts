export function getMissingDigits(input: number[]): number[] {
  return [...Array(10).keys()].slice(1) // Range from 1 to 9, inclusive.
    .filter((x) => !input.includes(x));
}

export function hasDuplicates(input: number[]): boolean {
  return !input.every((x, i, arr) => arr.lastIndexOf(x) === i); // Not all unique.
}

export function replace(
  input: number[],
  i: number,
  newValue: number,
): number[] {
  return input.slice(0, i)
    .concat([newValue])
    .concat(input.slice(i + 1));
}

export function uniqueValues(input: number[]): number[] {
  const acc: number[] = [];
  for (const x of input) {
    if (!acc.includes(x)) acc.push(x);
  }
  return acc;
}
