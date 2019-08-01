// @ts-check

/** @type {jest.InitialOptions} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverageFrom: [`src/**/*.{ts,tsx}`, `!src/index.ts`],
}
