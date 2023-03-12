import { assertEquals } from "https://deno.land/std@0.178.0/testing/asserts.ts";
import * as Numbers from "../src/Numbers.ts";

Deno.test(function getsMissingDigits() {
  assertEquals(Numbers.getMissingDigits([1, 2, 3]), [4, 5, 6, 7, 8, 9]);
});

Deno.test(function identifiesListWithDuplicates() {
  assertEquals(Numbers.hasDuplicates([1, 2, 2, 3]), true);
});

Deno.test(function identifiesUniqueList() {
  assertEquals(Numbers.hasDuplicates([1, 2, 3]), false);
});

Deno.test(function replacesValues() {
  assertEquals(Numbers.replace([1, 2, 3], 1, 3), [1, 3, 3]);
});

Deno.test(function leavesOldListAlone() {
  const inputList = [1, 2, 3];
  const newList = Numbers.replace(inputList, 1, 3);
  assertEquals(inputList, [1, 2, 3]);
});

Deno.test(function identifiesUniqueValues() {
  assertEquals(Numbers.uniqueValues([1, 2, 2, 3, 3, 3, 4, 4]), [1, 2, 3, 4]);
});
