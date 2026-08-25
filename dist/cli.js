#!/usr/bin/env node
import { runCli } from "./index.js";
const status = runCli(process.argv.slice(2), console.log, console.error);
process.exitCode = status;
