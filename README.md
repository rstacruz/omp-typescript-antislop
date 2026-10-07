# omp-typescript-antislop

Opinionated TypeScript rules for [omp](https://github.com/can1357/oh-my-pi), ported from
[dmmulroy/anti-slop](https://github.com/dmmulroy/anti-slop) — the primary source for every rule here.

## Install

```sh
./install.sh   # copies rules/ into ~/.omp/agent/rules (or $PI_CODING_AGENT_DIR/rules)
```

## Test

```sh
node test.mjs  # each rule must fire on its fixtures, and stay silent on `negative*` ones
```

## Rules

Each file in `rules/` maps 1:1 to an upstream anti-slop rule. Six interrupt the tool call before it
runs; the rest are advisory (`interruptMode: never`) and arrive as a reminder after the result.

| Rule | Upstream |
| --- | --- |
| `as-no-array-filter-map` | `no-array-filter-map` |
| `as-no-chained-type-assertions` | `no-chained-type-assertions` |
| `as-no-conditional-empty-object-spread` | `no-conditional-empty-object-spread` |
| `as-no-module-mocking` | `no-module-mocking` |
| `as-no-object-parameters` | `no-object-parameters` |
| `as-no-reduce-accumulator-copy` | `no-reduce-accumulator-copy` |
| `as-no-reflect-apply` | `no-reflect-apply` |
| `as-no-reflect-get` | `no-reflect-get` |
| `as-no-runtime-typeof` | `no-runtime-typeof` |
| `as-no-shape-in-symbol-names` | `no-shape-in-symbol-names` |
| `as-no-unsafe-dictionary-type` | `no-unsafe-dictionary-type` |
| `as-no-unknown-parameters` | `no-unknown-parameters` |
| `as-no-unknown-returns` | `no-unknown-returns` |
| `as-no-unknown-type-aliases` | `no-unknown-type-aliases` |
