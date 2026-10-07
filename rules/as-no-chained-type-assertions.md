---
description: Reject chained TypeScript assertions
astCondition:
  - '$X as $Y as $Z'
  - '($X as $A) as $B'
scope: 'tool:edit(*.{ts,tsx,mts,cts}), tool:write(*.{ts,tsx,mts,cts})'
---

Never chain TypeScript assertions (`x as A as B`): each hop fabricates evidence the
compiler never verified. Assert once from a value you parsed or narrowed, or parse at
the boundary and use the parsed type. `as const` on its own is fine.
