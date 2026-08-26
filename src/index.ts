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

type Compute = (first: number, second: number, fail: () => never) => number;

/** Prefix operators are spoken as: <operator> <first> <connector> <second>. */
const OPERATORS: Record<string, { connector: string; compute: Compute }> = {
  add: { connector: "and", compute: (first, second) => first + second },
  subtract: { connector: "from", compute: (first, second) => second - first },
  multiply: { connector: "by", compute: (first, second) => first * second },
  divide: {
    connector: "by",
    compute: (first, second, fail) => (second === 0 ? fail() : first / second),
  },
};

/** Split spoken-expression source into its words and parentheses. */
function tokenize(source: string): string[] {
  return source
    .toLowerCase()
    .replace(/\(/g, " ( ")
    .replace(/\)/g, " ) ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

/** A read position over the tokenised words, with the kata's shared failure. */
function createCursor(pieces: string[]) {
  let place = 0;

  const fail = (): never => {
    // Deliberately unhelpful starter error: a later kata step improves this.
    throw new Error("Could not work that out.");
  };

  const nextWord = (): string => {
    const word = pieces[place++];
    if (!word) fail();
    return word;
  };

  const expectWord = (expected: string): void => {
    if (nextWord() !== expected) fail();
  };

  const atEnd = (): boolean => place === pieces.length;

  return { fail, nextWord, expectWord, atEnd };
}

/** Parse the tokenised spoken-expression words into their numeric result. */
function parseExpression(pieces: string[]): number {
  const cursor = createCursor(pieces);

  const readParenthesized = (): number => {
    const inside = readValue();
    cursor.expectWord(")");
    return inside;
  };

  const readOperatorExpression = (operator: (typeof OPERATORS)[string]): number => {
    const first = readValue();
    cursor.expectWord(operator.connector);
    const second = readValue();
    return operator.compute(first, second, cursor.fail);
  };

  const readValue = (): number => {
    const word = cursor.nextWord();
    if (word === "(") return readParenthesized();
    if (/^\d+$/.test(word)) return Number(word);

    const numberWord = NUMBER_WORDS[word];
    if (numberWord !== undefined) return numberWord;

    const operator = OPERATORS[word];
    return operator ? readOperatorExpression(operator) : cursor.fail();
  };

  const answer = readValue();
  if (!cursor.atEnd()) cursor.fail();
  return answer;
}

/** Evaluate the kata's tiny spoken-expression language. */
export function evaluateSpokenExpression(source: string): number {
  return parseExpression(tokenize(source));
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
