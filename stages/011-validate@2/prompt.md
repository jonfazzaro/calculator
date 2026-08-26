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
    added 159 packages, and audited 160 packages in 47s
    
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
  - Script: `npm run quality 2>&1 || true`
  - Output:
    ```
    > spoken-expression-calculator-kata@0.1.0 quality
    > node scripts/quality.mjs
    
    
    ── eslint: complexity, size, and duplicated branches ──
    
    /repos/jonfazzaro/calculator/src/index.ts
      27:8   error  Function 'evaluateSpokenExpression' has too many lines (54). Maximum allowed is 20  max-lines-per-function
      42:27  error  Arrow function has too many lines (38). Maximum allowed is 20                       max-lines-per-function
      42:27  error  Refactor this function to reduce its Cognitive Complexity from 20 to the 5 allowed  sonarjs/cognitive-complexity
      42:27  error  Arrow function has too many statements (31). Maximum allowed is 12                  max-statements
      42:27  error  Arrow function has a complexity of 15. Maximum allowed is 5                         complexity
    
    ✖ 5 problems (5 errors, 0 warnings)
    
    
    ── knip: unused files, exports, and dependencies ──
    
    Findings reported by: eslint.
    ```
- **refactor**: succeeded
  - Model: claude-sonnet-5
  - Files: /workspace/calculator/src/index.ts
- **evidence**: succeeded
  - Script: `{ printf '%s\n' '=== QUALITY BEFORE ==='; npm run quality 2>&1 || true; printf '%s\n' '=== TESTS ==='; npm test 2>&1 || true; printf '%s\n' '=== WORKING DIFF ==='; git diff -- .; }`
  - Output:
    ```
    (139 lines omitted)
    +    return answer;
    +}
     export function formatAnswer(answer) {
         return `Result: ${answer}`;
     }
    @@ -10,9 +94,7 @@ export function runCli(args, write, writeError) {
             return 1;
         }
         try {
    -        const expression = args.join(" ");
    -        const answer = evaluateSpokenExpression(expression);
    -        write(formatAnswer(answer));
    +        write(formatAnswer(evaluateSpokenExpression(args.join(" "))));
             return 0;
         }
         catch {
    diff --git a/node_modules/.vite/vitest/da39a3ee5e6b4b0d3255bfef95601890afd80709/results.json b/node_modules/.vite/vitest/da39a3ee5e6b4b0d3255bfef95601890afd80709/results.json
    index 1590f37..718e31e 100644
    --- a/node_modules/.vite/vitest/da39a3ee5e6b4b0d3255bfef95601890afd80709/results.json
    +++ b/node_modules/.vite/vitest/da39a3ee5e6b4b0d3255bfef95601890afd80709/results.json
    @@ -1 +1 @@
    -{"version":"4.1.10","results":[[":test/calculator.test.ts",{"duration":1232.0336670000002,"failed":false}]]}
    \ No newline at end of file
    +{"version":"4.1.10","results":[[":test/calculator.test.ts",{"duration":367.31995900000004,"failed":false}]]}
    \ No newline at end of file
    ```
- **validate**: succeeded
  - Model: claude-sonnet-5
- **verdict**: succeeded
- **repair**: succeeded
  - Model: claude-sonnet-5
  - Files: /workspace/calculator/src/index.ts
- **evidence**: succeeded
  - Script: `{ printf '%s\n' '=== QUALITY BEFORE ==='; npm run quality 2>&1 || true; printf '%s\n' '=== TESTS ==='; npm test 2>&1 || true; printf '%s\n' '=== WORKING DIFF ==='; git diff -- .; }`
  - Output:
    ```
    (139 lines omitted)
    +    return answer;
    +}
     export function formatAnswer(answer) {
         return `Result: ${answer}`;
     }
    @@ -10,9 +94,7 @@ export function runCli(args, write, writeError) {
             return 1;
         }
         try {
    -        const expression = args.join(" ");
    -        const answer = evaluateSpokenExpression(expression);
    -        write(formatAnswer(answer));
    +        write(formatAnswer(evaluateSpokenExpression(args.join(" "))));
             return 0;
         }
         catch {
    diff --git a/node_modules/.vite/vitest/da39a3ee5e6b4b0d3255bfef95601890afd80709/results.json b/node_modules/.vite/vitest/da39a3ee5e6b4b0d3255bfef95601890afd80709/results.json
    index 1590f37..718e31e 100644
    --- a/node_modules/.vite/vitest/da39a3ee5e6b4b0d3255bfef95601890afd80709/results.json
    +++ b/node_modules/.vite/vitest/da39a3ee5e6b4b0d3255bfef95601890afd80709/results.json
    @@ -1 +1 @@
    -{"version":"4.1.10","results":[[":test/calculator.test.ts",{"duration":1232.0336670000002,"failed":false}]]}
    \ No newline at end of file
    +{"version":"4.1.10","results":[[":test/calculator.test.ts",{"duration":367.31995900000004,"failed":false}]]}
    \ No newline at end of file
    ```

## Context
- verdict: FAIL


You are a validation assistant.

Determine whether the calculator change is a single refactoring in `src/index.ts` that improved quality against the success criteria below. Read the preceding command-stage evidence, including quality, tests, and the working diff. Compare it with the baseline. A passing test alone is not a passing verdict: every criterion needs evidence. Do not expect one small refactoring to reach every criterion immediately.

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