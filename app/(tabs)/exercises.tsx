import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  ScrollView,
  Modal,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { mockExercisesLibrary } from '@/data/mockData';
import { Ionicons } from '@expo/vector-icons';

type Exercise = (typeof mockExercisesLibrary)[0];

// Helper functions - disponibles para todo el archivo
const getLevelColor = (level: string): string => {
  switch (level) {
    case 'Principiante':
      return '#22c55e'; // Green
    case 'Intermedio':
      return '#f59e0b'; // Amber
    default:
      return '#8b5cf6'; // Purple
  }
};

const getLevelIcon = (level: string): string => {
  switch (level) {
    case 'Principiante':
      return 'checkmark-circle';
    case 'Intermedio':
      return 'alert-circle';
    default:
      return 'help-circle';
  }
};

export default function ExercisesScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const [search, setSearch] = useState('');
  const [activeMuscleFilter, setActiveMuscleFilter] = useState('Todos');
  const [activeLevelFilter, setActiveLevelFilter] = useState('Todos');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const muscleFilters = ['Todos', 'Pecho', 'Espalda', 'Piernas', 'Brazos', 'Hombros', 'Core'];
  const levelFilters = ['Todos', 'Principiante', 'Intermedio'];

  const filteredExercises = mockExercisesLibrary.filter((ex) => {
    const matchesSearch = ex.name.toLowerCase().includes(search.toLowerCase()) ||
      ex.description.toLowerCase().includes(search.toLowerCase());
    const matchesMuscle =
      activeMuscleFilter === 'Todos' || ex.muscle === activeMuscleFilter;
    const matchesLevel = activeLevelFilter === 'Todos' || ex.level === activeLevelFilter;
    return matchesSearch && matchesMuscle && matchesLevel;
  });

  const renderMuscleFilter = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[
        styles.filterChip,
        {
          backgroundColor:
            activeMuscleFilter === item ? theme.tint : theme.card,
          borderColor: theme.border,
        },
      ]}
      onPress={() => setActiveMuscleFilter(item)}
    >
      <Text
        style={[
          styles.filterText,
          {
            color:
              activeMuscleFilter === item
                ? colorScheme === 'dark'
                  ? '#000'
                  : '#fff'
                : theme.text,
          },
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderLevelFilter = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[
        styles.filterChip,
        {
          backgroundColor:
            activeLevelFilter === item ? getLevelColor(item) : theme.card,
          borderColor: theme.border,
        },
      ]}
      onPress={() => setActiveLevelFilter(item)}
    >
      <Text
        style={[
          styles.filterText,
          {
            color:
              activeLevelFilter === item
                ? '#fff'
                : theme.text,
          },
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderExercise = ({ item }: { item: Exercise }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => setSelectedExercise(item)}
      style={[styles.exerciseCard, { backgroundColor: theme.card, borderColor: theme.border }]}
    >
      <View style={styles.cardHeader}>
        <View style={[styles.iconContainer, { backgroundColor: theme.background }]}>
          <Ionicons name="barbell-outline" size={24} color={theme.tint} />
        </View>
        <View style={styles.exerciseMainInfo}>
          <Text style={[styles.exerciseName, { color: theme.cardText }]}>
            {item.name}
          </Text>
          <View style={styles.tagsRow}>
            <Text style={[styles.tag, { color: theme.cardSecondaryText }]}>
              {item.muscle}
            </Text>
            <Text style={[styles.tag, { color: theme.cardSecondaryText }]}>
              {item.equipment}
            </Text>
          </View>
        </View>
        <View style={styles.levelBadge}>
          <Ionicons
            name={getLevelIcon(item.level)}
            size={20}
            color={getLevelColor(item.level)}
          />
          <Text
            style={[
              styles.levelText,
              { color: getLevelColor(item.level) },
            ]}
          >
            {item.level === 'Principiante' ? 'P' : 'I'}
          </Text>
        </View>
      </View>
      <Text
        style={[styles.exerciseDescription, { color: theme.cardSecondaryText }]}
        numberOfLines={2}
      >
        {item.description}
      </Text>
      <View style={styles.musclesRow}>
        {item.secondaryMuscles && item.secondaryMuscles.length > 0 && (
          <Text
            style={[
              styles.secondaryMuscles,
              { color: theme.cardSecondaryText },
            ]}
          >
            Secundarios: {item.secondaryMuscles.join(', ')}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color={theme.icon}
          style={styles.searchIcon}
        />
        <TextInput
          style={[
            styles.searchInput,
            { backgroundColor: theme.card, color: theme.text, borderColor: theme.border },
          ]}
          placeholder="Buscar ejercicio..."
          placeholderTextColor={theme.cardSecondaryText}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Muscle Group Filters */}
      <View style={styles.filtersContainer}>
        <Text style={[styles.filterLabel, { color: theme.text }]}>
          Grupos Musculares
        </Text>
        <FlatList
          data={muscleFilters}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          renderItem={renderMuscleFilter}
          contentContainerStyle={styles.filtersList}
        />
      </View>

      {/* Level Filters */}
      <View style={styles.filtersContainer}>
        <Text style={[styles.filterLabel, { color: theme.text }]}>
          Nivel de Dificultad
        </Text>
        <FlatList
          data={levelFilters}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          renderItem={renderLevelFilter}
          contentContainerStyle={styles.filtersList}
        />
      </View>

      {/* Results count */}
      <View style={styles.resultCountContainer}>
        <Text style={[styles.resultCount, { color: theme.cardSecondaryText }]}>
          {filteredExercises.length} ejercicio{filteredExercises.length !== 1 ? 's' : ''}
        </Text>
      </View>

      {/* Exercises List */}
      <FlatList
        data={filteredExercises}
        keyExtractor={(item) => item.id}
        renderItem={renderExercise}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      {/* Exercise Detail Modal */}
      {selectedExercise && (
        <ExerciseDetailModal
          exercise={selectedExercise}
          visible={!!selectedExercise}
          onClose={() => setSelectedExercise(null)}
          theme={theme}
          colorScheme={colorScheme}
        />
      )}
    </View>
  );
}

interface ExerciseDetailModalProps {
  exercise: Exercise;
  visible: boolean;
  onClose: () => void;
  theme: typeof Colors.light;
  colorScheme: 'light' | 'dark' | null;
}

function ExerciseDetailModal({
  exercise,
  visible,
  onClose,
  theme,
  colorScheme,
}: ExerciseDetailModalProps) {
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
            { backgroundColor: theme.card },
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
            <Text
              style={[styles.modalTitle, { color: theme.text }]}
              numberOfLines={1}
            >
              {exercise.name}
            </Text>
            <View style={{ width: 24 }} />
          </View>

          {/* Modal Content */}
          <ScrollView
            style={styles.modalScroll}
            showsVerticalScrollIndicator={false}
          >
            {/* Level and Equipment */}
            <View style={styles.modalSection}>
              <View style={styles.badgesRow}>
                <View
                  style={[
                    styles.badge,
                    {
                      backgroundColor: `${getLevelColor(exercise.level)}20`,
                      borderColor: getLevelColor(exercise.level),
                    },
                  ]}
                >
                  <Ionicons
                    name={getLevelIcon(exercise.level)}
                    size={16}
                    color={getLevelColor(exercise.level)}
                  />
                  <Text
                    style={[
                      styles.badgeText,
                      { color: getLevelColor(exercise.level) },
                    ]}
                  >
                    {exercise.level}
                  </Text>
                </View>
                <View
                  style={[
                    styles.badge,
                    {
                      backgroundColor: `${theme.tint}20`,
                      borderColor: theme.tint,
                    },
                  ]}
                >
                  <Ionicons
                    name="settings-outline"
                    size={16}
                    color={theme.tint}
                  />
                  <Text
                    style={[styles.badgeText, { color: theme.tint }]}
                  >
                    {exercise.equipment}
                  </Text>
                </View>
              </View>
            </View>

            {/* Muscles */}
            <View style={styles.modalSection}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                Músculos
              </Text>
              <View style={styles.musclesList}>
                <View
                  style={[
                    styles.muscleBadge,
                    {
                      backgroundColor: theme.background,
                      borderColor: theme.border,
                    },
                  ]}
                >
                  <Ionicons
                    name="star"
                    size={16}
                    color={theme.tint}
                  />
                  <Text
                    style={[
                      styles.muscleBadgeText,
                      { color: theme.text },
                    ]}
                  >
                    {exercise.muscle} (Principal)
                  </Text>
                </View>
                {exercise.secondaryMuscles && exercise.secondaryMuscles.length > 0 && (
                  exercise.secondaryMuscles.map((muscle) => (
                    <View
                      key={muscle}
                      style={[
                        styles.muscleBadge,
                        {
                          backgroundColor: theme.background,
                          borderColor: theme.border,
                        },
                      ]}
                    >
                      <Ionicons
                        name="ellipse"
                        size={12}
                        color={theme.cardSecondaryText}
                      />
                      <Text
                        style={[
                          styles.muscleBadgeText,
                          { color: theme.cardSecondaryText },
                        ]}
                      >
                        {muscle} (Secundario)
                      </Text>
                    </View>
                  ))
                )}
              </View>
            </View>

            {/* Description */}
            <View style={styles.modalSection}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                Ejecución
              </Text>
              <Text
                style={[
                  styles.descriptionText,
                  { color: theme.cardSecondaryText },
                ]}
              >
                {exercise.description}
              </Text>
            </View>

            {/* Benefits */}
            <View style={styles.modalSection}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                Beneficios
              </Text>
              <Text
                style={[
                  styles.descriptionText,
                  { color: theme.cardSecondaryText },
                ]}
              >
                {exercise.benefits}
              </Text>
            </View>

            {/* Add Button */}
            <TouchableOpacity
              style={[
                styles.addButton,
                { backgroundColor: theme.tint },
              ]}
              onPress={onClose}
            >
              <Ionicons
                name="add"
                size={24}
                color={colorScheme === 'dark' ? '#000' : '#fff'}
              />
              <Text
                style={[
                  styles.addButtonText,
                  {
                    color: colorScheme === 'dark' ? '#000' : '#fff',
                  },
                ]}
              >
                Agregar a Entrenamiento
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    padding: 16,
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    left: 28,
    top: 28,
    zIndex: 1,
  },
  searchInput: {
    height: 44,
    borderRadius: 22,
    paddingLeft: 40,
    paddingRight: 16,
    borderWidth: 1,
    fontSize: 16,
  },
  filtersContainer: {
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  filterLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
    opacity: 0.7,
  },
  filtersList: {
    gap: 8,
    marginBottom: 12,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterText: {
    fontWeight: '500',
    fontSize: 14,
  },
  resultCountContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  resultCount: {
    fontSize: 13,
    fontWeight: '500',
  },
  listContainer: {
    padding: 16,
    paddingTop: 0,
  },
  exerciseCard: {
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    paddingBottom: 8,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  exerciseMainInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 4,
  },
  tag: {
    fontSize: 12,
  },
  levelBadge: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
  levelText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 2,
  },
  exerciseDescription: {
    fontSize: 13,
    paddingHorizontal: 12,
    marginBottom: 8,
    lineHeight: 18,
  },
  musclesRow: {
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  secondaryMuscles: {
    fontSize: 12,
    fontStyle: 'italic',
  },

  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
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
  modalSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  badgesRow: {
    flexDirection: 'row',
    gap: 12,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    gap: 6,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '600',
  },
  musclesList: {
    gap: 8,
  },
  muscleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
  },
  muscleBadgeText: {
    fontSize: 14,
    fontWeight: '500',
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 22,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
