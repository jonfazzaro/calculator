Extract token-reduction logic from evaluateSpokenExpression

Split the oversized parsing/evaluation function into smaller,
named helpers to reduce cognitive complexity, line count, and
statement count, moving toward the max-lines-per-function,
complexity, and max-statements ESLint thresholds while keeping
all 9 tests passing.