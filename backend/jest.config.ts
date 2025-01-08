module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'], // Match test files
  moduleFileExtensions: ['ts', 'js'], // Allow TypeScript files
  transform: {
    '^.+\\.ts$': 'ts-jest', // Use ts-jest for TypeScript files
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json', // Use your TypeScript configuration
    },
  },
};
