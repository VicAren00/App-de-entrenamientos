import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, useColorScheme, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { loadWorkouts, Workout } from '@/utils/storage';

export default function HistoryDetailScreen() {
  const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  
  const [workout, setWorkout] = useState<Workout | null>(null);

  useEffect(() => {
    const fetchWorkout = async () => {
      const workouts = await loadWorkouts();
      const found = workouts.find(w => w.id === id);
      setWorkout(found || null);
    };
    fetchWorkout();
  }, [id]);

  if (!workout) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background, justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: theme.text }}>Cargando...</Text>
      </View>
    );
  }

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) + ', ' + date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
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

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>{workout.title}</Text>
        <Text style={[styles.date, { color: theme.cardSecondaryText }]}>{formatDate(workout.date)}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={[styles.statBox, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Ionicons name="time-outline" size={24} color={theme.tint} />
          <Text style={[styles.statValue, { color: theme.text }]}>{formatDuration(workout.duration)}</Text>
          <Text style={[styles.statLabel, { color: theme.cardSecondaryText }]}>Tiempo</Text>
        </View>
        <View style={[styles.statBox, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Ionicons name="barbell-outline" size={24} color={theme.tint} />
          <Text style={[styles.statValue, { color: theme.text }]}>{calculateVolume(workout)}</Text>
          <Text style={[styles.statLabel, { color: theme.cardSecondaryText }]}>Volumen</Text>
        </View>
      </View>

      <Text style={[styles.sectionTitle, { color: theme.text }]}>Ejercicios Realizados</Text>
      
      {workout.exercises.map((exercise, index) => (
        <View key={exercise.id} style={[styles.exerciseCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.exerciseName, { color: theme.text }]}>{index + 1}. {exercise.name}</Text>
          
          <View style={[styles.tableHeader, { borderBottomColor: theme.border }]}>
            <Text style={[styles.colSet, { color: theme.cardSecondaryText }]}>Set</Text>
            <Text style={[styles.colKg, { color: theme.cardSecondaryText }]}>kg</Text>
            <Text style={[styles.colReps, { color: theme.cardSecondaryText }]}>Reps</Text>
          </View>

          {exercise.sets.map((set, setIndex) => (
            <View key={set.id} style={styles.row}>
              <Text style={[styles.colSet, { color: theme.text }]}>{setIndex + 1}</Text>
              <Text style={[styles.colKg, { color: theme.text }]}>{set.weight}</Text>
              <Text style={[styles.colReps, { color: theme.text }]}>{set.reps}</Text>
            </View>
          ))}
        </View>
      ))}

      <TouchableOpacity 
        style={[styles.closeButton, { backgroundColor: theme.primaryButton }]}
        onPress={() => router.back()}
      >
        <Text style={[styles.closeButtonText, { color: theme.primaryButtonText }]}>Cerrar Detalle</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  date: {
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 24,
  },
  statBox: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  exerciseCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingBottom: 8,
    borderBottomWidth: 1,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 6,
  },
  colSet: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '500',
  },
  colKg: {
    flex: 2,
    textAlign: 'center',
  },
  colReps: {
    flex: 2,
    textAlign: 'center',
  },
  closeButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 40,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
