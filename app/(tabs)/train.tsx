import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput, useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';
import { mockTrainSession } from '@/data/mockData';
import { Ionicons } from '@expo/vector-icons';

export default function TrainScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  
  // Estado local para simular la interacción visual de completar series
  const [completedSets, setCompletedSets] = useState<Record<string, boolean>>({});

  const toggleSet = (setId: string) => {
    setCompletedSets(prev => ({ ...prev, [setId]: !prev[setId] }));
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <Text style={[styles.sessionTitle, { color: theme.text }]}>{mockTrainSession.title}</Text>
        <Text style={[styles.timer, { color: theme.tint }]}>00:15:30</Text>
      </View>

      <ScrollView style={styles.scrollContent}>
        {mockTrainSession.exercises.map((exercise, index) => (
          <View key={exercise.id} style={[styles.exerciseCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.exerciseName, { color: theme.text }]}>
              {index + 1}. {exercise.name}
            </Text>
            
            <View style={[styles.tableHeader, { borderBottomColor: theme.border }]}>
              <Text style={[styles.colSet, { color: theme.cardSecondaryText }]}>Set</Text>
              <Text style={[styles.colKg, { color: theme.cardSecondaryText }]}>kg</Text>
              <Text style={[styles.colReps, { color: theme.cardSecondaryText }]}>Reps</Text>
              <Text style={[styles.colCheck, { color: theme.cardSecondaryText }]}>✓</Text>
            </View>

            {exercise.sets.map((set, setIndex) => {
              const isCompleted = completedSets[set.id] ?? set.completed;
              return (
                <View key={set.id} style={[styles.row, isCompleted && { backgroundColor: theme.background }]}>
                  <Text style={[styles.colSet, { color: theme.text }]}>{setIndex + 1}</Text>
                  <View style={styles.colKg}>
                    <TextInput 
                      style={[styles.input, { color: theme.text, backgroundColor: theme.background }]} 
                      defaultValue={set.weight.toString()}
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={styles.colReps}>
                    <TextInput 
                      style={[styles.input, { color: theme.text, backgroundColor: theme.background }]} 
                      defaultValue={set.reps.toString()}
                      keyboardType="numeric"
                    />
                  </View>
                  <TouchableOpacity 
                    style={[styles.colCheck, styles.checkButton, isCompleted ? { backgroundColor: theme.tint } : { backgroundColor: theme.border }]}
                    onPress={() => toggleSet(set.id)}
                  >
                    <Ionicons name="checkmark" size={16} color={isCompleted ? '#fff' : 'transparent'} />
                  </TouchableOpacity>
                </View>
              );
            })}
            
            <TouchableOpacity style={styles.addSetButton}>
              <Text style={[styles.addSetText, { color: theme.tint }]}>+ Añadir serie</Text>
            </TouchableOpacity>
          </View>
        ))}
        
        <TouchableOpacity style={[styles.finishButton, { backgroundColor: theme.primaryButton }]}>
          <Text style={[styles.finishButtonText, { color: theme.primaryButtonText }]}>Finalizar Entrenamiento</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  sessionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  timer: {
    fontSize: 18,
    fontWeight: '600',
  },
  scrollContent: {
    flex: 1,
    padding: 16,
  },
  exerciseCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingBottom: 8,
    borderBottomWidth: 1,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 8,
  },
  colSet: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '600',
  },
  colKg: {
    flex: 2,
    alignItems: 'center',
  },
  colReps: {
    flex: 2,
    alignItems: 'center',
  },
  colCheck: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    padding: 8,
    borderRadius: 6,
    textAlign: 'center',
    fontWeight: '500',
  },
  checkButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  addSetButton: {
    marginTop: 12,
    alignItems: 'center',
    padding: 8,
  },
  addSetText: {
    fontWeight: '600',
  },
  finishButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 40,
  },
  finishButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
