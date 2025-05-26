import js from "@eslint/js";
import { defineConfig } from "eslint/config";


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"], "rules": {    
    "prettier/prettier": ["error", { "singleQuote": true }],
    "quotes": ["error", "single", { "avoidEscape": true }]
  } },
]);
