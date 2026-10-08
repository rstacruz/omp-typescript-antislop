export function fail(message: string, cause: unknown): never {
  throw new Error(message, { cause });
}
