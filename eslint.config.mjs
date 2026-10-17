import { defineConfig, globalIgnores } from "eslint/config";
import { fixupPluginRules } from "@eslint/compat";
import next from "eslint-config-next";
import nextTs from "eslint-config-next/typescript";

// Temporary Next 14 plugin pin avoids the vulnerable fast-glob chain.
// Keep Next 16's flat config and adapt the older rule API for ESLint 9.
const nextConfig = next.map((config) => {
  const plugin = config.plugins?.["@next/next"];
  return plugin
    ? {
        ...config,
        plugins: { ...config.plugins, "@next/next": fixupPluginRules(plugin) },
        rules: { ...config.rules, ...plugin.configs["core-web-vitals"].rules },
      }
    : config;
});

const eslintConfig = defineConfig([
  ...nextConfig,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
