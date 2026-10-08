---
description: Reject explicit unknown return types
interruptMode: never
condition:
  - '\)\s*:\s*(?:Promise(?:Like)?\s*<\s*unknown\s*>|unknown)\s*(?:=>|\{|;)'
astCondition:
  - 'function $F($$$P): unknown { $$$B }'
  - 'function $F($$$P): Promise<unknown> { $$$B }'
  - 'function $F($$$P): PromiseLike<unknown> { $$$B }'
  - '($P): unknown => $B'
scope: 'tool:edit(*.{ts,tsx,mts,cts}), tool:write(*.{ts,tsx,mts,cts})'
---

Do not return `unknown` (or `Promise<unknown>`) from an explicit signature. Parse the
value into a concrete type at the boundary and return that type.
