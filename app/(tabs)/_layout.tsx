import { Tabs } from 'expo-router';
import React from 'react';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const activeColors = Colors[colorScheme ?? 'light'];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeColors.tint,
        tabBarInactiveTintColor: activeColors.tabIconDefault,
        headerShown: true,
        tabBarStyle: {
          backgroundColor: activeColors.background,
          borderTopColor: activeColors.border,
          height: 60,
          paddingBottom: 10,
        },
        headerStyle: {
          backgroundColor: activeColors.background,
          shadowColor: 'transparent', // iOS
          elevation: 0, // Android
          borderBottomWidth: 1,
          borderBottomColor: activeColors.border,
        },
        headerTintColor: activeColors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="train"
        options={{
          title: 'Entrenar',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'barbell' : 'barbell-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'Historial',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'time' : 'time-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="rest"
        options={{
          title: 'Descanso',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'timer' : 'timer-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="exercises"
        options={{
          title: 'Ejercicios',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'library' : 'library-outline'} color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}
