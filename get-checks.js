const execSync = require("child_process").execSync;
const fs = require("fs");

const recipes = [];

for (const file of fs
    .readdirSync(".")
    .filter((file) => file === ".justfile" || file.endsWith(".just"))) {
    const justfile = JSON.parse(
        execSync(`just --justfile ${file} --dump --dump-format=json`, {
            encoding: "utf-8",
        }),
    );

    recipes.push(
        ...Object.values(justfile.recipes)
            .filter((recipe) =>
                recipe.attributes.some((attribute) => attribute.group == "ci"),
            )
            .map((recipe) => {
                recipe.file = file;
                return recipe;
            }),
    );
}

fs.appendFileSync(
    process.env.GITHUB_OUTPUT,
    `recipes=` + JSON.stringify({ recipes }),
);
