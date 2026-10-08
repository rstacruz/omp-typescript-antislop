---
description: Reject eager filter().map() pipelines
interruptMode: never
astCondition:
  - '$X.filter($$$A).map($$$B)'
  - '$X.map($$$A).filter($$$B)'
scope: 'tool:edit(*.{ts,tsx,mts,cts}), tool:write(*.{ts,tsx,mts,cts})'
---

Do not chain eager `.filter(...).map(...)` (or `.map(...).filter(...)`). Use one
`.flatMap(...)`, a lazy iterator pipeline (`.values().filter(...).map(...).toArray()`),
or one reducer that pushes into a fresh local array. Ignore this when the receiver is
not an array (iterator helpers, custom collections).
