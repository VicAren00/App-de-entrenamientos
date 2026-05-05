import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { loadWorkouts, Workout } from '@/utils/storage';

export default function HistoryScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const data = await loadWorkouts();
      setWorkouts(data);
    };
    fetchWorkouts();
  }, []);

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const timeString = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

    if (diffDays === 0) return `Hoy, ${timeString}`;
    if (diffDays === 1) return `Ayer, ${timeString}`;
    if (diffDays < 7) return `Hace ${diffDays} días, ${timeString}`;
    return date.toLocaleDateString('es-ES') + ', ' + timeString;
  };

  const formatDuration = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (hrs > 0) return `${hrs}h ${mins}m`;
    return `${mins}m`;
  };

  const calculateVolume = (workout: Workout) => {
    let total = 0;
    workout.exercises.forEach(ex => {
      ex.sets.forEach(set => {
        if (set.completed) {
          const weight = parseFloat(set.weight) || 0;
          const reps = parseInt(set.reps) || 0;
          total += weight * reps;
        }
      });
    });
    return total.toLocaleString() + ' kg';
  };

  const renderItem = ({ item }: { item: Workout }) => (
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
          <Text style={[styles.statText, { color: theme.cardSecondaryText }]}>{formatDate(item.date)}</Text>
        </View>
        <View style={styles.stat}>
          <Ionicons name="time-outline" size={16} color={theme.cardSecondaryText} />
          <Text style={[styles.statText, { color: theme.cardSecondaryText }]}>{formatDuration(item.duration)}</Text>
        </View>
      </View>
      <View style={styles.statsRow}>
        <Text style={[styles.statSubText, { color: theme.cardSecondaryText }]}>{item.exercises.length} ejercicios</Text>
        <Text style={[styles.statSubText, { color: theme.cardSecondaryText }]}>Vol: {calculateVolume(item)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={workouts}
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
