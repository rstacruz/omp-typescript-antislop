type User = { active: boolean; email: string };

const users: User[] = [];

export const emails = users.filter((user) => user.active).map((user) => user.email);
