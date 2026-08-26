Refactor evaluateSpokenExpression to extract smaller functions

Break the monolithic arrow function and evaluateSpokenExpression into
smaller, named helper functions, eliminating the max-lines-per-function,
complexity, cognitive-complexity, and max-statements ESLint violations.
All 9 tests still pass, preserving behavior.