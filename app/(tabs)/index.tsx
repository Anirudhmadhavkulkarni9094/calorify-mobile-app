import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useNavigation } from 'expo-router';
import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

/* ---------- Constants ---------- */

const COVER_HEIGHT = 260;

/* ---------- Goal Config ---------- */

type Goal = 'muscle' | 'run' | 'weight';

const GOAL_CONFIG: Record<
  Goal,
  {
    title: string;
    subtitle: string;
    image: any;
  }
> = {
  muscle: {
    title: 'Build Muscle',
    subtitle: 'High protein. Progressive overload.',
    image: require('@/assets/images/goal-muscle.png'),
  },
  run: {
    title: 'Improve Endurance',
    subtitle: 'Fuel runs. Recover better.',
    image: require('@/assets/images/goal-run.png'),
  },
  weight: {
    title: 'Lose Weight',
    subtitle: 'Calorie balance. Sustainable habits.',
    image: require('@/assets/images/goal-weight.png'),
  },
};

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const userGoal: Goal = 'muscle';
  const goal = GOAL_CONFIG[userGoal];

  /* ---------- THEME COLORS ---------- */
  const background = useThemeColor({}, 'background');
  const card = useThemeColor({}, 'card');
  const muted = useThemeColor({}, 'textMuted');
  const accent = useThemeColor({}, 'accent');

  const [coverUri, setCoverUri] = useState<string | null>(null);

  const pickCoverImage = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      aspect: [3, 2],
      allowsEditing: true,
    });

    if (!result.canceled) {
      setCoverUri(result.assets[0].uri);
    }
  };

  return (
    <ThemedView style={[styles.root, { backgroundColor: background }]}>
      {/* ---------- FIXED COVER ---------- */}
      <Pressable onPress={pickCoverImage}>
        <ThemedView style={styles.cover}>
          <Image
            source={coverUri ? { uri: coverUri } : goal.image}
            style={styles.coverImage}
            contentFit="cover"
          />

          <LinearGradient
            colors={[
              'rgba(0,0,0,0.45)',
              'rgba(0,0,0,0.15)',
              'rgba(0,0,0,0.45)',
            ]}
            style={StyleSheet.absoluteFill}
          />
        </ThemedView>
      </Pressable>

      {/* ---------- FIXED HAMBURGER ---------- */}
      <Pressable
        style={styles.menuButton}
        onPress={() => navigation.openDrawer()}
      >
        <Ionicons name="menu" size={24} color="#fff" />
      </Pressable>

      {/* ---------- SCROLLABLE CONTENT ---------- */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: COVER_HEIGHT - 32 },
        ]}
      >
        <ThemedView
          style={[
            styles.contentCard,
            { backgroundColor: background },
          ]}
        >
          {/* Greeting */}
          <ThemedText style={styles.greeting}>
            Good evening
          </ThemedText>
          <ThemedText style={[styles.date, { color: muted }]}>
            Let’s stay consistent today 💪
          </ThemedText>

          {/* Goal */}
          <ThemedView style={styles.header}>
            <ThemedText type="title">{goal.title}</ThemedText>
            <ThemedText
              style={[styles.subtitle, { color: muted }]}
            >
              {goal.subtitle}
            </ThemedText>
          </ThemedView>

          {/* CTA */}
          <Link href="/log" asChild>
            <Pressable
              style={({ pressed }) => [
                styles.primaryButton,
                {
                  backgroundColor: accent,
                  opacity: pressed ? 0.85 : 1,
                },
              ]}
            >
              <Ionicons
                name="add-circle-outline"
                size={20}
                color="#fff"
              />
              <ThemedText
                type="defaultSemiBold"
                style={styles.primaryButtonText}
              >
                Log Today’s Meal
              </ThemedText>
            </Pressable>
          </Link>

          {/* Progress */}
          <SectionHeader title="Today’s Progress" />

          <ThemedView style={styles.statsRow}>
            <StatCard
              icon="flame-outline"
              title="Calories"
              value="1,420"
              subtitle="of 2,200 kcal"
              card={card}
              muted={muted}
              accent={accent}
            />
            <StatCard
              icon="nutrition-outline"
              title="Protein"
              value="82g"
              subtitle="of 130g"
              card={card}
              muted={muted}
              accent={accent}
            />
            <StatCard
              icon="walk-outline"
              title="Steps"
              value="9,800"
              subtitle="goal 10k"
              card={card}
              muted={muted}
              accent={accent}
            />
          </ThemedView>

          {/* Insight */}
          <ThemedView
            style={[
              styles.insightCard,
              { backgroundColor: card },
            ]}
          >
            <Ionicons
              name="sparkles-outline"
              size={18}
              color={accent}
            />
            <ThemedText style={styles.insightText}>
              You’re a bit low on protein today. Adding a
              high-protein dinner will help hit your muscle
              goal.
            </ThemedText>
          </ThemedView>

          {/* Recent */}
          <SectionHeader title="Recent Activity" />

          <ThemedView
            style={[
              styles.activityCard,
              { backgroundColor: card },
            ]}
          >
            <Ionicons
              name="restaurant-outline"
              size={20}
              color={accent}
            />
            <ThemedView>
              <ThemedText>Chicken & Rice</ThemedText>
              <ThemedText
                style={[styles.activityMeta, { color: muted }]}
              >
                Lunch • 620 kcal • 2h ago
              </ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

/* ---------- Components ---------- */

function SectionHeader({ title }: { title: string }) {
  return (
    <ThemedView style={styles.sectionHeader}>
      <ThemedText type="defaultSemiBold">
        {title}
      </ThemedText>
    </ThemedView>
  );
}

function StatCard({
  title,
  value,
  subtitle,
  icon,
  card,
  muted,
  accent,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  card: string;
  muted: string;
  accent: string;
}) {
  return (
    <ThemedView
      style={[styles.statCard, { backgroundColor: card }]}
    >
      <Ionicons name={icon} size={18} color={accent} />
      <ThemedText style={styles.statValue}>
        {value}
      </ThemedText>
      <ThemedText style={[styles.statLabel, { color: muted }]}>
        {title}
      </ThemedText>
      <ThemedText style={[styles.statSub, { color: muted }]}>
        {subtitle}
      </ThemedText>
    </ThemedView>
  );
}

/* ---------- Styles ---------- */

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  cover: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: COVER_HEIGHT,
  },

  coverImage: {
    width: '100%',
    height: '100%',
  },

  menuButton: {
    position: 'absolute',
    top: 52,
    left: 16,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.55)',
    padding: 10,
    borderRadius: 16,
  },

  scrollContent: {
    paddingBottom: 120,
  },

  contentCard: {
    paddingHorizontal: 20,
    paddingTop: 32,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },

  greeting: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },

  date: {
    fontSize: 13,
    marginBottom: 16,
  },

  header: {
    gap: 4,
    marginBottom: 20,
  },

  subtitle: {
    fontSize: 14,
  },

  primaryButton: {
    paddingVertical: 18,
    borderRadius: 18,
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    marginBottom: 28,
  },

  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
  },

  sectionHeader: {
    marginBottom: 12,
  },

  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },

  statCard: {
    flex: 1,
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: 'center',
  },

  statValue: {
    fontSize: 22,
    fontWeight: '600',
    marginVertical: 4,
  },

  statLabel: {
    fontSize: 12,
  },

  statSub: {
    fontSize: 11,
  },

  insightCard: {
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    gap: 12,
    marginBottom: 28,
  },

  insightText: {
    fontSize: 14,
    lineHeight: 20,
  },

  activityCard: {
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },

  activityMeta: {
    fontSize: 12,
  },
});
