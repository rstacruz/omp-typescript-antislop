export function describe(input: unknown): string {
  if (typeof input === "undefined") {
    return "missing";
  }

  return String(input);
}
