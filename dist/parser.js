const NUMBER_WORDS = {
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
function fail() {
    // Deliberately unhelpful starter error: a later kata step improves this.
    throw new Error("Could not work that out.");
}
const BINARY_OPERATIONS = {
    add: { separator: "and", compute: (left, right) => left + right },
    subtract: { separator: "from", compute: (subtrahend, minuend) => minuend - subtrahend },
    multiply: { separator: "by", compute: (left, right) => left * right },
    divide: {
        separator: "by",
        compute: (dividend, divisor) => {
            if (divisor === 0)
                fail();
            return dividend / divisor;
        },
    },
};
function tokenize(source) {
    return source
        .toLowerCase()
        .replace(/\(/g, " ( ")
        .replace(/\)/g, " ) ")
        .trim()
        .split(/\s+/)
        .filter(Boolean);
}
class Parser {
    tokens;
    position = 0;
    constructor(tokens) {
        this.tokens = tokens;
    }
    parse() {
        const answer = this.readExpression();
        if (this.position !== this.tokens.length)
            fail();
        return answer;
    }
    expect(keyword) {
        if (this.tokens[this.position++] !== keyword)
            fail();
    }
    readBinaryExpression(operation) {
        const firstOperand = this.readExpression();
        this.expect(operation.separator);
        const secondOperand = this.readExpression();
        return operation.compute(firstOperand, secondOperand);
    }
    readExpression() {
        const word = this.tokens[this.position++];
        if (!word)
            fail();
        if (word === "(") {
            const inside = this.readExpression();
            this.expect(")");
            return inside;
        }
        if (/^\d+$/.test(word))
            return Number(word);
        const numberWord = NUMBER_WORDS[word];
        if (numberWord !== undefined)
            return numberWord;
        const operation = BINARY_OPERATIONS[word];
        if (operation) {
            return this.readBinaryExpression(operation);
        }
        return fail();
    }
}
/**
 * Evaluate the kata's tiny spoken-expression language.
 *
 * This is intentionally a single, inconvenient starting point for the kata:
 * it tokenises, parses, performs arithmetic, formats results, and knows about
 * command-line output. The behaviour is covered; the structure is not a model
 * to emulate.
 */
export function evaluateSpokenExpression(source) {
    return new Parser(tokenize(source)).parse();
}
