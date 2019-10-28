module.exports = {
  extends: [
    "airbnb",
    "prettier",
    "plugin:promise/recommended",
    "plugin:lodash/recommended",
    "plugin:react/recommended",
    "prettier/react",
  ],
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: "detect", // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  plugins: ["prettier", "promise", "lodash", "react"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        printWidth: 80,
        trailingComma: "all",
      },
    ],
    // It's ok not using destructing
    "react/destructuring-assignment": "off",
    // Do not use .jsx
    "react/jsx-filename-extension": "off",
    // Allow escaping text like: <span>{`You don't have...`}</span>
    "react/jsx-curly-brace-presence": "off",
    // Do not force `export default`
    "import/prefer-default-export": "off",
    "no-continue": "off",
    "no-empty": "off",
    "no-await-in-loop": "off",
    // Prevent people from re-defining names like "Date", "Error", etc.
    "no-shadow": [
      "error",
      {
        builtinGlobals: true,
        hoist: "all",
        // Some of those are here: https://www.w3schools.com/js/js_reserved.asp
        // But we will allow for productivity.
        allow: [
          "Text",
          "id",
          "type",
          "crypto",
          "event",
          "Event",
          "parent",
          "name",
          "assert",
          "expect",
          "server",
          "context",
          "status",
          "form",
          "test",
        ],
      },
    ],
    // It's ok
    "no-else-return": "off",
    // Because some external APIs do not use camelCase
    "dot-notation": "off",
    // It's ok to not use destructuring sometimes
    "prefer-destructuring": "off",
    // Allow for-of
    "no-restricted-syntax": ["error", "LabeledStatement", "WithStatement"],
    // Allow creating promises
    "promise/avoid-new": "off",
    // Prefer `await fetch()` over `fetch().then()`
    "promise/prefer-await-to-then": "warn",
    // Do not enforce lodash
    "lodash/prefer-lodash-method": "off",
    // Allow any use of paths
    "lodash/path-style": "off",
    // Not required
    "lodash/prefer-constant": "off",
    // Not required
    "lodash/import-scope": "off",
  },
};
