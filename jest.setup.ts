import { jest } from '@jest/globals';
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';

jest.mock('zustand', () => ({
  useStore: jest.fn(),
}));

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
}));

jest.mock('react-native-keyboard-controller', () =>
  require('react-native-keyboard-controller/jest')
);

jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);

jest.mock('react-native-screenguard', () => ({
  registerWithoutEffect: jest.fn(),
}));

jest.mock('realm');

jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
  router: {
    push: jest.fn(),
  },
}));
