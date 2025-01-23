import { useColorScheme as useNativewindColorScheme } from 'nativewind';

export function useColorScheme() {
  const { setColorScheme, toggleColorScheme } = useNativewindColorScheme();
  return {
    colorScheme: 'light',
    isDarkColorScheme: false,
    setColorScheme,
    toggleColorScheme,
  };
}
