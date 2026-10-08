---
description: Reject Reflect.get
astCondition:
  - 'Reflect.get($$$A)'
condition:
  - 'Reflect\s*\[\s*["'']get["'']\s*\]\s*\('
scope: 'tool:edit(*.{ts,tsx,mts,cts}), tool:write(*.{ts,tsx,mts,cts})'
---

Do not call `Reflect.get(...)`. Read the property directly (`obj.key`) or parse the
value at the boundary; `Reflect.get` erases the property type.
