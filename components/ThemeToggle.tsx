import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useThemeMode } from '@/hooks/useThemeMode';

export function ThemeToggle() {
  const { mode, setMode } = useThemeMode();

  return (
    <View style={styles.row}>
      <ThemedText>Theme</ThemedText>

      <View style={styles.actions}>
        <Option
          icon="sunny-outline"
          active={mode === 'light'}
          onPress={() => setMode('light')}
        />
        <Option
          icon="moon-outline"
          active={mode === 'dark'}
          onPress={() => setMode('dark')}
        />
        <Option
          icon="desktop-outline"
          active={mode === 'system'}
          onPress={() => setMode('system')}
        />
      </View>
    </View>
  );
}

function Option({
  icon,
  active,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.option,
        active && styles.active,
      ]}
    >
      <Ionicons name={icon} size={16} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },

  actions: {
    flexDirection: 'row',
    gap: 8,
  },

  option: {
    padding: 6,
    borderRadius: 8,
    opacity: 0.5,
  },

  active: {
    opacity: 1,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
});
