module.exports = {
  root: true,
  env: { node: true, es2020: true },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  rules: {},
};
