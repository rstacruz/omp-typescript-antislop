declare const useCache: boolean;

export const options = { ...(useCache ? { cache: true } : { cache: false }) };
