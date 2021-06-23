module.exports = {
  // coverageReporters: ['text', 'cobertura', 'lcov'],
  collectCoverageFrom: ['./src/lib/**/*.ts'],
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleDirectories: ['./node_modules', './'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  moduleNameMapper: {},
  reporters: ['default', 'jest-junit'],
  transform: {
      "^.+\\.(ts|tsx|js|jsx)?$": "ts-jest" ,
    },
  testMatch: ['<rootDir>/**/*.test.{ts,tsx,js}'],
  modulePathIgnorePatterns: ['<rootDir>/node_modules', '<rootDir>/dist'],
  restoreMocks: true,
  clearMocks: true,
  resetMocks: true,
}
