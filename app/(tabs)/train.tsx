import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput, useColorScheme, Alert, FlatList } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { saveWorkout } from '@/utils/storage';
import { workoutTemplates } from '@/data/mockData';

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

interface WorkoutTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  exercises: Array<{
    name: string;
    sets: number;
    reps: number | string;
    weight: number;
  }>;
}

type Screen = 'templates' | 'training';

export default function TrainScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  
  const [screen, setScreen] = useState<Screen>('templates');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [timer, setTimer] = useState(0);
  const [isTraining, setIsTraining] = useState(false);
  const [trainingTitle, setTrainingTitle] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<WorkoutTemplate | null>(null);

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

  const loadTemplate = (template: WorkoutTemplate) => {
    setSelectedTemplate(template);
    setTrainingTitle(template.name);
    
    const newExercises = template.exercises.map((ex, index) => ({
      id: `ex-${index}-${Date.now()}`,
      name: ex.name,
      sets: Array.from({ length: ex.sets }, (_, i) => ({
        id: `set-${i}-${Date.now()}`,
        reps: ex.reps.toString(),
        weight: ex.weight.toString(),
        completed: false,
      })),
    }));
    
    setExercises(newExercises);
    setScreen('training');
    setIsTraining(true);
  };

  // Free training option removed — templates must be used to start a session

  const addExercise = () => {
    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: '',
      sets: [{ id: Date.now().toString() + '-s', reps: '', weight: '', completed: false }]
    };
    setExercises([...exercises, newExercise]);
  };

  const removeExercise = (exerciseId: string) => {
    setExercises(exercises.filter(ex => ex.id !== exerciseId));
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

  const removeSet = (exerciseId: string, setId: string) => {
    setExercises(exercises.map(ex => {
      if (ex.id === exerciseId) {
        return {
          ...ex,
          sets: ex.sets.filter(s => s.id !== setId)
        };
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

  const finishTraining = async () => {
    if (exercises.length === 0) {
      Alert.alert('Error', 'Agrega al menos un ejercicio antes de finalizar.');
      return;
    }
    
    setIsTraining(false);
    const workout = {
      id: Date.now().toString(),
      title: trainingTitle,
      date: new Date().toISOString(),
      duration: timer,
      exercises: exercises,
    };
    await saveWorkout(workout);
    Alert.alert('¡Excelente!', `"${trainingTitle}" ha sido guardado en tu historial.`);
    
    // Reset to templates
    setScreen('templates');
    setTimer(0);
    setExercises([]);
    setSelectedTemplate(null);
    setTrainingTitle('');
  };

  if (screen === 'templates') {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={[styles.templatesHeader, { borderBottomColor: theme.border }]}>
          <Text style={[styles.templatesTitle, { color: theme.text }]}>Rutinas de Entrenamiento</Text>
        </View>

        <ScrollView style={styles.templatesList}>
          {workoutTemplates.map((template) => (
            <TouchableOpacity
              key={template.id}
              style={[styles.templateCard, { backgroundColor: theme.card, borderColor: theme.border }]}
              onPress={() => loadTemplate(template)}
              activeOpacity={0.7}
            >
              <View style={styles.templateCardHeader}>
                <View
                  style={[
                    styles.templateIcon,
                    { backgroundColor: theme.tint + '20' }
                  ]}
                >
                  <Ionicons name={template.icon as any} size={28} color={theme.tint} />
                </View>
                <View style={styles.templateInfo}>
                  <Text style={[styles.templateName, { color: theme.cardText }]}>
                    {template.name}
                  </Text>
                  <Text style={[styles.templateDescription, { color: theme.cardSecondaryText }]}>
                    {template.description}
                  </Text>
                  <Text style={[styles.templateExCount, { color: theme.cardSecondaryText }]}>
                    {template.exercises.length} ejercicios
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={24}
                  color={theme.tint}
                />
              </View>
            </TouchableOpacity>
          ))}

          {/* Free training option removed */}
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <View style={styles.headerCenter}>
          <Text style={[styles.sessionTitle, { color: theme.text }]} numberOfLines={1}>
            {trainingTitle}
          </Text>
          <Text style={[styles.timer, { color: theme.tint }]}>
            {formatTime(timer)}
          </Text>
        </View>
        <TouchableOpacity 
          onPress={() => setIsTraining(!isTraining)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name={isTraining ? 'pause' : 'play'}
            size={24}
            color={theme.tint}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContent}>
        {exercises.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="barbell-outline" size={48} color={theme.icon} />
            <Text style={[styles.emptyStateText, { color: theme.text }]}>
              {selectedTemplate ? 'Listo para comenzar' : 'No hay ejercicios'}
            </Text>
            <Text style={[styles.emptyStateSubtext, { color: theme.cardSecondaryText }]}>
              {selectedTemplate
                ? 'Comienza a marcar tus series'
                : 'Comienza añadiendo un ejercicio para registrar tu progreso.'}
            </Text>
          </View>
        ) : (
          exercises.map((exercise, index) => (
            <View
              key={exercise.id}
              style={[
                styles.exerciseCard,
                { backgroundColor: theme.card, borderColor: theme.border },
              ]}
            >
              <View style={styles.exerciseHeader}>
                <Text style={[styles.exerciseIndex, { color: theme.text }]}>
                  {index + 1}.
                </Text>
                <TextInput
                  style={[styles.exerciseNameInput, { color: theme.text }]}
                  placeholder="Nombre del Ejercicio"
                  placeholderTextColor={theme.cardSecondaryText}
                  value={exercise.name}
                  onChangeText={(text) => updateExerciseName(exercise.id, text)}
                />
                <TouchableOpacity onPress={() => removeExercise(exercise.id)}>
                  <Ionicons name="close-circle" size={20} color="#ef4444" />
                </TouchableOpacity>
              </View>

              <View style={[styles.tableHeader, { borderBottomColor: theme.border }]}>
                <Text style={[styles.colSet, { color: theme.cardSecondaryText }]}>
                  Set
                </Text>
                <Text style={[styles.colKg, { color: theme.cardSecondaryText }]}>
                  kg
                </Text>
                <Text style={[styles.colReps, { color: theme.cardSecondaryText }]}>
                  Reps
                </Text>
                <Text style={[styles.colCheck, { color: theme.cardSecondaryText }]}>
                  ✓
                </Text>
              </View>

              {exercise.sets.map((set, setIndex) => (
                <View
                  key={set.id}
                  style={[
                    styles.row,
                    set.completed && { backgroundColor: theme.background },
                  ]}
                >
                  <Text style={[styles.colSet, { color: theme.text }]}>
                    {setIndex + 1}
                  </Text>
                  <View style={styles.colKg}>
                    <TextInput
                      style={[
                        styles.input,
                        {
                          color: theme.text,
                          backgroundColor: theme.background,
                        },
                      ]}
                      value={set.weight}
                      onChangeText={(val) =>
                        updateSet(exercise.id, set.id, 'weight', val)
                      }
                      keyboardType="numeric"
                      placeholder="0"
                      placeholderTextColor={theme.cardSecondaryText}
                    />
                  </View>
                  <View style={styles.colReps}>
                    <TextInput
                      style={[
                        styles.input,
                        {
                          color: theme.text,
                          backgroundColor: theme.background,
                        },
                      ]}
                      value={set.reps}
                      onChangeText={(val) =>
                        updateSet(exercise.id, set.id, 'reps', val)
                      }
                      keyboardType="numeric"
                      placeholder="0"
                      placeholderTextColor={theme.cardSecondaryText}
                    />
                  </View>
                  <View style={styles.setActions}>
                    <TouchableOpacity
                      style={[
                        styles.checkButton,
                        set.completed
                          ? { backgroundColor: theme.tint }
                          : { backgroundColor: theme.border },
                      ]}
                      onPress={() => toggleSet(exercise.id, set.id)}
                    >
                      <Ionicons
                        name="checkmark"
                        size={16}
                        color={set.completed ? '#fff' : 'transparent'}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => removeSet(exercise.id, set.id)}
                      style={styles.deleteSetButton}
                    >
                      <Ionicons name="close" size={14} color="#ef4444" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}

              <TouchableOpacity
                style={styles.addSetButton}
                onPress={() => addSet(exercise.id)}
              >
                <Ionicons name="add" size={18} color={theme.tint} />
                <Text style={[styles.addSetText, { color: theme.tint }]}>
                  Agregar serie
                </Text>
              </TouchableOpacity>
            </View>
          ))
        )}

        {exercises.length > 0 && (
          <TouchableOpacity
            style={[
              styles.addExerciseButton,
              { backgroundColor: theme.card, borderColor: theme.tint }
            ]}
            onPress={addExercise}
          >
            <Ionicons name="add-circle" size={20} color={theme.tint} />
            <Text style={[styles.addExerciseText, { color: theme.tint }]}>
              Agregar Ejercicio
            </Text>
          </TouchableOpacity>
        )}

        {exercises.length > 0 && (
          <TouchableOpacity
            style={[
              styles.finishButton,
              { backgroundColor: theme.tint }
            ]}
            onPress={finishTraining}
          >
            <Ionicons name="checkmark-done" size={20} color="#fff" />
            <Text style={[styles.finishButtonText, { color: '#fff' }]}>
              Finalizar Entrenamiento
            </Text>
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

  // Templates Screen Styles
  templatesHeader: {
    padding: 16,
    paddingTop: 20,
    borderBottomWidth: 1,
  },
  templatesTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  templatesList: {
    flex: 1,
    padding: 16,
  },
  templateCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  templateCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  templateIcon: {
    width: 60,
    height: 60,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  templateInfo: {
    flex: 1,
  },
  templateName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  templateDescription: {
    fontSize: 13,
    marginBottom: 4,
  },
  templateExCount: {
    fontSize: 12,
    fontWeight: '500',
  },

  // Training Screen Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  sessionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  timer: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
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
    gap: 8,
  },
  exerciseIndex: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  exerciseNameInput: {
    flex: 1,
    fontSize: 16,
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
    gap: 8,
  },
  colSet: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '600',
  },
  colKg: {
    flex: 1.5,
    alignItems: 'center',
  },
  colReps: {
    flex: 1.5,
    alignItems: 'center',
  },
  colCheck: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '90%',
    padding: 8,
    borderRadius: 6,
    textAlign: 'center',
    fontWeight: '500',
  },
  setActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  checkButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteSetButton: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addSetButton: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    padding: 8,
  },
  addSetText: {
    fontWeight: '600',
    fontSize: 14,
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
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 40,
    gap: 8,
  },
  finishButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
