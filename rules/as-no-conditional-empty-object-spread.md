---
description: Reject conditional empty-object spreads
interruptMode: never
condition:
  - '\.\.\.\s*\(?[^()]*\?[^:()]*:\s*\{\s*\}\s*\)'
  - '\.\.\.\s*\(?[^()]*\?\s*\{\s*\}\s*:'
astCondition:
  - '{ ...($C ? $A : {}) }'
  - '{ ...($C ? {} : $A) }'
  - '{ ...($C ? $A : {}), $$$POST }'
  - '{ ...($C ? {} : $A), $$$POST }'
scope: 'tool:edit(*.{ts,tsx,mts,cts}), tool:write(*.{ts,tsx,mts,cts})'
---

Do not spread a conditional empty object (`...(x ? { a } : {})`) to omit fields —
omitting a key is not the same as setting it to `undefined`. Spread a boolean instead
(`...(x !== undefined && { x })`), or build the object explicitly.
