import { Ionicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
import 'react-native-gesture-handler';

import { ThemeToggle } from '@/components/ThemeToggle';
import { useThemeMode } from '@/hooks/useThemeMode';

export default function RootLayout() {
  const { colorScheme } = useThemeMode();

  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor:
          colorScheme === 'dark' ? '#90CAF9' : '#43A047',
        drawerStyle: {
          backgroundColor:
            colorScheme === 'dark' ? '#121212' : '#FFFFFF',
        },
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: 'Home',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="insights"
        options={{
          drawerLabel: 'Insights',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="bar-chart-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="history"
        options={{
          drawerLabel: 'Meal History',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="time-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: 'Settings',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Theme Toggle (non-navigational) */}
      <Drawer.Screen
        name="theme"
        options={{
          drawerLabel: () => <ThemeToggle />,
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="contrast-outline"
              size={size}
              color={color}
            />
          ),
        }}
        listeners={{
          drawerItemPress: e => e.preventDefault(),
        }}
      />
    </Drawer>
  );
}
