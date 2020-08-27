import typescript from "@rollup/plugin-typescript";
import filesize from "rollup-plugin-filesize";
import pkg from "./package.json";

const formats = ["cjs", "esm"];

export default {
  input: "lib/index.ts",
  output: formats.map((format) => ({
    file: `dist/nestjs-objection.${format}.js`,
    format,
    name: "NestJSObjection",
    sourcemap: true,
  })),
  external: Object.keys(pkg.peerDependencies),
  plugins: [
    typescript({
      tsconfig: "./tsconfig.build.json",
    }),
    filesize(),
  ],
};
