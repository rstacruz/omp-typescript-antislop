---
description: Reject object-typed parameters
interruptMode: never
condition:
  - '\(\s*[\w$]+\s*:\s*\(?\s*object\b'
astCondition:
  - 'function $F($P: object) { $$$B }'
  - 'function $F($P: object | $R) { $$$B }'
  - '($P: object) => $B'
scope: 'tool:edit(*.{ts,tsx,mts,cts}), tool:write(*.{ts,tsx,mts,cts})'
---

Do not accept `object` as a parameter type — it gives callers no contract. Name the
shape the function needs, or accept a schema-parsed type.
