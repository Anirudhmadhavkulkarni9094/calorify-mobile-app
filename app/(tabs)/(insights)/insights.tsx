import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StyleSheet } from 'react-native';

export default function InsightsScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Insights</ThemedText>

      <ThemedView style={styles.card}>
        <ThemedText type="defaultSemiBold">Daily Average</ThemedText>
        <ThemedText>Calories: 1,980 kcal</ThemedText>
        <ThemedText>Protein: 92 g</ThemedText>
      </ThemedView>

      <ThemedView style={styles.card}>
        <ThemedText type="defaultSemiBold">Weekly Progress</ThemedText>
        <ThemedText>🔥 Consistency: 5 / 7 days</ThemedText>
        <ThemedText>📉 Weight trend: −0.8 kg</ThemedText>
      </ThemedView>

      <ThemedView style={styles.card}>
        <ThemedText type="defaultSemiBold">Habits</ThemedText>
        <ThemedText>🥗 Balanced meals: 72%</ThemedText>
        <ThemedText>💧 Hydration goal met: 4 days</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 16,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.04)',
    gap: 6,
  },
});
