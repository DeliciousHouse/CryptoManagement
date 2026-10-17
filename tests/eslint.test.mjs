import assert from "node:assert/strict";
import test from "node:test";
import { ESLint } from "eslint";

const eslint = new ESLint();
const filePath = "app/lint-regression.tsx";

test("Next and TypeScript rules remain compatible with ESLint 9", async () => {
  const [control] = await eslint.lintText(
    "export default function Page() { return <main>Hello</main>; }",
    { filePath },
  );
  assert.deepEqual(control.messages, []);

  const [invalid] = await eslint.lintText(
    'export default function Page({ value }: { value: any }) { return <main>{value}<script src="/script.js" /></main>; }',
    { filePath },
  );
  assert.equal(invalid.fatalErrorCount, 0);
  for (const ruleId of ["@next/next/no-sync-scripts", "@typescript-eslint/no-explicit-any"]) {
    assert.ok(
      invalid.messages.some((message) => message.ruleId === ruleId && message.severity === 2),
      `Expected an error from ${ruleId}`,
    );
  }
});
