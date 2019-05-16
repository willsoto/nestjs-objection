import { eslint } from "rollup-plugin-eslint";
import filesize from "rollup-plugin-filesize";
import typescript from "rollup-plugin-typescript";
import pkg from "./package.json";

const formats = ["umd", "esm"];
const globals = {
  "@nestjs/common": "nestjsCommon",
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
       * ${pkg.name}@${pkg.version}
       * ${pkg.license}
       *
       */`
  })),
  external: Object.keys(globals),
  plugins: [
    eslint({
      throwOnWarning: true,
      throwOnError: true
    }),
    typescript({
      tsconfig: "./tsconfig.build.json"
    }),
    filesize()
  ]
};
