import { useColorScheme } from 'react-native';

export type ThemeMode = 'light' | 'dark' | 'system';

let currentMode: ThemeMode = 'system';

export function useThemeMode() {
  const systemScheme = useColorScheme();

  const colorScheme =
    currentMode === 'system'
      ? systemScheme
      : currentMode;

  function setMode(mode: ThemeMode) {
    currentMode = mode;
  }

  return {
    mode: currentMode,
    colorScheme,
    setMode,
  };
}
