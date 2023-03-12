import * as Numbers from "./src/Numbers.ts";

export function add(a: number, b: number): number {
  return a + b;
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  console.log(Numbers.getMissingDigits([1, 2, 3]));
}
