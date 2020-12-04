module.exports = {
  verbose: true,
  roots: [
    "<rootDir>/tests"
  ],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(?!lodash-es)"
  ],
  moduleNameMapper: {
    "^lodash-es(.*)": "lodash$1",
    "^config$": "<rootDir>/config"
  },
  setupFiles: ["<rootDir>/tests/mock-localstorage.ts"],
}
