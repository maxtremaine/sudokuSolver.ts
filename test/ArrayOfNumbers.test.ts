import { assertEquals } from "https://deno.land/std@0.178.0/testing/asserts.ts";
import { ArrayOfNumbers, BlankCell } from "../src/ArrayOfNumbers.ts";

Deno.test("Gets missing digits.", function () {
  assertEquals(
    ArrayOfNumbers.from([1, 2, 3]).getMissingDigits(),
    ArrayOfNumbers.from([4, 5, 6, 7, 8, 9]),
  );
});

Deno.test("Tests for duplicates.", async function (t) {
  await t.step("Has duplicates.", function () {
    assertEquals(ArrayOfNumbers.from([1, 2, 2, 3]).hasDuplicates(), true);
  });
  await t.step("All unique.", function () {
    assertEquals(ArrayOfNumbers.from([1, 2, 3]).hasDuplicates(), false);
  });
});

Deno.test("Replaces values.", async function (t) {
  const inputList = ArrayOfNumbers.from([1, 2, 3]);
  const duplicateList = ArrayOfNumbers.from([1, 2, 3]);
  const updatedList = ArrayOfNumbers.from([1, 3, 3]);

  const replacedList = inputList.replace(1, 3);

  await t.step("Creates a new list.", function () {
    assertEquals(replacedList, updatedList);
  });
  await t.step("Leaves the old list the same.", function () {
    assertEquals(inputList, duplicateList);
  });
});

Deno.test("Identifies unique values.", function () {
  assertEquals(
    ArrayOfNumbers.from([1, 2, 2, 3, 3, 3, 4, 4]).uniqueValues(),
    ArrayOfNumbers.from([1, 2, 3, 4]),
  );
});

Deno.test("Creates an array from a .sudoku file.", function () {
  assertEquals(
    ArrayOfNumbers.fromSudokuFile(validFile)[1],
    ArrayOfNumbers.from(sudokuValues),
  );
});

Deno.test("Validates sudoku puzzles.", async function (t) {
  await t.step("Finds valid puzzles.", function () {
    assertEquals(ArrayOfNumbers.from(sudokuValues).isValidSudoku(), [true, ""]);
  });
  await t.step("Finds mis-sized puzzles.", function () {
    assertEquals(ArrayOfNumbers.from(longPuzzle).isValidSudoku()[0], false);
  });
  await t.step("Finds bad values.", function () {
    assertEquals(ArrayOfNumbers.from(badValue).isValidSudoku()[0], false);
  });
  await t.step("Finds bad puzzles.", function () {
    assertEquals(ArrayOfNumbers.from(invalidPuzzle).isValidSudoku()[0], false);
  });
});

Deno.test("Gets related cells.", function () {
  const relatedToOne = ArrayOfNumbers.from([1, 4, 6, 7]);
  assertEquals(
    ArrayOfNumbers.fromSudokuFile(validFile)[1].getRelatedCells(1),
    relatedToOne,
  );
});

Deno.test("Gets blank cells.", function () {
  const blankCell: BlankCell[] = [{
    index: 1,
    possibleValues: ArrayOfNumbers.from([1]),
  }];
  assertEquals(
    ArrayOfNumbers.fromSudokuFile(missingOne)[1].getBlankCells(),
    blankCell,
  );
});

Deno.test("Spits out a .sudoku file.", function() {
  assertEquals(ArrayOfNumbers.from(sudokuValues).toSudokuFile(), validFile);
})

const validFile = [
  "  abc def ghi",
  "1 7__|_4_|__1",
  "2 __1|___|2__",
  "3 _6_|2_9|_8_",
  "  -----------",
  "4 __3|5_4|9__",
  "5 1__|___|__4",
  "6 __2|1_8|5__",
  "  -----------",
  "7 _1_|9_6|_7_",
  "8 __8|___|4__",
  "9 6__|_2_|__8",
].join("\n");

const missingOne = [
  "  abc def ghi",
  "1 7_2|954|836",
  "2 539|186|247",
  "3 684|237|519",
  "  -----------",
  "4 325|479|681",
  "5 198|365|724",
  "6 476|821|953",
  "  -----------",
  "7 247|593|168",
  "8 861|742|395",
  "9 953|618|472",
].join("\n");

const sudokuValues = [
  7,
  0,
  0,
  0,
  4,
  0,
  0,
  0,
  1,
  0,
  0,
  1,
  0,
  0,
  0,
  2,
  0,
  0,
  0,
  6,
  0,
  2,
  0,
  9,
  0,
  8,
  0,
  0,
  0,
  3,
  5,
  0,
  4,
  9,
  0,
  0,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  4,
  0,
  0,
  2,
  1,
  0,
  8,
  5,
  0,
  0,
  0,
  1,
  0,
  9,
  0,
  6,
  0,
  7,
  0,
  0,
  0,
  8,
  0,
  0,
  0,
  4,
  0,
  0,
  6,
  0,
  0,
  0,
  2,
  0,
  0,
  0,
  8,
];

const invalidPuzzle = [
  7,
  7,
  0,
  0,
  4,
  0,
  0,
  0,
  1,
  0,
  0,
  1,
  0,
  0,
  0,
  2,
  0,
  0,
  0,
  6,
  0,
  2,
  0,
  9,
  0,
  8,
  0,
  0,
  0,
  3,
  5,
  0,
  4,
  9,
  0,
  0,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  4,
  0,
  0,
  2,
  1,
  0,
  8,
  5,
  0,
  0,
  0,
  1,
  0,
  9,
  0,
  6,
  0,
  7,
  0,
  0,
  0,
  8,
  0,
  0,
  0,
  4,
  0,
  0,
  6,
  0,
  0,
  0,
  2,
  0,
  0,
  0,
  8,
];

const longPuzzle = [
  9,
  7,
  0,
  0,
  0,
  4,
  0,
  0,
  0,
  1,
  0,
  0,
  1,
  0,
  0,
  0,
  2,
  0,
  0,
  0,
  6,
  0,
  2,
  0,
  9,
  0,
  8,
  0,
  0,
  0,
  3,
  5,
  0,
  4,
  9,
  0,
  0,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  4,
  0,
  0,
  2,
  1,
  0,
  8,
  5,
  0,
  0,
  0,
  1,
  0,
  9,
  0,
  6,
  0,
  7,
  0,
  0,
  0,
  8,
  0,
  0,
  0,
  4,
  0,
  0,
  6,
  0,
  0,
  0,
  2,
  0,
  0,
  0,
  8,
];

const badValue = [
  -7,
  0,
  0,
  0,
  4,
  0,
  0,
  0,
  1,
  0,
  0,
  1,
  0,
  0,
  0,
  2,
  0,
  0,
  0,
  6,
  0,
  2,
  0,
  9,
  0,
  8,
  0,
  0,
  0,
  3,
  5,
  0,
  4,
  9,
  0,
  0,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  4,
  0,
  0,
  2,
  1,
  0,
  8,
  5,
  0,
  0,
  0,
  1,
  0,
  9,
  0,
  6,
  0,
  7,
  0,
  0,
  0,
  8,
  0,
  0,
  0,
  4,
  0,
  0,
  6,
  0,
  0,
  0,
  2,
  0,
  0,
  0,
  8,
];
