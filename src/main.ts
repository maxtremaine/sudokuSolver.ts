import "./Array.ts" // New methods on Array<number>

export function add(a: number, b: number): number {
  return a + b;
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  console.log([1, 2, 3].getMissingDigits())
}
