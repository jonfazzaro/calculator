Only `src/index.ts` changed across all iterations, converging into a single consolidated diff. This gives me enough evidence to write the PR summary.

```text
PR_TITLE: Extract operator table and tokenizer in spoken-expression parser

PR_BODY:
## Summary
- Replaced the repeated `add`/`subtract`/`multiply`/`divide` if-chains with a single `OPERATORS` lookup table that pairs each operator's connector word with its compute function, removing duplicated parsing logic.
- Extracted `tokenize` and `parseLiteral` helper functions from `evaluateSpokenExpression`, and added a shared `consume` helper for expected-token checks, shrinking the main parser to satisfy function-size and complexity limits.
- No behavior changes: expression parsing, error handling (including divide-by-zero), and supported number/operator vocabulary remain identical.

## Validation
- `npm test`
- `npm run quality`
```