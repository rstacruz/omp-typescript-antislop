---
description: Reject unknown/any/object-valued dictionaries
condition:
  # Record<K, unsafe> unless it is a generic constraint (lookbehind: fixed width)
  - '(?<!extends[ \t])Record\s*<\s*(?:string|number|symbol|PropertyKey)\s*,\s*(?:unknown|any|object|\{\s*\})\s*>'
  # index signature with an unsafe value
  - '\[\s*[^\]\s]+\s*:\s*(?:string|number|symbol)\s*\]\s*:\s*(?:unknown|any|object|\{\s*\})'
scope: 'tool:edit(*.{ts,tsx,mts,cts}), tool:write(*.{ts,tsx,mts,cts})'
---

Do not type dictionaries with unsafe escape hatches (`Record<string, unknown>`,
`Record<K, any|object>`, `{ [key: string]: unknown }`). Type the value instead — a
concrete interface, a `Map<K, V>`, or a schema-parsed type. Generic constraints such
as `T extends Record<string, unknown>` are fine.
