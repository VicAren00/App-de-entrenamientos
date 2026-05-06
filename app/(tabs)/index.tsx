import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  RefreshControl,
  ActivityIndicator,
  Modal,
  TextInput,
  FlatList,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import { loadWorkouts, Workout, loadMeasurements, saveMeasurement, BodyMeasurement, deleteMeasurement } from '@/utils/storage';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const [lastWorkout, setLastWorkout] = useState<Workout | null>(null);
  const [workoutStats, setWorkoutStats] = useState({ total: 0, thisMonth: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [measurements, setMeasurements] = useState<BodyMeasurement[]>([]);

  const loadData = useCallback(async () => {
    try {
      const workouts = await loadWorkouts();
      const meas = await loadMeasurements();
      
      setMeasurements(meas);
      
      if (workouts.length > 0) {
        setLastWorkout(workouts[0]);
      } else {
        setLastWorkout(null);
      }

      // Calcular estadísticas
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      const thisMonthWorkouts = workouts.filter((w) => {
        const workoutDate = new Date(w.date);
        return workoutDate.getMonth() === currentMonth && workoutDate.getFullYear() === currentYear;
      });

      setWorkoutStats({
        total: workouts.length,
        thisMonth: thisMonthWorkouts.length,
      });
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Cargar datos cuando se enfoca la pantalla
  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  // Cargar datos inicialmente
  useEffect(() => {
    loadData();
  }, [loadData]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, [loadData]);

  const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Hoy, ' + date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    if (diffDays === 1) return 'Ayer, ' + date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    if (diffDays <= 7) return `Hace ${diffDays} días`;
    
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
  };

  const formatDuration = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (hrs > 0) return `${hrs}h ${mins}m`;
    return `${mins}m`;
  };

  const calculateVolume = (workout: Workout): number => {
    let total = 0;
    workout.exercises.forEach((ex) => {
      ex.sets.forEach((set) => {
        if (set.completed) {
          const weight = parseFloat(set.weight) || 0;
          const reps = parseInt(set.reps) || 0;
          total += weight * reps;
        }
      });
    });
    return total;
  };

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background, justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={theme.tint} />
      </View>
    );
  }

  const userName = 'Usuario';
  const userGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 18) return 'Buenas tardes';
    return 'Buenas noches';
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.tint} />}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, { color: theme.text }]}>
            {userGreeting()}, {userName}
          </Text>
          <Text style={[styles.subtitle, { color: theme.cardSecondaryText }]}>
            {workoutStats.total === 0 ? '¡Listo para entrenar?' : `${workoutStats.thisMonth} entrenamientos este mes`}
          </Text>
        </View>
        <View style={[styles.avatar, { backgroundColor: theme.tint }]}>
          <Ionicons name="person" size={28} color={colorScheme === 'dark' ? '#000' : '#fff'} />
        </View>
      </View>

      {/* Último Entrenamiento - Tarjeta Principal */}
      {lastWorkout ? (
        <TouchableOpacity
          style={[styles.lastWorkoutCard, { backgroundColor: theme.card, borderColor: theme.border }]}
          activeOpacity={0.7}
          onPress={() => router.push(`/history-detail?id=${lastWorkout.id}`)}
        >
          <View style={styles.cardBadge}>
            <Text style={styles.cardBadgeText}>ÚLTIMAS SESIÓN</Text>
          </View>

          <View style={styles.lastWorkoutHeader}>
            <View>
              <Text style={[styles.lastWorkoutTitle, { color: theme.cardText }]}>
                {lastWorkout.title}
              </Text>
              <Text style={[styles.lastWorkoutDate, { color: theme.cardSecondaryText }]}>
                {formatDate(lastWorkout.date)}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={theme.tint} />
          </View>

          <View style={styles.lastWorkoutStats}>
            <View style={styles.statItem}>
              <Ionicons name="time-outline" size={18} color={theme.tint} />
              <View>
                <Text style={[styles.statValue, { color: theme.cardText }]}>
                  {formatDuration(lastWorkout.duration)}
                </Text>
                <Text style={[styles.statLabel, { color: theme.cardSecondaryText }]}>Duración</Text>
              </View>
            </View>

            <View style={styles.statItem}>
              <Ionicons name="barbell-outline" size={18} color={theme.tint} />
              <View>
                <Text style={[styles.statValue, { color: theme.cardText }]}>
                  {calculateVolume(lastWorkout).toLocaleString()} kg
                </Text>
                <Text style={[styles.statLabel, { color: theme.cardSecondaryText }]}>Volumen</Text>
              </View>
            </View>

            <View style={styles.statItem}>
              <Ionicons name="list-outline" size={18} color={theme.tint} />
              <View>
                <Text style={[styles.statValue, { color: theme.cardText }]}>
                  {lastWorkout.exercises.length}
                </Text>
                <Text style={[styles.statLabel, { color: theme.cardSecondaryText }]}>Ejercicios</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.lastWorkoutCard, { backgroundColor: theme.card, borderColor: theme.border }]}
          activeOpacity={0.7}
          onPress={() => router.push('/train')}
        >
          <View style={styles.emptyStateContent}>
            <View style={[styles.emptyIcon, { backgroundColor: theme.background }]}>
              <Ionicons name="barbell-outline" size={40} color={theme.tint} />
            </View>
            <Text style={[styles.emptyTitle, { color: theme.cardText }]}>
              Sin historial de entrenamientos
            </Text>
            <Text style={[styles.emptySubtitle, { color: theme.cardSecondaryText }]}>
              Comienza tu primer entrenamiento hoy
            </Text>
            <TouchableOpacity style={[styles.emptyButton, { backgroundColor: theme.tint }]}>
              <Text style={[styles.emptyButtonText, { color: colorScheme === 'dark' ? '#000' : '#fff' }]}>
                Iniciar Entrenamiento
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}

      {/* Estadísticas Generales */}
      {workoutStats.total > 0 && (
        <View style={styles.statsGrid}>
          <View style={[styles.statBox, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <View style={[styles.statBoxIcon, { backgroundColor: `${theme.tint}15` }]}>
              <Ionicons name="analytics-outline" size={24} color={theme.tint} />
            </View>
            <Text style={[styles.statBoxValue, { color: theme.cardText }]}>
              {workoutStats.total}
            </Text>
            <Text style={[styles.statBoxLabel, { color: theme.cardSecondaryText }]}>
              Total Entrenamientos
            </Text>
          </View>

          <View style={[styles.statBox, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <View style={[styles.statBoxIcon, { backgroundColor: `${theme.tint}15` }]}>
              <Ionicons name="calendar-outline" size={24} color={theme.tint} />
            </View>
            <Text style={[styles.statBoxValue, { color: theme.cardText }]}>
              {workoutStats.thisMonth}
            </Text>
            <Text style={[styles.statBoxLabel, { color: theme.cardSecondaryText }]}>
              Este Mes
            </Text>
          </View>
        </View>
      )}

      {/* Secciones de Navegación */}
      <Text style={[styles.sectionTitle, { color: theme.text }]}>Acceso Rápido</Text>

      <View style={styles.navigationGrid}>
        {/* Tarjeta Entrenar */}
        <TouchableOpacity
          style={[styles.navCard, { backgroundColor: theme.card, borderColor: theme.border }]}
          onPress={() => router.push('/train')}
          activeOpacity={0.7}
        >
          <View style={[styles.navIcon, { backgroundColor: theme.tint }]}>
            <Ionicons name="play" size={24} color={colorScheme === 'dark' ? '#000' : '#fff'} />
          </View>
          <Text style={[styles.navTitle, { color: theme.cardText }]}>Entrenar</Text>
          <Text style={[styles.navSubtitle, { color: theme.cardSecondaryText }]}>Inicia una sesión</Text>
        </TouchableOpacity>

        {/* Tarjeta Historial */}
        <TouchableOpacity
          style={[styles.navCard, { backgroundColor: theme.card, borderColor: theme.border }]}
          onPress={() => router.push('/history')}
          activeOpacity={0.7}
        >
          <View style={[styles.navIcon, { backgroundColor: '#8b5cf6' }]}>
            <Ionicons name="book" size={24} color={colorScheme === 'dark' ? '#000' : '#fff'} />
          </View>
          <Text style={[styles.navTitle, { color: theme.cardText }]}>Historial</Text>
          <Text style={[styles.navSubtitle, { color: theme.cardSecondaryText }]}>
            {workoutStats.total} sesiones
          </Text>
        </TouchableOpacity>

        {/* Tarjeta Ejercicios */}
        <TouchableOpacity
          style={[styles.navCard, { backgroundColor: theme.card, borderColor: theme.border }]}
          onPress={() => router.push('/exercises')}
          activeOpacity={0.7}
        >
          <View style={[styles.navIcon, { backgroundColor: '#ec4899' }]}>
            <Ionicons name="library" size={24} color={colorScheme === 'dark' ? '#000' : '#fff'} />
          </View>
          <Text style={[styles.navTitle, { color: theme.cardText }]}>Ejercicios</Text>
          <Text style={[styles.navSubtitle, { color: theme.cardSecondaryText }]}>Biblioteca completa</Text>
        </TouchableOpacity>

        {/* Tarjeta Descanso */}
        <TouchableOpacity
          style={[styles.navCard, { backgroundColor: theme.card, borderColor: theme.border }]}
          onPress={() => router.push('/rest')}
          activeOpacity={0.7}
        >
          <View style={[styles.navIcon, { backgroundColor: '#06b6d4' }]}>
            <Ionicons name="timer" size={24} color={colorScheme === 'dark' ? '#000' : '#fff'} />
          </View>
          <Text style={[styles.navTitle, { color: theme.cardText }]}>Descanso</Text>
          <Text style={[styles.navSubtitle, { color: theme.cardSecondaryText }]}>Recuperación</Text>
        </TouchableOpacity>

        {/* Tarjeta Progreso */}
        <TouchableOpacity
          style={[styles.navCard, { backgroundColor: theme.card, borderColor: theme.border }]}
          onPress={() => setShowProgressModal(true)}
          activeOpacity={0.7}
        >
          <View style={[styles.navIcon, { backgroundColor: '#10b981' }]}>
            <Ionicons name="trending-up" size={24} color={colorScheme === 'dark' ? '#000' : '#fff'} />
          </View>
          <Text style={[styles.navTitle, { color: theme.cardText }]}>Progreso</Text>
          <Text style={[styles.navSubtitle, { color: theme.cardSecondaryText }]}>
            {measurements.length} registros
          </Text>
        </TouchableOpacity>
      </View>

      {/* Progress Modal */}
      <ProgressModal
        visible={showProgressModal}
        onClose={() => {
          setShowProgressModal(false);
          loadData();
        }}
        theme={theme}
        colorScheme={colorScheme}
        measurements={measurements}
      />

      {/* Botón Principal */}
      <TouchableOpacity
        style={[styles.mainButton, { backgroundColor: theme.tint }]}
        onPress={() => router.push('/train')}
      >
        <Ionicons name="play-circle" size={24} color={colorScheme === 'dark' ? '#000' : '#fff'} />
        <Text style={[styles.mainButtonText, { color: colorScheme === 'dark' ? '#000' : '#fff' }]}>
          Comenzar Entrenamiento
        </Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    marginBottom: 28,
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Last Workout Card
  lastWorkoutCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 1,
    overflow: 'hidden',
  },
  cardBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  cardBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    opacity: 0.7,
  },
  lastWorkoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  lastWorkoutTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  lastWorkoutDate: {
    fontSize: 13,
  },
  lastWorkoutStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 2,
  },

  // Empty State
  emptyStateContent: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  emptyIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },
  emptyButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  // Stats Grid
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 24,
  },
  statBox: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  statBoxIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statBoxValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statBoxLabel: {
    fontSize: 12,
    textAlign: 'center',
  },

  // Section Title
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },

  // Navigation Grid
  navigationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 24,
  },
  navCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  navIcon: {
    width: 52,
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  navTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  navSubtitle: {
    fontSize: 12,
    textAlign: 'center',
  },

  // Main Button
  mainButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  mainButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

// Progress Modal Component
interface ProgressModalProps {
  visible: boolean;
  onClose: () => void;
  theme: typeof Colors.light;
  colorScheme: 'light' | 'dark' | null;
  measurements: BodyMeasurement[];
}

function ProgressModal({ visible, onClose, theme, colorScheme, measurements }: ProgressModalProps) {
  const [weight, setWeight] = useState('');
  const [chest, setChest] = useState('');
  const [waist, setWaist] = useState('');
  const [hips, setHips] = useState('');
  const [notes, setNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!weight.trim()) {
      alert('Por favor ingresa tu peso');
      return;
    }

    setIsSaving(true);
    try {
      const newMeasurement: BodyMeasurement = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        weight: parseFloat(weight),
        chest: chest ? parseFloat(chest) : undefined,
        waist: waist ? parseFloat(waist) : undefined,
        hips: hips ? parseFloat(hips) : undefined,
        notes: notes || undefined,
      };

      await saveMeasurement(newMeasurement);
      resetForm();
      alert('¡Medidas guardadas correctamente!');
    } catch (error) {
      console.error('Error saving measurement:', error);
      alert('Error al guardar las medidas');
    } finally {
      setIsSaving(false);
    }
  };

  const resetForm = () => {
    setWeight('');
    setChest('');
    setWaist('');
    setHips('');
    setNotes('');
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMeasurement(id);
      alert('Medida eliminada');
    } catch (error) {
      console.error('Error deleting measurement:', error);
    }
  };

  const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getWeightChange = (): { change: number; percentage: number } | null => {
    if (measurements.length < 2) return null;
    const latest = measurements[0];
    const oldest = measurements[measurements.length - 1];
    const change = latest.weight - oldest.weight;
    const percentage = ((change / oldest.weight) * 100).toFixed(1);
    return { change: parseFloat(change.toFixed(1)), percentage: parseFloat(percentage) };
  };

  const weightChange = getWeightChange();

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View
        style={[
          styles.modalContainer,
          { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
        ]}
      >
        <View
          style={[
            styles.modalContent,
            { backgroundColor: theme.card, maxHeight: '90%' },
          ]}
        >
          {/* Modal Header */}
          <View
            style={[
              styles.modalHeader,
              {
                backgroundColor: theme.background,
                borderBottomColor: theme.border,
              },
            ]}
          >
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={theme.text} />
            </TouchableOpacity>
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              Seguimiento de Progreso
            </Text>
            <View style={{ width: 24 }} />
          </View>

          {/* Modal Content */}
          <ScrollView
            style={styles.modalScroll}
            showsVerticalScrollIndicator={false}
          >
            {/* Resumen */}
            {measurements.length > 0 && (
              <View style={styles.summarySection}>
                <View
                  style={[
                    styles.summaryCard,
                    { backgroundColor: theme.background, borderColor: theme.border },
                  ]}
                >
                  <Text
                    style={[styles.summaryLabel, { color: theme.cardSecondaryText }]}
                  >
                    Peso Actual
                  </Text>
                  <Text style={[styles.summaryValue, { color: theme.text }]}>
                    {measurements[0].weight} kg
                  </Text>
                  {weightChange && (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 4,
                      }}
                    >
                      <Ionicons
                        name={
                          weightChange.change < 0
                            ? 'arrow-down'
                            : 'arrow-up'
                        }
                        size={16}
                        color={
                          weightChange.change < 0 ? '#10b981' : '#ef4444'
                        }
                      />
                      <Text
                        style={{
                          color:
                            weightChange.change < 0
                              ? '#10b981'
                              : '#ef4444',
                          marginLeft: 4,
                          fontSize: 12,
                          fontWeight: '600',
                        }}
                      >
                        {Math.abs(weightChange.change)} kg (
                        {Math.abs(weightChange.percentage)}%)
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            )}

            {/* Formulario */}
            <View style={styles.formSection}>
              <Text
                style={[styles.sectionLabel, { color: theme.text }]}
              >
                Nuevo Registro
              </Text>

              <View style={styles.formGroup}>
                <Text
                  style={[
                    styles.inputLabel,
                    { color: theme.text },
                  ]}
                >
                  Peso (kg) *
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: theme.background,
                      color: theme.text,
                      borderColor: theme.border,
                    },
                  ]}
                  placeholder="Ej: 75.5"
                  placeholderTextColor={theme.cardSecondaryText}
                  value={weight}
                  onChangeText={setWeight}
                  keyboardType="decimal-pad"
                />
              </View>

              <View style={styles.formRow}>
                <View style={[styles.formGroup, { flex: 1 }]}>
                  <Text
                    style={[
                      styles.inputLabel,
                      { color: theme.text },
                    ]}
                  >
                    Pecho (cm)
                  </Text>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        backgroundColor: theme.background,
                        color: theme.text,
                        borderColor: theme.border,
                      },
                    ]}
                    placeholder="Ej: 100"
                    placeholderTextColor={theme.cardSecondaryText}
                    value={chest}
                    onChangeText={setChest}
                    keyboardType="decimal-pad"
                  />
                </View>
                <View style={[styles.formGroup, { flex: 1, marginLeft: 12 }]}>
                  <Text
                    style={[
                      styles.inputLabel,
                      { color: theme.text },
                    ]}
                  >
                    Cintura (cm)
                  </Text>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        backgroundColor: theme.background,
                        color: theme.text,
                        borderColor: theme.border,
                      },
                    ]}
                    placeholder="Ej: 80"
                    placeholderTextColor={theme.cardSecondaryText}
                    value={waist}
                    onChangeText={setWaist}
                    keyboardType="decimal-pad"
                  />
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text
                  style={[
                    styles.inputLabel,
                    { color: theme.text },
                  ]}
                >
                  Cadera (cm)
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: theme.background,
                      color: theme.text,
                      borderColor: theme.border,
                    },
                  ]}
                  placeholder="Ej: 95"
                  placeholderTextColor={theme.cardSecondaryText}
                  value={hips}
                  onChangeText={setHips}
                  keyboardType="decimal-pad"
                />
              </View>

              <View style={styles.formGroup}>
                <Text
                  style={[
                    styles.inputLabel,
                    { color: theme.text },
                  ]}
                >
                  Notas
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    styles.textArea,
                    {
                      backgroundColor: theme.background,
                      color: theme.text,
                      borderColor: theme.border,
                    },
                  ]}
                  placeholder="Ej: Me siento con más energía"
                  placeholderTextColor={theme.cardSecondaryText}
                  value={notes}
                  onChangeText={setNotes}
                  multiline
                  numberOfLines={3}
                />
              </View>

              <TouchableOpacity
                style={[
                  styles.saveButton,
                  {
                    backgroundColor: theme.tint,
                    opacity: isSaving ? 0.6 : 1,
                  },
                ]}
                onPress={handleSave}
                disabled={isSaving}
              >
                <Ionicons
                  name="checkmark"
                  size={20}
                  color={colorScheme === 'dark' ? '#000' : '#fff'}
                />
                <Text
                  style={[
                    styles.saveButtonText,
                    {
                      color: colorScheme === 'dark' ? '#000' : '#fff',
                    },
                  ]}
                >
                  {isSaving ? 'Guardando...' : 'Guardar Medidas'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Historial */}
            {measurements.length > 0 && (
              <View style={styles.historySection}>
                <Text
                  style={[styles.sectionLabel, { color: theme.text }]}
                >
                  Historial ({measurements.length} registros)
                </Text>

                <FlatList
                  data={measurements}
                  scrollEnabled={false}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <View
                      style={[
                        styles.historyItem,
                        {
                          backgroundColor: theme.background,
                          borderColor: theme.border,
                        },
                      ]}
                    >
                      <View style={{ flex: 1 }}>
                        <Text
                          style={[
                            styles.historyDate,
                            { color: theme.cardSecondaryText },
                          ]}
                        >
                          {formatDate(item.date)}
                        </Text>
                        <View style={styles.measurementsRow}>
                          <Text
                            style={[
                              styles.measurementValue,
                              { color: theme.text },
                            ]}
                          >
                            <Text style={{ fontWeight: 'bold' }}>
                              {item.weight}
                            </Text>{' '}
                            kg
                          </Text>
                          {item.chest && (
                            <Text
                              style={[
                                styles.measurementValue,
                                { color: theme.text },
                              ]}
                            >
                              P: {item.chest} cm
                            </Text>
                          )}
                          {item.waist && (
                            <Text
                              style={[
                                styles.measurementValue,
                                { color: theme.text },
                              ]}
                            >
                              C: {item.waist} cm
                            </Text>
                          )}
                          {item.hips && (
                            <Text
                              style={[
                                styles.measurementValue,
                                { color: theme.text },
                              ]}
                            >
                              Ca: {item.hips} cm
                            </Text>
                          )}
                        </View>
                        {item.notes && (
                          <Text
                            style={[
                              styles.historyNotes,
                              { color: theme.cardSecondaryText },
                            ]}
                          >
                            {item.notes}
                          </Text>
                        )}
                      </View>
                      <TouchableOpacity
                        onPress={() => handleDelete(item.id)}
                        style={styles.deleteButton}
                      >
                        <Ionicons
                          name="trash-outline"
                          size={18}
                          color="#ef4444"
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                />
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

// Additional styles for modal
const modalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  modalScroll: {
    padding: 16,
  },
  summarySection: {
    marginBottom: 24,
  },
  summaryCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  summaryValue: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 8,
  },
  formSection: {
    marginBottom: 24,
  },
  historySection: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  formGroup: {
    marginBottom: 16,
  },
  formRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    fontSize: 14,
  },
  textArea: {
    minHeight: 80,
    paddingTop: 10,
    textAlignVertical: 'top',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  historyItem: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  historyDate: {
    fontSize: 12,
    marginBottom: 6,
  },
  measurementsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  measurementValue: {
    fontSize: 13,
  },
  historyNotes: {
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 6,
  },
  deleteButton: {
    padding: 8,
  },
});

// Merge all styles
Object.assign(styles, modalStyles);
