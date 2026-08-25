import { evaluateSpokenExpression } from "./parser.js";
export { evaluateSpokenExpression };
export function formatAnswer(answer) {
    return `Result: ${answer}`;
}
/** Run the command-line behaviour without making tests replace process.exit. */
export function runCli(args, write, writeError) {
    if (args.length === 0) {
        writeError("Give me a spoken expression to calculate.");
        return 1;
    }
    try {
        const expression = args.join(" ");
        const answer = evaluateSpokenExpression(expression);
        write(formatAnswer(answer));
        return 0;
    }
    catch {
        writeError("Unable to calculate that expression.");
        return 1;
    }
}
