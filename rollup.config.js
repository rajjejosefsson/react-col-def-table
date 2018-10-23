import resolve from "rollup-plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import filesize from "rollup-plugin-filesize";
import progress from "rollup-plugin-progress";
import visualizer from "rollup-plugin-visualizer";
import babel from "rollup-plugin-babel";
import postcss from "rollup-plugin-postcss";
import commonjs from "rollup-plugin-commonjs";
import pkg from "./package.json";

export default {
  input: "src/Development/ColDefTable/index.js",
  output: [
    {
      file: pkg.main,
      format: "esm",
      sourcemap: false
    }
    /*
      https://github.com/TrySound/rollup-plugin-terser/issues/5
    {
      file: pkg.cjs,
      format: "cjs",
      sourcemap: false
    }
    */
  ],
  external: ["react", "react-dom", "react-virtualized"],
  plugins: [
    postcss({
      extract: true
    }),

    babel({
      exclude: "node_modules/**",
      babelrc: false,
      presets: [
        ["@babel/preset-env", { modules: false }],
        "@babel/preset-react"
      ],
      plugins: ["@babel/plugin-proposal-class-properties"]
    }),

    resolve(),

    commonjs({
      include: ["node_modules/**", `${__dirname}/../packages/**`]
    }),

    // JS Minifier
    terser(),

    // logs the filesize in cli when done
    filesize(),

    // Progress while building
    progress({ clearLine: false }),

    // Generates a statistics page
    visualizer({
      filename: "./statistics.html",
      title: "My Bundle"
    })
  ]
};
