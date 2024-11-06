const execSync = require("child_process").execSync;
const fs = require("fs");

const output = execSync("just --summary", { encoding: "utf-8" });

fs.appendFileSync(
    process.env.GITHUB_OUTPUT,
    `matrix=` +
        JSON.stringify({
            check: output.split(" ").filter((c) => c.startsWith("check-")),
        }),
);
