# sudokuSolver.ts
Solves Sudoku puzzles so I don't have to, in TypeScript.

## Reason and Philosophy
I haven't been able to keep up with coding as much as I would have, but I do spend an unnecessary amount of time doing sudoku puzzles, so I thought, "Hey, I should combine the two." I have tried to make the program easy to interact with, and be highly efficient without becoming bloated with different systems/tactics for solving puzzles. I hope that at least the .sudoku file type and interpreter functions are useful to other people who want to play with sudoku as a platform; you can find those functions in _src/Sudoku.js_.

## How to Solve Puzzles

To run this program you are going to need [Deno](https://deno.land/).

```sh
brew install deno
```

First, open Terminal and clone this repository in a convenient directory.

```sh
cd Desktop
git clone https://github.com/maxtremaine/sudokuSolver.ts.git
```

Next, update the file in io/start.sudoku to reflect your puzzle to solve.

```
  abc def ghi
1 ___|___|___
2 _3_|1_6|2_7
3 6__|_3_|51_
  -----------
4 32_|__9|___
5 __8|__5|7__
6 ___|8__|_53
  -----------
7 _47|_9_|__8
8 8_1|7_2|_9_
9 ___|___|___
```

Alright, now you're ready to solve. Go back to the Terminal.

```sh
deno task start
```

Your solved puzzle will be in io/finish.sudoku.