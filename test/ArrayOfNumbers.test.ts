import { assertEquals } from "https://deno.land/std@0.178.0/testing/asserts.ts";
import { ArrayOfNumbers } from "../src/ArrayOfNumbers.ts";

Deno.test(function getsMissingDigits() {
  assertEquals(
    ArrayOfNumbers.from([1, 2, 3]).getMissingDigits(),
    ArrayOfNumbers.from([4, 5, 6, 7, 8, 9]),
  );
});

Deno.test(function identifiesListWithDuplicates() {
  assertEquals(ArrayOfNumbers.from([1, 2, 2, 3]).hasDuplicates(), true);
});

Deno.test(function identifiesUniqueList() {
  assertEquals(ArrayOfNumbers.from([1, 2, 3]).hasDuplicates(), false);
});

Deno.test(function replacesValues() {
  assertEquals(
    ArrayOfNumbers.from([1, 2, 3]).replace(1, 3),
    ArrayOfNumbers.from([1, 3, 3]),
  );
});

Deno.test(function leavesOldListAlone() {
  const inputList = ArrayOfNumbers.from([1, 2, 3]);
  const newList = inputList.replace(1, 3);
  assertEquals(inputList, ArrayOfNumbers.from([1, 2, 3]));
});

Deno.test(function identifiesUniqueValues() {
  assertEquals(
    ArrayOfNumbers.from([1, 2, 2, 3, 3, 3, 4, 4]).uniqueValues(),
    ArrayOfNumbers.from([1, 2, 3, 4]),
  );
});
