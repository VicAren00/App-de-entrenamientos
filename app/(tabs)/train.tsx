import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput, useColorScheme, Alert } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

interface Set {
  id: string;
  reps: string;
  weight: string;
  completed: boolean;
}

interface Exercise {
  id: string;
  name: string;
  sets: Set[];
}

export default function TrainScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [timer, setTimer] = useState(0);
  const [isTraining, setIsTraining] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTraining) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTraining]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs > 0 ? hrs.toString().padStart(2, '0') + ':' : ''}${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const addExercise = () => {
    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: '',
      sets: [{ id: Date.now().toString() + '-s', reps: '', weight: '', completed: false }]
    };
    setExercises([...exercises, newExercise]);
  };

  const addSet = (exerciseId: string) => {
    setExercises(exercises.map(ex => {
      if (ex.id === exerciseId) {
        const lastSet = ex.sets[ex.sets.length - 1];
        const newSet: Set = {
          id: Date.now().toString() + '-' + Math.random(),
          reps: lastSet ? lastSet.reps : '',
          weight: lastSet ? lastSet.weight : '',
          completed: false
        };
        return { ...ex, sets: [...ex.sets, newSet] };
      }
      return ex;
    }));
  };

  const updateSet = (exerciseId: string, setId: string, field: 'reps' | 'weight', value: string) => {
    setExercises(exercises.map(ex => {
      if (ex.id === exerciseId) {
        return {
          ...ex,
          sets: ex.sets.map(s => s.id === setId ? { ...s, [field]: value } : s)
        };
      }
      return ex;
    }));
  };

  const toggleSet = (exerciseId: string, setId: string) => {
    setExercises(exercises.map(ex => {
      if (ex.id === exerciseId) {
        return {
          ...ex,
          sets: ex.sets.map(s => s.id === setId ? { ...s, completed: !s.completed } : s)
        };
      }
      return ex;
    }));
  };

  const updateExerciseName = (exerciseId: string, newName: string) => {
    setExercises(exercises.map(ex => {
      if (ex.id === exerciseId) {
        return { ...ex, name: newName };
      }
      return ex;
    }));
  };

  const finishTraining = () => {
    setIsTraining(false);
    Alert.alert('¡Excelente!', 'Entrenamiento finalizado y guardado.');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <Text style={[styles.sessionTitle, { color: theme.text }]}>Entrenamiento Libre</Text>
        <Text style={[styles.timer, { color: theme.tint }]}>{formatTime(timer)}</Text>
      </View>

      <ScrollView style={styles.scrollContent}>
        {exercises.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="barbell-outline" size={48} color={theme.icon} />
            <Text style={[styles.emptyStateText, { color: theme.text }]}>No hay ejercicios</Text>
            <Text style={[styles.emptyStateSubtext, { color: theme.cardSecondaryText }]}>Comienza añadiendo un ejercicio para registrar tu progreso.</Text>
          </View>
        ) : (
          exercises.map((exercise, index) => (
            <View key={exercise.id} style={[styles.exerciseCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
              <View style={styles.exerciseHeader}>
                <Text style={[styles.exerciseIndex, { color: theme.text }]}>{index + 1}.</Text>
                <TextInput
                  style={[styles.exerciseNameInput, { color: theme.text }]}
                  placeholder="Nombre del Ejercicio"
                  placeholderTextColor={theme.cardSecondaryText}
                  value={exercise.name}
                  onChangeText={(text) => updateExerciseName(exercise.id, text)}
                />
              </View>
              
              <View style={[styles.tableHeader, { borderBottomColor: theme.border }]}>
                <Text style={[styles.colSet, { color: theme.cardSecondaryText }]}>Set</Text>
                <Text style={[styles.colKg, { color: theme.cardSecondaryText }]}>kg</Text>
                <Text style={[styles.colReps, { color: theme.cardSecondaryText }]}>Reps</Text>
                <Text style={[styles.colCheck, { color: theme.cardSecondaryText }]}>✓</Text>
              </View>

              {exercise.sets.map((set, setIndex) => (
                <View key={set.id} style={[styles.row, set.completed && { backgroundColor: theme.background }]}>
                  <Text style={[styles.colSet, { color: theme.text }]}>{setIndex + 1}</Text>
                  <View style={styles.colKg}>
                    <TextInput 
                      style={[styles.input, { color: theme.text, backgroundColor: theme.background }]} 
                      value={set.weight}
                      onChangeText={(val) => updateSet(exercise.id, set.id, 'weight', val)}
                      keyboardType="numeric"
                      placeholder="0"
                      placeholderTextColor={theme.cardSecondaryText}
                    />
                  </View>
                  <View style={styles.colReps}>
                    <TextInput 
                      style={[styles.input, { color: theme.text, backgroundColor: theme.background }]} 
                      value={set.reps}
                      onChangeText={(val) => updateSet(exercise.id, set.id, 'reps', val)}
                      keyboardType="numeric"
                      placeholder="0"
                      placeholderTextColor={theme.cardSecondaryText}
                    />
                  </View>
                  <TouchableOpacity 
                    style={[styles.colCheck, styles.checkButton, set.completed ? { backgroundColor: theme.tint } : { backgroundColor: theme.border }]}
                    onPress={() => toggleSet(exercise.id, set.id)}
                  >
                    <Ionicons name="checkmark" size={16} color={set.completed ? '#fff' : 'transparent'} />
                  </TouchableOpacity>
                </View>
              ))}
              
              <TouchableOpacity style={styles.addSetButton} onPress={() => addSet(exercise.id)}>
                <Text style={[styles.addSetText, { color: theme.tint }]}>+ Añadir serie</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
        
        <TouchableOpacity style={[styles.addExerciseButton, { backgroundColor: theme.card, borderColor: theme.border }]} onPress={addExercise}>
          <Ionicons name="add" size={20} color={theme.tint} style={{ marginRight: 8 }} />
          <Text style={[styles.addExerciseText, { color: theme.tint }]}>Añadir Ejercicio</Text>
        </TouchableOpacity>

        {exercises.length > 0 && (
          <TouchableOpacity style={[styles.finishButton, { backgroundColor: theme.primaryButton }]} onPress={finishTraining}>
            <Text style={[styles.finishButtonText, { color: theme.primaryButtonText }]}>Finalizar Entrenamiento</Text>
          </TouchableOpacity>
        )}
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
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  exerciseCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  exerciseIndex: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
  exerciseNameInput: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    padding: 0,
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
  addExerciseButton: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    marginBottom: 20,
  },
  addExerciseText: {
    fontSize: 16,
    fontWeight: 'bold',
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
