import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";

export default {
    input: "src/index.tsx", // Entry point for your library
    output: {
        dir: "dist",
        format: "esm", // Output as ESM
        entryFileNames: "[name].js", // Add .js extension to output files
    },
    plugins: [
        resolve(), // Resolves node_modules imports
        commonjs(), // Converts CommonJS to ESM
        typescript({
            tsconfig: "./tsconfig.json",
            useTsconfigDeclarationDir: true, // Use declarationDir from tsconfig.json
        }),
    ],
    external: [
        "@emotion/react",
        "@emotion/styled",
        "@mui/icons-material",
        "@mui/material",
        "@mui/x-date-pickers",
        "dayjs",
        "react",
        "react-dom",
        "react-markdown",
        "remark-gfm",
    ],
};
