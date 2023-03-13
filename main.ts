import { ArrayOfNumbers } from "./src/ArrayOfNumbers.ts";

const startFile = await Deno.readTextFile("./io/start.sudoku");

let [err, startSudoku] = ArrayOfNumbers.fromSudokuFile(startFile);

if (err) throw err;

let workingPuzzles = [startSudoku];

console.log(workingPuzzles[0].getRelatedCells(1));
