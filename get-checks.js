const execSync = require("child_process").execSync;
// import { execSync } from 'child_process';  // replace ^ if using ES modules

const output = execSync("just --summary", { encoding: "utf-8" });

console.log(
    `::set-output name=matrix::` +
        JSON.stringify(
            output
                .split(" ")
                .filter((c) => c.startsWith("check-"))
                .map((c) => ({ check: c })),
        ),
);
