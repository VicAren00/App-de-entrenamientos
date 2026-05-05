import React from 'react';
import { StyleSheet, View, Text, ScrollView, useColorScheme, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { mockWorkouts, mockTrainSession } from '@/data/mockData';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function HistoryDetailScreen() {
  const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  
  const workout = mockWorkouts.find(w => w.id === id) || mockWorkouts[0];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>{workout.title}</Text>
        <Text style={[styles.date, { color: theme.cardSecondaryText }]}>{workout.date}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={[styles.statBox, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Ionicons name="time-outline" size={24} color={theme.tint} />
          <Text style={[styles.statValue, { color: theme.text }]}>{workout.duration}</Text>
          <Text style={[styles.statLabel, { color: theme.cardSecondaryText }]}>Tiempo</Text>
        </View>
        <View style={[styles.statBox, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Ionicons name="barbell-outline" size={24} color={theme.tint} />
          <Text style={[styles.statValue, { color: theme.text }]}>{workout.volume}</Text>
          <Text style={[styles.statLabel, { color: theme.cardSecondaryText }]}>Volumen</Text>
        </View>
      </View>

      <Text style={[styles.sectionTitle, { color: theme.text }]}>Ejercicios Realizados</Text>
      
      {mockTrainSession.exercises.map((exercise, index) => (
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
