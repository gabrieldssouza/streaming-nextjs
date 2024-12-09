module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  roots: ["<rootDir>"],
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  modulePathIgnorePatterns: ["<rootDir>/node_modules/"],
  testMatch: ["<rootDir>/src/**/__tests__/**/*.[jt]s?(x)", "<rootDir>/src/**/*.(spec|test).[tj]s?(x)"],
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
};