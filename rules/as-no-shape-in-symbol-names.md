---
description: Reject "shape" in symbol names
interruptMode: never
condition:
  # declaration positions only, so the word "shape" in prose/comments is ignored
  - '(?i)(?<!\.)(?:\b(?:interface|type|class|enum|const|let|var|function|declare)\s+[\w$]*shape[\w$]*|\b[\w$]*shape[\w$]*\s*[?:=](?!=))'
scope: 'tool:edit(*.{ts,tsx,mts,cts}), tool:write(*.{ts,tsx,mts,cts})'
---

Never name a local symbol `...Shape...` (types, interfaces, variables, functions) —
name it for what it is (`User`, `UserParams`, `userSchema`). Member reads such as
`schema.shape` are fine.
