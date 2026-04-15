import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import nextPlugin from "@next/eslint-plugin-next";

const tsRecommended = tsPlugin.configs["flat/recommended"];

const eslintConfig = [
  // TypeScript recommended (flat config)
  ...(Array.isArray(tsRecommended) ? tsRecommended : [tsRecommended]),
  // Next.js core web vitals (flat config)
  nextPlugin.flatConfig.coreWebVitals,
  // Override parser for TS files
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        sourceType: "module",
      },
    },
  },
];

export default eslintConfig;
