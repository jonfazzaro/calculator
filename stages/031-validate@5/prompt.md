Goal: Make one small, behavior-preserving calculator refactoring per iteration

## Completed stages
- **scope**: succeeded
  - Script: `test -e src/index.ts && printf 'Target: %s\n' src/index.ts`
  - Output:
    ```
    Target: src/index.ts
    ```
- **dependencies**: succeeded
  - Script: `npm install --package-lock=false`
  - Output:
    ```
    added 159 packages, and audited 160 packages in 50s
    
    56 packages are looking for funding
      run `npm fund` for details
    
    found 0 vulnerabilities
    npm warn install-scripts 1 package has install scripts not yet covered by allowScripts:
    npm warn install-scripts   esbuild@0.28.2 (postinstall: node install.js)
    npm warn install-scripts
    npm warn install-scripts Run `npm install-scripts ls` to review, or `npm install-scripts approve <pkg>` to allow.
    npm notice
    npm notice New major version of npm available! 11.19.0 -> 12.0.2
    npm notice Changelog: https://github.com/npm/cli/releases/tag/v12.0.2
    npm notice To update run: npm install -g npm@12.0.2
    npm notice
    ```
- **baseline**: succeeded
  - Script: `npm run quality 2>&1 | tee /tmp/fabro-refactor-quality-before.txt || true`
  - Output:
    ```
    > spoken-expression-calculator-kata@0.1.0 quality
    > node scripts/quality.mjs
    
    
    ── eslint: complexity, size, and duplicated branches ──
    
    /repos/jonfazzaro/calculator/src/index.ts
      56:8   error  Function 'evaluateSpokenExpression' has too many lines (27). Maximum allowed is 20  max-lines-per-function
      65:27  error  Refactor this function to reduce its Cognitive Complexity from 7 to the 5 allowed   sonarjs/cognitive-complexity
      65:27  error  Arrow function has too many statements (14). Maximum allowed is 12                  max-statements
      65:27  error  Arrow function has a complexity of 7. Maximum allowed is 5                          complexity
    
    ✖ 4 problems (4 errors, 0 warnings)
    
    
    ── knip: unused files, exports, and dependencies ──
    
    Findings reported by: eslint.
    ```
- **refactor**: succeeded
  - Model: claude-sonnet-5
  - Files: /workspace/calculator/src/index.ts
- **evidence**: succeeded
  - Script: `{ printf '%s\n' '=== QUALITY BEFORE ==='; cat /tmp/fabro-refactor-quality-before.txt; printf '%s\n' '=== QUALITY NOW ==='; npm run quality 2>&1 || true; printf '%s\n' '=== TESTS ==='; npm test 2>&1 || true; printf '%s\n' '=== WORKING DIFF SUMMARY ==='; git diff --stat; git diff --check || true; }`
  - Output:
    ```
    (37 lines omitted)
    Findings reported by: eslint.
    === TESTS ===
    
    > spoken-expression-calculator-kata@0.1.0 test
    > npm run build && vitest run
    
    
    > spoken-expression-calculator-kata@0.1.0 build
    > tsc -p tsconfig.json
    
    
    [1m[30m[46m RUN [49m[39m[22m [36mv4.1.11 [39m[90m/repos/jonfazzaro/calculator[39m
    
     [32m✓[39m test/calculator.test.ts [2m([22m[2m9 tests[22m[2m)[22m[33m 387[2mms[22m[39m
    
    [2m Test Files [22m [1m[32m1 passed[39m[22m[90m (1)[39m
    [2m      Tests [22m [1m[32m9 passed[39m[22m[90m (9)[39m
    [2m   Start at [22m 13:31:32
    [2m   Duration [22m 456ms[2m (transform 16ms, setup 0ms, import 22ms, tests 387ms, environment 0ms)[22m
    
    === WORKING DIFF SUMMARY ===
     dist/cli.js                                        |  2 +-
     dist/index.js                                      | 93 ++++++++++++++++++++--
     .../results.json                                   |  2 +-
     3 files changed, 90 insertions(+), 7 deletions(-)
    ```
- **validate**: succeeded
  - Model: claude-sonnet-5
- **verdict**: succeeded
- **iteration_limit**: succeeded
- **baseline**: succeeded
  - Script: `npm run quality 2>&1 | tee /tmp/fabro-refactor-quality-before.txt || true`
  - Output:
    ```
    > spoken-expression-calculator-kata@0.1.0 quality
    > node scripts/quality.mjs
    
    
    ── eslint: complexity, size, and duplicated branches ──
    
    /repos/jonfazzaro/calculator/src/index.ts
      56:8   error  Function 'evaluateSpokenExpression' has too many lines (27). Maximum allowed is 20  max-lines-per-function
      65:27  error  Refactor this function to reduce its Cognitive Complexity from 7 to the 5 allowed   sonarjs/cognitive-complexity
      65:27  error  Arrow function has too many statements (14). Maximum allowed is 12                  max-statements
      65:27  error  Arrow function has a complexity of 7. Maximum allowed is 5                          complexity
    
    ✖ 4 problems (4 errors, 0 warnings)
    
    
    ── knip: unused files, exports, and dependencies ──
    
    Findings reported by: eslint.
    ```
- **refactor**: succeeded
  - Model: claude-sonnet-5
  - Files: /workspace/calculator/src/index.ts
- **evidence**: succeeded
  - Script: `{ printf '%s\n' '=== QUALITY BEFORE ==='; cat /tmp/fabro-refactor-quality-before.txt; printf '%s\n' '=== QUALITY NOW ==='; npm run quality 2>&1 || true; printf '%s\n' '=== TESTS ==='; npm test 2>&1 || true; printf '%s\n' '=== WORKING DIFF SUMMARY ==='; git diff --stat; git diff --check || true; }`
  - Output:
    ```
    (37 lines omitted)
    Findings reported by: eslint.
    === TESTS ===
    
    > spoken-expression-calculator-kata@0.1.0 test
    > npm run build && vitest run
    
    
    > spoken-expression-calculator-kata@0.1.0 build
    > tsc -p tsconfig.json
    
    
    [1m[30m[46m RUN [49m[39m[22m [36mv4.1.11 [39m[90m/repos/jonfazzaro/calculator[39m
    
     [32m✓[39m test/calculator.test.ts [2m([22m[2m9 tests[22m[2m)[22m[33m 387[2mms[22m[39m
    
    [2m Test Files [22m [1m[32m1 passed[39m[22m[90m (1)[39m
    [2m      Tests [22m [1m[32m9 passed[39m[22m[90m (9)[39m
    [2m   Start at [22m 13:31:32
    [2m   Duration [22m 456ms[2m (transform 16ms, setup 0ms, import 22ms, tests 387ms, environment 0ms)[22m
    
    === WORKING DIFF SUMMARY ===
     dist/cli.js                                        |  2 +-
     dist/index.js                                      | 93 ++++++++++++++++++++--
     .../results.json                                   |  2 +-
     3 files changed, 90 insertions(+), 7 deletions(-)
    ```
- **validate**: succeeded
  - Model: claude-sonnet-5
- **verdict**: succeeded
- **iteration_limit**: succeeded
- **baseline**: succeeded
  - Script: `npm run quality 2>&1 | tee /tmp/fabro-refactor-quality-before.txt || true`
  - Output:
    ```
    > spoken-expression-calculator-kata@0.1.0 quality
    > node scripts/quality.mjs
    
    
    ── eslint: complexity, size, and duplicated branches ──
    
    /repos/jonfazzaro/calculator/src/index.ts
      56:8   error  Function 'evaluateSpokenExpression' has too many lines (27). Maximum allowed is 20  max-lines-per-function
      65:27  error  Refactor this function to reduce its Cognitive Complexity from 7 to the 5 allowed   sonarjs/cognitive-complexity
      65:27  error  Arrow function has too many statements (14). Maximum allowed is 12                  max-statements
      65:27  error  Arrow function has a complexity of 7. Maximum allowed is 5                          complexity
    
    ✖ 4 problems (4 errors, 0 warnings)
    
    
    ── knip: unused files, exports, and dependencies ──
    
    Findings reported by: eslint.
    ```
- **refactor**: succeeded
  - Model: claude-sonnet-5
  - Files: /workspace/calculator/src/index.ts
- **evidence**: succeeded
  - Script: `{ printf '%s\n' '=== QUALITY BEFORE ==='; cat /tmp/fabro-refactor-quality-before.txt; printf '%s\n' '=== QUALITY NOW ==='; npm run quality 2>&1 || true; printf '%s\n' '=== TESTS ==='; npm test 2>&1 || true; printf '%s\n' '=== WORKING DIFF SUMMARY ==='; git diff --stat; git diff --check || true; }`
  - Output:
    ```
    (37 lines omitted)
    Findings reported by: eslint.
    === TESTS ===
    
    > spoken-expression-calculator-kata@0.1.0 test
    > npm run build && vitest run
    
    
    > spoken-expression-calculator-kata@0.1.0 build
    > tsc -p tsconfig.json
    
    
    [1m[30m[46m RUN [49m[39m[22m [36mv4.1.11 [39m[90m/repos/jonfazzaro/calculator[39m
    
     [32m✓[39m test/calculator.test.ts [2m([22m[2m9 tests[22m[2m)[22m[33m 387[2mms[22m[39m
    
    [2m Test Files [22m [1m[32m1 passed[39m[22m[90m (1)[39m
    [2m      Tests [22m [1m[32m9 passed[39m[22m[90m (9)[39m
    [2m   Start at [22m 13:31:32
    [2m   Duration [22m 456ms[2m (transform 16ms, setup 0ms, import 22ms, tests 387ms, environment 0ms)[22m
    
    === WORKING DIFF SUMMARY ===
     dist/cli.js                                        |  2 +-
     dist/index.js                                      | 93 ++++++++++++++++++++--
     .../results.json                                   |  2 +-
     3 files changed, 90 insertions(+), 7 deletions(-)
    ```
- **validate**: succeeded
  - Model: claude-sonnet-5
- **verdict**: succeeded
- **iteration_limit**: succeeded
- **baseline**: succeeded
  - Script: `npm run quality 2>&1 | tee /tmp/fabro-refactor-quality-before.txt || true`
  - Output:
    ```
    > spoken-expression-calculator-kata@0.1.0 quality
    > node scripts/quality.mjs
    
    
    ── eslint: complexity, size, and duplicated branches ──
    
    /repos/jonfazzaro/calculator/src/index.ts
      56:8   error  Function 'evaluateSpokenExpression' has too many lines (27). Maximum allowed is 20  max-lines-per-function
      65:27  error  Refactor this function to reduce its Cognitive Complexity from 7 to the 5 allowed   sonarjs/cognitive-complexity
      65:27  error  Arrow function has too many statements (14). Maximum allowed is 12                  max-statements
      65:27  error  Arrow function has a complexity of 7. Maximum allowed is 5                          complexity
    
    ✖ 4 problems (4 errors, 0 warnings)
    
    
    ── knip: unused files, exports, and dependencies ──
    
    Findings reported by: eslint.
    ```
- **refactor**: succeeded
  - Model: claude-sonnet-5
  - Files: /workspace/calculator/src/index.ts
- **evidence**: succeeded
  - Script: `{ printf '%s\n' '=== QUALITY BEFORE ==='; cat /tmp/fabro-refactor-quality-before.txt; printf '%s\n' '=== QUALITY NOW ==='; npm run quality 2>&1 || true; printf '%s\n' '=== TESTS ==='; npm test 2>&1 || true; printf '%s\n' '=== WORKING DIFF SUMMARY ==='; git diff --stat; git diff --check || true; }`
  - Output:
    ```
    (37 lines omitted)
    Findings reported by: eslint.
    === TESTS ===
    
    > spoken-expression-calculator-kata@0.1.0 test
    > npm run build && vitest run
    
    
    > spoken-expression-calculator-kata@0.1.0 build
    > tsc -p tsconfig.json
    
    
    [1m[30m[46m RUN [49m[39m[22m [36mv4.1.11 [39m[90m/repos/jonfazzaro/calculator[39m
    
     [32m✓[39m test/calculator.test.ts [2m([22m[2m9 tests[22m[2m)[22m[33m 387[2mms[22m[39m
    
    [2m Test Files [22m [1m[32m1 passed[39m[22m[90m (1)[39m
    [2m      Tests [22m [1m[32m9 passed[39m[22m[90m (9)[39m
    [2m   Start at [22m 13:31:32
    [2m   Duration [22m 456ms[2m (transform 16ms, setup 0ms, import 22ms, tests 387ms, environment 0ms)[22m
    
    === WORKING DIFF SUMMARY ===
     dist/cli.js                                        |  2 +-
     dist/index.js                                      | 93 ++++++++++++++++++++--
     .../results.json                                   |  2 +-
     3 files changed, 90 insertions(+), 7 deletions(-)
    ```
- **validate**: succeeded
  - Model: claude-sonnet-5
- **verdict**: succeeded
- **iteration_limit**: succeeded
- **baseline**: succeeded
  - Script: `npm run quality 2>&1 | tee /tmp/fabro-refactor-quality-before.txt || true`
  - Output:
    ```
    > spoken-expression-calculator-kata@0.1.0 quality
    > node scripts/quality.mjs
    
    
    ── eslint: complexity, size, and duplicated branches ──
    
    /repos/jonfazzaro/calculator/src/index.ts
      56:8   error  Function 'evaluateSpokenExpression' has too many lines (27). Maximum allowed is 20  max-lines-per-function
      65:27  error  Refactor this function to reduce its Cognitive Complexity from 7 to the 5 allowed   sonarjs/cognitive-complexity
      65:27  error  Arrow function has too many statements (14). Maximum allowed is 12                  max-statements
      65:27  error  Arrow function has a complexity of 7. Maximum allowed is 5                          complexity
    
    ✖ 4 problems (4 errors, 0 warnings)
    
    
    ── knip: unused files, exports, and dependencies ──
    
    Findings reported by: eslint.
    ```
- **refactor**: succeeded
  - Model: claude-sonnet-5
  - Files: /workspace/calculator/src/index.ts
- **evidence**: succeeded
  - Script: `{ printf '%s\n' '=== QUALITY BEFORE ==='; cat /tmp/fabro-refactor-quality-before.txt; printf '%s\n' '=== QUALITY NOW ==='; npm run quality 2>&1 || true; printf '%s\n' '=== TESTS ==='; npm test 2>&1 || true; printf '%s\n' '=== WORKING DIFF SUMMARY ==='; git diff --stat; git diff --check || true; }`
  - Output:
    ```
    (37 lines omitted)
    Findings reported by: eslint.
    === TESTS ===
    
    > spoken-expression-calculator-kata@0.1.0 test
    > npm run build && vitest run
    
    
    > spoken-expression-calculator-kata@0.1.0 build
    > tsc -p tsconfig.json
    
    
    [1m[30m[46m RUN [49m[39m[22m [36mv4.1.11 [39m[90m/repos/jonfazzaro/calculator[39m
    
     [32m✓[39m test/calculator.test.ts [2m([22m[2m9 tests[22m[2m)[22m[33m 387[2mms[22m[39m
    
    [2m Test Files [22m [1m[32m1 passed[39m[22m[90m (1)[39m
    [2m      Tests [22m [1m[32m9 passed[39m[22m[90m (9)[39m
    [2m   Start at [22m 13:31:32
    [2m   Duration [22m 456ms[2m (transform 16ms, setup 0ms, import 22ms, tests 387ms, environment 0ms)[22m
    
    === WORKING DIFF SUMMARY ===
     dist/cli.js                                        |  2 +-
     dist/index.js                                      | 93 ++++++++++++++++++++--
     .../results.json                                   |  2 +-
     3 files changed, 90 insertions(+), 7 deletions(-)
    ```

## Context
- verdict: PASS


You are a validation assistant.

Determine whether the calculator change is a single refactoring in `src/index.ts` that improved quality against the success criteria below.

Use read-only tools to inspect the complete current code and working diff. You may use `git diff` and `git status` to inspect the change. Use the preceding command-stage evidence for the baseline, current quality result, and test result. Do not edit files, commit, install dependencies, or run npm commands.

Return `VERDICT: PASS` when all of these are true:

- tests pass;
- quality is no worse than the recorded baseline;
- the change stays within the requested target; and
- the change credibly improves at least one success criterion without harming another.

Do not fail an iteration merely because it did not solve every success criterion. For a criterion not directly improved, record that the inspected diff shows no regression.

Return `VERDICT: FAIL` only for a test failure, quality regression, out-of-scope change, or no credible improvement.

Do not modify files.

Start the response with exactly one of these lines:

`VERDICT: PASS`

`VERDICT: FAIL`

Then provide one finding per success criterion in this format:

```text
FINDINGS:
- [PASS] <success criterion>: <specific evidence>
- [FAIL] <success criterion>: <specific evidence>
```

End with exactly one JSON object on its own line. Use the verdict you chose:

```json
{"context_updates":{"verdict":"PASS"}}
```

or

```json
{"context_updates":{"verdict":"FAIL"}}
```

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