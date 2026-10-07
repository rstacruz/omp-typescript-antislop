# omp-typescript-antislop

Opinionated TypeScript rules for [omp](https://github.com/can1357/oh-my-pi), ported from
[dmmulroy/anti-slop](https://github.com/dmmulroy/anti-slop) — the primary source for every rule here.

## Install

As an omp plugin:

```sh
omp plugin marketplace add rstacruz/omp-typescript-antislop
omp plugin install typescript-antislop@omp-typescript-antislop
```

Or copy the rules straight into your rules directory:

```sh
./install.sh   # copies plugins/typescript-antislop/rules/ into ~/.omp/agent/rules
```

## Test

```sh
node test.mjs  # each rule must fire on its fixtures, and stay silent on `negative*` ones
```

## Rules

Each rule ports the upstream anti-slop rule of the same name. Six interrupt the tool call before it
runs; the rest are advisory (`interruptMode: never`) and arrive as a reminder after the result.

- [no-array-filter-map](./plugins/typescript-antislop/rules/no-array-filter-map.md)
- [no-chained-type-assertions](./plugins/typescript-antislop/rules/no-chained-type-assertions.md)
- [no-conditional-empty-object-spread](./plugins/typescript-antislop/rules/no-conditional-empty-object-spread.md)
- [no-module-mocking](./plugins/typescript-antislop/rules/no-module-mocking.md)
- [no-object-parameters](./plugins/typescript-antislop/rules/no-object-parameters.md)
- [no-reduce-accumulator-copy](./plugins/typescript-antislop/rules/no-reduce-accumulator-copy.md)
- [no-reflect-apply](./plugins/typescript-antislop/rules/no-reflect-apply.md)
- [no-reflect-get](./plugins/typescript-antislop/rules/no-reflect-get.md)
- [no-runtime-typeof](./plugins/typescript-antislop/rules/no-runtime-typeof.md)
- [no-shape-in-symbol-names](./plugins/typescript-antislop/rules/no-shape-in-symbol-names.md)
- [no-unsafe-dictionary-type](./plugins/typescript-antislop/rules/no-unsafe-dictionary-type.md)
- [no-unknown-parameters](./plugins/typescript-antislop/rules/no-unknown-parameters.md)
- [no-unknown-returns](./plugins/typescript-antislop/rules/no-unknown-returns.md)
- [no-unknown-type-aliases](./plugins/typescript-antislop/rules/no-unknown-type-aliases.md)
