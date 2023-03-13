import { ArrayOfNumbers } from "./src/ArrayOfNumbers.ts";

const t0 = Date.now();

const startFile = await Deno.readTextFile("./io/start.sudoku");

let [err, startSudoku] = ArrayOfNumbers.fromSudokuFile(startFile);

err = startSudoku.isValidSudoku()[1];

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

await Deno.writeTextFile("./io/finish.sudoku", workingPuzzles[0].toSudokuFile());

console.log(`Ran successfully in ${Date.now() - t0} miliseconds.\nThe solution is in ./io/finish.sudoku.`);
