Goal: Make one small, behavior-preserving calculator refactoring per iteration

## Completed stages
- **scope**: succeeded
  - Script: `test -e src/index.ts && printf 'Target: %s\n' src/index.ts`
  - Output:
    ```
    Target: src/index.ts
    ```
- **baseline**: succeeded
  - Script: `npm run quality 2>&1 || true`
  - Output:
    ```
    > spoken-expression-calculator-kata@0.1.0 quality
    > node scripts/quality.mjs
    
    
    ── eslint: complexity, size, and duplicated branches ──
    eslint is not installed. Run npm install.
    
    ── knip: unused files, exports, and dependencies ──
    knip is not installed. Run npm install.
    
    Findings reported by: eslint, knip.
    ```
- **refactor**: succeeded
  - Model: claude-sonnet-5
  - Files: /workspace/calculator/src/index.ts
- **evidence**: succeeded
  - Script: `{ printf '%s\n' '=== QUALITY BEFORE ==='; npm run quality 2>&1 || true; printf '%s\n' '=== TESTS ==='; npm test 2>&1 || true; printf '%s\n' '=== WORKING DIFF ==='; git diff -- .; }`
  - Output:
    ```
    === QUALITY BEFORE ===
    
    > spoken-expression-calculator-kata@0.1.0 quality
    > node scripts/quality.mjs
    
    
    ── eslint: complexity, size, and duplicated branches ──
    eslint is not installed. Run npm install.
    
    ── knip: unused files, exports, and dependencies ──
    knip is not installed. Run npm install.
    
    Findings reported by: eslint, knip.
    === TESTS ===
    
    > spoken-expression-calculator-kata@0.1.0 test
    > npm run build && vitest run
    
    
    > spoken-expression-calculator-kata@0.1.0 build
    > tsc -p tsconfig.json
    
    sh: 1: tsc: not found
    === WORKING DIFF ===
    ```
- **validate**: succeeded
  - Model: claude-sonnet-5
- **verdict**: succeeded

## Context
- verdict: FAIL


You are a repair assistant.

Read the validator findings and the success criteria below. Make the smallest change in `src/index.ts` that addresses the findings. Do not start a new refactoring, edit outside that target, or look for unrelated problems.

Edit files directly.

Constraints:

- Do not run tests, npm, shell commands, or external tools.
- Do not report quality metrics or test results.
- Keep the response concise.

# Success criteria for the calculator line

These criteria describe the destination the line is walking toward. A single iteration is one step on that path; it is not expected to reach the destination immediately.

## Passes its tests

The calculator behaves the same way after every change.

Evidence: `npm test` exits 0 and reports all tests passing.

## Reveals intention

Names of functions, variables, and modules tell the reader what the code does without needing comments to explain them.

Evidence: reading the main source files aloud, the names describe the operations in plain language.

## No duplication

No two blocks of code perform the same operation in different words.

Evidence: `npm run quality` reports no duplication, or inspection shows no near-identical passages.

## Fewest elements

There are no unused functions, dead code paths, or unnecessary abstractions.

Evidence: every exported function is exercised by the test suite, and no file contains code that `npm test` would still pass without.