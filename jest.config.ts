export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'src'],
  modulePaths: ['node_modules', '<rootDir>'],
  testMatch: ['**/?(*.)+(spec|test).ts'],
};
