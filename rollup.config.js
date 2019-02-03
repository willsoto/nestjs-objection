import filesize from "rollup-plugin-filesize";
import typescript from "rollup-plugin-typescript";
import { eslint } from "rollup-plugin-eslint";
import pkg from "./package.json";

const formats = ["umd", "esm", "cjs"];
const globals = {
  knex: "Knex",
  objection: "Objection"
};

export default {
  input: "lib/index.ts",
  output: formats.map((format) => ({
    file: `dist/nestjs-objection.${format}.js`,
    format,
    name: "NestJSObjection",
    sourcemap: true,
    globals,
    banner: `
      /**
       *
       * NestJS Objection
       * ${pkg.name}@${pkg.version}
       * ${pkg.license}
       *
       */
      `
  })),
  external: Object.keys(globals),
  plugins: [eslint(), typescript(), filesize()]
};
