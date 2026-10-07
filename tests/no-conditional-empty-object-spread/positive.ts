declare const timeout: number | undefined;
declare const retries: number | undefined;

export const withTimeout = { ...(timeout !== undefined ? { timeout } : {}) };
export const withRetries = { ...(retries === undefined ? {} : { retries }) };
