declare const verbose: boolean;

export const options = { color: "red", ...(verbose ? { verbose } : {}), quiet: false };
