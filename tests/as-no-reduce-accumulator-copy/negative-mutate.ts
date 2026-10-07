export const collected = [1, 2].reduce((acc, value) => {
  acc.push(value);
  return acc;
}, [] as number[]);
