module.exports = {
    preset: "ts-jest",
    testEnvironment: "jest-environment-jsdom",
    roots: ["<rootDir>"],
    testRegex: "(/src/.*|(\\.|/)(test|spec))\\.(ts|tsx|js|jsx)?$",
    transform: {
      "^.+\\.(ts|tsx|js|jsx)$": "ts-jest",
    },
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    modulePathIgnorePatterns: ["<rootDir>/node_modules/"]
  };