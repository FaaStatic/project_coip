import { jest } from '@jest/globals';

jest.mock('@untr/apps-coip/api/loginApp/hooks/account/useAccountLoginHook', () => ({
  useAccountLoginHook: jest.fn(() => ({
    mutate: jest.fn(),
  })),
}));
