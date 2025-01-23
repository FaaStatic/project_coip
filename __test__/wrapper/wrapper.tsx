import { RealmProvider } from '@realm/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export const Wrapper = ({ children, realm, queryClient }) => (
  <RealmProvider realm={realm}>
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider
        initialMetrics={{
          frame: { x: 0, y: 0, width: 0, height: 0 },
          insets: { top: 0, left: 0, right: 0, bottom: 0 },
        }}
      >
        <KeyboardProvider>{children}</KeyboardProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  </RealmProvider>
);
