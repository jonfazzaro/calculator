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
    added 159 packages, and audited 160 packages in 42s
    
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
  - Script: `{ printf '%s\n' '=== QUALITY BEFORE ==='; cat /tmp/fabro-refactor-quality-before.txt; printf '%s\n' '=== QUALITY NOW ==='; npm run quality 2>&1 || true; printf '%s\n' '=== TESTS ==='; npm test 2>&1 || true; printf '%s\n' '=== WORKING DIFF SUMMARY ==='; git diff --stat; git diff --check || true; }`
  - Output:
    ```
    (41 lines omitted)
    Findings reported by: eslint.
    === TESTS ===
    
    > spoken-expression-calculator-kata@0.1.0 test
    > npm run build && vitest run
    
    
    > spoken-expression-calculator-kata@0.1.0 build
    > tsc -p tsconfig.json
    
    
    [1m[30m[46m RUN [49m[39m[22m [36mv4.1.11 [39m[90m/repos/jonfazzaro/calculator[39m
    
     [32m✓[39m test/calculator.test.ts [2m([22m[2m9 tests[22m[2m)[22m[33m 365[2mms[22m[39m
    
    [2m Test Files [22m [1m[32m1 passed[39m[22m[90m (1)[39m
    [2m      Tests [22m [1m[32m9 passed[39m[22m[90m (9)[39m
    [2m   Start at [22m 00:20:53
    [2m   Duration [22m 428ms[2m (transform 14ms, setup 0ms, import 19ms, tests 365ms, environment 0ms)[22m
    
    === WORKING DIFF SUMMARY ===
     dist/cli.js                                        |  2 +-
     dist/index.js                                      | 84 ++++++++++++++++++++--
     .../results.json                                   |  2 +-
     3 files changed, 81 insertions(+), 7 deletions(-)
    ```
- **validate**: succeeded
  - Model: claude-sonnet-5
- **verdict**: succeeded
- **commit_message**: succeeded
  - Model: claude-sonnet-5

## Context
- verdict: PASS


Read the commit message from the preceding stage and inspect the current working diff.

Create one git commit containing only the completed refactoring. Use the preceding message unchanged. Do not make further code changes. If there is no diff, stop and report the problem instead of creating an empty commit.
