import { ArrayOfNumbers } from "./src/ArrayOfNumbers.ts";

const t0 = Date.now();

const startFile = await Deno.readTextFile("./io/start.sudoku");

let [err, startSudoku] = ArrayOfNumbers.fromSudokuFile(startFile);

if (err) throw err;

const numberOfBlanks = startSudoku.getBlankCells().length;
let workingPuzzles: ArrayOfNumbers[] = [startSudoku];

for (let i = 1; i <= numberOfBlanks; i++) {
  const newBranches: ArrayOfNumbers[] = [];

  for (const branch of workingPuzzles) {
    const easiestBlankCell = branch.getBlankCells()[0];

    for (const possibleValue of easiestBlankCell.possibleValues.numbers) {
      newBranches.push(
        ArrayOfNumbers.from(
          branch.replace(easiestBlankCell.index, possibleValue).numbers,
        ),
      );
    }
  }

  workingPuzzles = newBranches;

  console.log(`Completed run ${i} with ${newBranches.length} branches.`);
}

console.log(workingPuzzles);

console.log(`Ran successfully in ${Date.now() - t0} miliseconds.`);
