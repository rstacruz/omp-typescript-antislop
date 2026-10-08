---
description: Reject Reflect.apply
astCondition:
  - 'Reflect.apply($$$A)'
condition:
  - 'Reflect\s*\[\s*["'']apply["'']\s*\]\s*\('
scope: 'tool:edit(*.{ts,tsx,mts,cts}), tool:write(*.{ts,tsx,mts,cts})'
---

Do not call `Reflect.apply(...)`. Call the function directly with typed arguments, or
keep a typed signature; `Reflect.apply` erases the argument and return types.
