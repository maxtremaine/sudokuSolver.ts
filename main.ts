import { ArrayOfNumbers } from "./src/ArrayOfNumbers.ts";

const startFile = await Deno.readTextFile("./io/start.sudoku");

const [err, startSudoku] = ArrayOfNumbers.fromSudokuFile("sudokuFile");

console.log(err, startSudoku);
