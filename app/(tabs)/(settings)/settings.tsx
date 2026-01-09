import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StyleSheet } from 'react-native';

function SettingItem({ title, value }: { title: string; value?: string }) {
  return (
    <ThemedView style={styles.item}>
      <ThemedText>{title}</ThemedText>
      {value && <ThemedText style={styles.value}>{value}</ThemedText>}
    </ThemedView>
  );
}

export default function SettingsScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Settings</ThemedText>

      <ThemedView style={styles.section}>
        <SettingItem title="Daily Calorie Goal" value="2,200 kcal" />
        <SettingItem title="Protein Goal" value="120 g" />
        <SettingItem title="Weight Unit" value="kg" />
      </ThemedView>

      <ThemedView style={styles.section}>
        <SettingItem title="Notifications" value="Enabled" />
        <SettingItem title="Theme" value="System" />
      </ThemedView>

      <ThemedView style={styles.section}>
        <SettingItem title="Privacy Policy" />
        <SettingItem title="Log out" />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 20,
  },
  section: {
    gap: 10,
  },
  item: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.04)',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  value: {
    opacity: 0.6,
  },
});
