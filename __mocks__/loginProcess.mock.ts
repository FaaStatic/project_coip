import { jest } from '@jest/globals';

jest.mock('@untr/apps-coip/util/loginProcess.util', () => ({
  loginProcess: jest.fn(() => ({
    mutate: jest.fn(),
  })),
}));
