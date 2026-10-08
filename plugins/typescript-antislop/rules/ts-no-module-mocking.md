---
description: Reject vi.mock / jest.mock module mocking
astCondition:
  - 'vi.mock($$$A)'
  - 'vi.doMock($$$A)'
  - 'vi.unstable_mockModule($$$A)'
  - 'jest.mock($$$A)'
  - 'jest.doMock($$$A)'
  - 'jest.unstable_mockModule($$$A)'
condition:
  - '\b(?:vi|jest)\s*\[\s*["''](?:mock|doMock|unstable_mockModule)["'']\s*\]\s*\('
scope: 'tool:edit(*.{ts,tsx,mts,cts}), tool:write(*.{ts,tsx,mts,cts})'
---

Do not mock modules (`vi.mock`, `vi.doMock`, `vi.unstable_mockModule`, `jest.mock`).
Create a real seam instead: accept the collaborator as a parameter, pass a
hand-written fake, or exercise the real implementation.
