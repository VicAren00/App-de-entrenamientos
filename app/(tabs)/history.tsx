import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';
import { mockWorkouts } from '@/data/mockData';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function HistoryScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const renderItem = ({ item }: { item: typeof mockWorkouts[0] }) => (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}
      onPress={() => router.push(`/history-detail?id=${item.id}`)}
    >
      <View style={styles.cardHeader}>
        <Text style={[styles.title, { color: theme.cardText }]}>{item.title}</Text>
        <Ionicons name="chevron-forward" size={20} color={theme.icon} />
      </View>
      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Ionicons name="calendar-outline" size={16} color={theme.cardSecondaryText} />
          <Text style={[styles.statText, { color: theme.cardSecondaryText }]}>{item.date}</Text>
        </View>
        <View style={styles.stat}>
          <Ionicons name="time-outline" size={16} color={theme.cardSecondaryText} />
          <Text style={[styles.statText, { color: theme.cardSecondaryText }]}>{item.duration}</Text>
        </View>
      </View>
      <View style={styles.statsRow}>
        <Text style={[styles.statSubText, { color: theme.cardSecondaryText }]}>{item.exercises} ejercicios</Text>
        <Text style={[styles.statSubText, { color: theme.cardSecondaryText }]}>Vol: {item.volume}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={mockWorkouts}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 16,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 14,
    fontWeight: '500',
  },
  statSubText: {
    fontSize: 13,
  },
});
