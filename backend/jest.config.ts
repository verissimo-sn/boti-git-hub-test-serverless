import { pathsToModuleNameMapper } from 'ts-jest';

import { compilerOptions } from './tsconfig.paths.json';

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'src'],
  modulePaths: ['node_modules', '<rootDir>'],
  testMatch: ['**/?(*.)+(spec|test).ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  testTimeout: 30000,
};
