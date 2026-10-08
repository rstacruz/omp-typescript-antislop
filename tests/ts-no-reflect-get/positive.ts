declare const owner: { key?: string };

export const value = Reflect.get(owner, "key");
