---
description: Reject ad hoc typeof narrowing
interruptMode: never
condition:
  - '\btypeof\s+[\w$.]+\s*(?:===|!==|==|!=)\s*["''](?:string|number|boolean|object|function|symbol|bigint)["'']'
scope: 'tool:edit(*.{ts,tsx,mts,cts}), tool:write(*.{ts,tsx,mts,cts})'
---

Do not narrow a value with `typeof x === "string"` and friends. Parse the value at the
boundary and use the parsed type. Existence probes (`typeof x === "undefined"`) and
`typeof` inside a `value is T` predicate are fine.
