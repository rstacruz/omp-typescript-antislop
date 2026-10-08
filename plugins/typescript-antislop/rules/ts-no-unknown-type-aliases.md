---
description: Reject type aliases that resolve to unknown
condition:
  - '\btype\s+[\w$]+(?:\s*<[^>]*>)?\s*=\s*\(?\s*unknown\b'
astCondition:
  - 'type $N = unknown'
  - 'type $N = $A | unknown'
  - 'type $N = unknown | $A'
scope: 'tool:edit(*.{ts,tsx,mts,cts}), tool:write(*.{ts,tsx,mts,cts})'
---

Do not alias `unknown` (`type ExternalValue = unknown`). Name the actual shape, or
parse the value into a concrete type at the boundary.
