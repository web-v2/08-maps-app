const { writeFileSync, mkdirSync } = require("fs");
require("dotenv").config();

const mapboxKey = process.env["MAPBOX_KEY"];
const targetPath = "./src/environments/environment.ts";
const targetPathDev = "./src/environments/environment.development.ts";

if (!mapboxKey) {
  throw new Error("MAPBOX_KEY is required");
}

const envFileContent = `
  export const environment = {
    mapboxKey:"${mapboxKey}"
  };
`;

mkdirSync("./src/environments/", { recursive: true });
writeFileSync(targetPath, envFileContent);
writeFileSync(targetPathDev, envFileContent);
