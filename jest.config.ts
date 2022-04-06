module.exports = {
  roots: ['<rootDir>/src'],
  // collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  coverageProvider: 'babel',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
