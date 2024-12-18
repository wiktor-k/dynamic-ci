const execSync = require("child_process").execSync;
const fs = require("fs");

const justfile = JSON.parse(
    execSync("just --dump --dump-format=json", {
        encoding: "utf-8",
    }),
);

const recipes = Object.values(justfile.recipes).filter((recipe) =>
    recipe.attributes.some((attribute) => attribute.group == "ci"),
);
fs.appendFileSync(
    process.env.GITHUB_OUTPUT,
    `matrix=` + JSON.stringify(recipes),
);
