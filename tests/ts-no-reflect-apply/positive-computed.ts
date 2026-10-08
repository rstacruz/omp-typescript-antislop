declare function fn(this: unknown, ...args: unknown[]): number;
declare const owner: unknown;
declare const args: unknown[];

export const value = Reflect["apply"](fn, owner, args);
