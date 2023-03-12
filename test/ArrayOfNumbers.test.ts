import { assertEquals } from "https://deno.land/std@0.178.0/testing/asserts.ts";
import { ArrayOfNumbers } from "../src/ArrayOfNumbers.ts";

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

Deno.test("Gets missing digits.", function () {
  assertEquals(
    ArrayOfNumbers.from([1, 2, 3]).getMissingDigits(),
    ArrayOfNumbers.from([4, 5, 6, 7, 8, 9]),
  );
});

Deno.test("Tests for duplicates.", async function(t) {
  await t.step("Has duplicates.", function() {
    assertEquals(ArrayOfNumbers.from([1, 2, 2, 3]).hasDuplicates(), true);
  })
  await t.step("All unique.", function() {
    assertEquals(ArrayOfNumbers.from([1, 2, 3]).hasDuplicates(), false);
  })
});

Deno.test("Replaces values.", async function(t) {
  const inputList = ArrayOfNumbers.from([1, 2, 3]);
  const duplicateList = ArrayOfNumbers.from([1, 2, 3]);
  const updatedList = ArrayOfNumbers.from([1, 3, 3]);

  const replacedList = inputList.replace(1, 3);

  await t.step("Creates a new list.", function() {
    assertEquals(replacedList, updatedList);
  });
  await t.step("Leaves the old list the same.", function() {
    assertEquals(inputList, duplicateList);
  })
});

Deno.test("Identifies unique values.", function() {
  assertEquals(
    ArrayOfNumbers.from([1, 2, 2, 3, 3, 3, 4, 4]).uniqueValues(),
    ArrayOfNumbers.from([1, 2, 3, 4]),
  );
});
