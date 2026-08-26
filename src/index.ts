type Output = (line: string) => void;

const NUMBER_WORDS: Record<string, number> = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  eleven: 11,
  twelve: 12,
};

function tokenize(source: string): string[] {
  return source
    .toLowerCase()
    .replace(/\(/g, " ( ")
    .replace(/\)/g, " ) ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function fail(): never {
  // Deliberately unhelpful starter error: a later kata step improves this.
  throw new Error("Could not work that out.");
}

function parseNumberWord(word: string): number | undefined {
  if (/^\d+$/.test(word)) return Number(word);
  return NUMBER_WORDS[word];
}

type Cursor = { pieces: string[]; place: number };

// Operators are prefix forms: <operator> <operand> <linkingWord> <operand>.
type BinaryOperator = { linkingWord: string; compute: (first: number, second: number) => number };

const OPERATORS: Record<string, BinaryOperator> = {
  add: { linkingWord: "and", compute: (first, second) => first + second },
  subtract: { linkingWord: "from", compute: (first, second) => second - first },
  multiply: { linkingWord: "by", compute: (first, second) => first * second },
  divide: {
    linkingWord: "by",
    compute: (first, second) => {
      if (second === 0) fail();
      return first / second;
    },
  },
};

function readBinaryOperation(cursor: Cursor, operator: BinaryOperator): number {
  const first = readExpression(cursor);
  if (cursor.pieces[cursor.place++] !== operator.linkingWord) fail();
  const second = readExpression(cursor);
  return operator.compute(first, second);
}

function readExpression(cursor: Cursor): number {
  const word = cursor.pieces[cursor.place++];
  if (!word) fail();

  if (word === "(") {
    const inside = readExpression(cursor);
    if (cursor.pieces[cursor.place++] !== ")") fail();
    return inside;
  }

  const number = parseNumberWord(word);
  if (number !== undefined) return number;

  const operator = OPERATORS[word];
  if (operator) return readBinaryOperation(cursor, operator);

  return fail();
}

/**
 * Evaluate the kata's tiny spoken-expression language.
 *
 * This is intentionally a single, inconvenient starting point for the kata:
 * it tokenises, parses, performs arithmetic, formats results, and knows about
 * command-line output. The behaviour is covered; the structure is not a model
 * to emulate.
 */
export function evaluateSpokenExpression(source: string): number {
  const cursor: Cursor = { pieces: tokenize(source), place: 0 };
  const answer = readExpression(cursor);
  if (cursor.place !== cursor.pieces.length) fail();
  return answer;
}

export function formatAnswer(answer: number): string {
  return `Result: ${answer}`;
}

/** Run the command-line behaviour without making tests replace process.exit. */
export function runCli(args: string[], write: Output, writeError: Output): number {
  if (args.length === 0) {
    writeError("Give me a spoken expression to calculate.");
    return 1;
  }

  try {
    write(formatAnswer(evaluateSpokenExpression(args.join(" "))));
    return 0;
  } catch {
    writeError("Unable to calculate that expression.");
    return 1;
  }
}
