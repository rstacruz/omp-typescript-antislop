declare const store: { mock: (path: string) => void };

export const result = store.mock("./user-store");
