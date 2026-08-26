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


You are a refactoring assistant.

Choose one small, behavior-preserving refactoring in `src/index.ts`. If it is a directory, choose a code file within it. Do not edit code outside that target. Work toward the success criteria below. Improve the design so it is more scannable, readable, and safe to change. One change is one step along the road, not the whole destination.

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