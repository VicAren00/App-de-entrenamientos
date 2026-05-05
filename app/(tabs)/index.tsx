import { StyleSheet, View, Text, ScrollView, TouchableOpacity, useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';
import { mockWorkouts, mockUser } from '@/data/mockData';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const lastWorkout = mockWorkouts[0];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.greeting, { color: theme.text }]}>Hola, {mockUser.name}</Text>
        <Text style={[styles.subtitle, { color: theme.cardSecondaryText }]}>¡Listo para entrenar?</Text>
      </View>

      {/* Tarjeta Último Entrenamiento */}
      <TouchableOpacity style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]} onPress={() => router.push('/history')}>
        <View style={styles.cardHeader}>
          <Ionicons name="barbell" size={20} color={theme.tint} />
          <Text style={[styles.cardTitle, { color: theme.cardText }]}>Último Entrenamiento</Text>
        </View>
        <Text style={[styles.cardContent, { color: theme.text }]}>{lastWorkout.title}</Text>
        <Text style={[styles.cardSubContent, { color: theme.cardSecondaryText }]}>{lastWorkout.date}</Text>
      </TouchableOpacity>

      {/* Tarjeta Descanso Actual */}
      <TouchableOpacity style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]} onPress={() => router.push('/rest')}>
        <View style={styles.cardHeader}>
          <Ionicons name="timer" size={20} color={theme.tint} />
          <Text style={[styles.cardTitle, { color: theme.cardText }]}>Estado de Descanso</Text>
        </View>
        <Text style={[styles.cardContent, { color: theme.text }]}>{mockUser.currentRest.status}</Text>
        <Text style={[styles.cardSubContent, { color: theme.cardSecondaryText }]}>Próximo: {mockUser.currentRest.nextWorkout}</Text>
      </TouchableOpacity>

      {/* Atajos */}
      <Text style={[styles.sectionTitle, { color: theme.text }]}>Acciones Rápidas</Text>
      <View style={styles.quickActions}>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.primaryButton }]} onPress={() => router.push('/train')}>
          <Ionicons name="play" size={24} color={theme.primaryButtonText} />
          <Text style={[styles.actionText, { color: theme.primaryButtonText }]}>Iniciar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.card, borderWidth: 1, borderColor: theme.border }]} onPress={() => router.push('/exercises')}>
          <Ionicons name="library" size={24} color={theme.tint} />
          <Text style={[styles.actionText, { color: theme.cardText }]}>Ejercicios</Text>
        </TouchableOpacity>
      </View>
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
    marginTop: 8,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 4,
  },
  card: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  cardContent: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardSubContent: {
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 16,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  actionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
