import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StyleSheet } from 'react-native';

const MOCK_HISTORY = [
  { id: 1, meal: 'Breakfast', calories: 420, time: '9:00 AM' },
  { id: 2, meal: 'Lunch', calories: 650, time: '2:00 PM' },
  { id: 3, meal: 'Dinner', calories: 520, time: '9:00 PM' },
];

export default function HistoryScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Meal History</ThemedText>

      {MOCK_HISTORY.map(item => (
        <ThemedView key={item.id} style={styles.card}>
          <ThemedText type="defaultSemiBold">{item.meal}</ThemedText>
          <ThemedText>{item.calories} kcal</ThemedText>
          <ThemedText style={styles.time}>{item.time}</ThemedText>
        </ThemedView>
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 12,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.04)',
    gap: 4,
  },
  time: {
    opacity: 0.6,
    fontSize: 12,
  },
});
