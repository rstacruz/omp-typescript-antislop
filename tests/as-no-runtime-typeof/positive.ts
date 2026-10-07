export function use(input: unknown): string {
  if (typeof input === "string") {
    return input;
  }

  return "";
}
