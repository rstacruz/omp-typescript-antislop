---
description: Reject accumulator copies inside reduce
interruptMode: never
astCondition:
  - '$X.reduce(($A, $B) => Object.assign({}, $A, $$$REST), $$$INIT)'
  - '$X.reduce(($A, $B) => Array.from($A), $$$INIT)'
  - '$X.reduce(($A, $B) => $A.concat($$$REST), $$$INIT)'
  - '$X.reduce(($A, $B) => $A.slice(), $$$INIT)'
  - '$X.reduce(($A, $B) => $A.toSorted($$$REST), $$$INIT)'
  - '$X.reduce(($A, $B) => $A.toReversed(), $$$INIT)'
  - '$X.reduce(($A, $B) => $A.toSpliced($$$REST), $$$INIT)'
  - '$X.reduce(($A, $B) => $A.with($$$REST), $$$INIT)'
  - '$X.reduceRight(($A, $B) => Object.assign({}, $A, $$$REST), $$$INIT)'
  - '$X.reduceRight(($A, $B) => Array.from($A), $$$INIT)'
  - '$X.reduceRight(($A, $B) => $A.concat($$$REST), $$$INIT)'
  - '$X.reduceRight(($A, $B) => $A.slice(), $$$INIT)'
  - '$X.reduceRight(($A, $B) => $A.toSorted($$$REST), $$$INIT)'
  - '$X.reduceRight(($A, $B) => $A.toReversed(), $$$INIT)'
  - '$X.reduceRight(($A, $B) => $A.toSpliced($$$REST), $$$INIT)'
  - '$X.reduceRight(($A, $B) => $A.with($$$REST), $$$INIT)'
scope: 'tool:edit(*.{ts,tsx,mts,cts}), tool:write(*.{ts,tsx,mts,cts})'
---

Do not copy the accumulator inside a reducer (`Object.assign({}, acc, ...)`,
`Array.from(acc)`, `acc.concat(...)`, `acc.slice()`, `acc.toSorted()`): that is
quadratic. Mutate a locally owned accumulator (`acc.push(item); return acc`), or build
with a `Map`/`Set`. `Object.assign(acc, item)` (mutating the accumulator) is fine.
