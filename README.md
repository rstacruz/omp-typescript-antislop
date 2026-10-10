# omp-typescript-antislop

Opinionated TypeScript rules for [omp](https://github.com/can1357/oh-my-pi), all ported from
[dmmulroy/anti-slop](https://github.com/dmmulroy/anti-slop).

Like the original, it's meant to be vendored, not adopted wholesale: take the rules you want, read
them, and change them to match your taste.

## Install

Copy the rules you want into `~/.omp/agent/rules/` (or `$PI_CODING_AGENT_DIR/rules`):

```sh
cp plugins/typescript-antislop/rules/ts-no-module-mocking.md ~/.omp/agent/rules/
```

`./install.sh` copies all of them at once:

```sh
./install.sh
```

Or install it as a plugin for versioned upgrades:

```sh
omp plugin marketplace add rstacruz/omp-typescript-antislop
omp plugin install typescript-antislop@omp-typescript-antislop
```

## Test

```sh
node test.mjs  # each rule must fire on its fixtures, and stay silent on `negative*` ones
```

## Rules

Six rules interrupt the tool call before it runs. The rest are advisory (`interruptMode: never`) and
arrive as a reminder after the result.

[`ts-no-array-filter-map`](./plugins/typescript-antislop/rules/ts-no-array-filter-map.md) &mdash; rejects eager filter() and map() chains

```ts
const emails = users.filter((user) => user.active).map((user) => user.email);
```

[`ts-no-chained-type-assertions`](./plugins/typescript-antislop/rules/ts-no-chained-type-assertions.md) &mdash; rejects chained type assertions that fabricate evidence

```ts
const user = input as object as User;
```

[`ts-no-conditional-empty-object-spread`](./plugins/typescript-antislop/rules/ts-no-conditional-empty-object-spread.md) &mdash; rejects conditional empty-object spreads that omit fields

```ts
const options = { ...(timeout !== undefined ? { timeout } : {}) };
```

[`ts-no-module-mocking`](./plugins/typescript-antislop/rules/ts-no-module-mocking.md) &mdash; rejects vi.mock and jest.mock module mocking

```ts
vi.mock("./user-store");
```

[`ts-no-object-parameters`](./plugins/typescript-antislop/rules/ts-no-object-parameters.md) &mdash; rejects object-typed parameters that hide their shape

```ts
function save(value: object) {}
```

[`ts-no-reduce-accumulator-copy`](./plugins/typescript-antislop/rules/ts-no-reduce-accumulator-copy.md) &mdash; rejects copying the accumulator inside reducers

```ts
items.reduce((acc, item) => Object.assign({}, acc, { [item.id]: item }), {});
```

[`ts-no-reflect-apply`](./plugins/typescript-antislop/rules/ts-no-reflect-apply.md) &mdash; rejects Reflect.apply calls that erase types

```ts
const value = Reflect.apply(operation, owner, args);
```

[`ts-no-reflect-get`](./plugins/typescript-antislop/rules/ts-no-reflect-get.md) &mdash; rejects Reflect.get calls that erase types

```ts
const value = Reflect.get(owner, key);
```

[`ts-no-runtime-typeof`](./plugins/typescript-antislop/rules/ts-no-runtime-typeof.md) &mdash; requires boundary parsing instead of typeof narrowing

```ts
if (typeof input === "string") useName(input);
```

[`ts-no-shape-in-symbol-names`](./plugins/typescript-antislop/rules/ts-no-shape-in-symbol-names.md) &mdash; rejects shape in locally owned symbol names

```ts
interface UserShape { id: string }
```

[`ts-no-unsafe-dictionary-type`](./plugins/typescript-antislop/rules/ts-no-unsafe-dictionary-type.md) &mdash; rejects unknown, any, and object-valued dictionaries

```ts
type Metadata = Record<string, unknown>;
```

[`ts-no-unknown-parameters`](./plugins/typescript-antislop/rules/ts-no-unknown-parameters.md) &mdash; rejects unknown in function parameter types

```ts
function handle(input: unknown) {}
```

[`ts-no-unknown-returns`](./plugins/typescript-antislop/rules/ts-no-unknown-returns.md) &mdash; rejects explicit unknown return type contracts

```ts
function loadUser(): unknown {}
```

[`ts-no-unknown-type-aliases`](./plugins/typescript-antislop/rules/ts-no-unknown-type-aliases.md) &mdash; rejects type aliases that resolve to unknown

```ts
type ExternalValue = unknown;
```
