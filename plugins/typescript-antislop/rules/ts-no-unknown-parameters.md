---
description: Reject unknown parameter types
interruptMode: never
condition:
  - '\(\s*(?!cause\b)[\w$]+\s*:\s*\(?\s*unknown\b'
  - '\(\s*(?!cause\b)[\w$]+\s*:\s*\(?\s*unknown\s*\|'
astCondition:
  - 'function $F($P: unknown) { $$$B }'
  - 'function $F($P: unknown | $R) { $$$B }'
  - '($P: unknown) => $B'
scope: 'tool:edit(*.{ts,tsx,mts,cts}), tool:write(*.{ts,tsx,mts,cts})'
---

Do not declare `unknown` parameters. Parse the argument at the boundary and type the
parameter with the parsed shape. Ignore this reminder when the parameter is `cause`
or the subject of a `value is T` predicate — both are allowed.
