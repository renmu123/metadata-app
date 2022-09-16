module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: ["plugin:vue/essential", "eslint:recommended"],

  parserOptions: {
    parser: "@babel/eslint-parser",
  },

  rules: {
    "no-console": "off",
    "no-debugger": "warn",
    "vue/no-unused-vars": [
      "warn",
      {
        ignorePattern: "^_",
      },
    ],
    "no-unused-vars": "off",
    "no-unreachable": 1,
    "vue/multi-word-component-names": "off",
    "vue/no-mutating-props": "off",
    "vue/no-reserved-component-names": "off",
  },

  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        jest: true,
      },
    },
  ],
};
