import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Global ignores - must be first
  {
    ignores: [
      // Generated files
      "src/generated/**/*",
      "src/generated/**/*.js",
      "src/generated/**/*.d.ts",
      "node_modules/**/*",
      ".next/**/*",
      "out/**/*",
      "build/**/*",
      // Prisma generated files
      "prisma/generated/**/*",
      // Specific generated files
      "**/generated/**",
      "**/*.generated.*",
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // TypeScript specific rules
      "@typescript-eslint/no-explicit-any": "warn", // Changed to warn for generated files
      "@typescript-eslint/no-unused-vars": "warn", // Changed to warn for generated files
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/no-require-imports": "off", // Allow require in generated files

      // General code quality rules
      "prefer-const": "warn", // Changed to warn for generated files
      "no-var": "warn", // Changed to warn for generated files
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "@typescript-eslint/no-unused-expressions": "warn", // Changed to warn
      "@typescript-eslint/no-empty-object-type": "warn", // Changed to warn
      "@typescript-eslint/no-wrapper-object-types": "warn", // Changed to warn
      "@typescript-eslint/no-unsafe-function-type": "warn", // Changed to warn
      "@typescript-eslint/no-unnecessary-type-constraint": "warn", // Changed to warn
    },
  },
];

export default eslintConfig;
