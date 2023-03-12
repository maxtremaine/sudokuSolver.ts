import { ArrayOfNumbers } from "./src/ArrayOfNumbers.ts";

const startFile = await Deno.readTextFile("./io/start.sudoku");

console.log(startFile);
