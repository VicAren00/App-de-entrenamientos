import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TextInput, TouchableOpacity, useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';
import { mockExercisesLibrary } from '@/data/mockData';
import { Ionicons } from '@expo/vector-icons';

export default function ExercisesScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('Todos');

  const filters = ['Todos', 'Pecho', 'Espalda', 'Piernas', 'Brazos', 'Hombros'];

  const filteredExercises = mockExercisesLibrary.filter(ex => {
    const matchesSearch = ex.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === 'Todos' || ex.muscle === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const renderFilter = ({ item }: { item: string }) => (
    <TouchableOpacity 
      style={[
        styles.filterChip, 
        { backgroundColor: activeFilter === item ? theme.tint : theme.card, borderColor: theme.border }
      ]}
      onPress={() => setActiveFilter(item)}
    >
      <Text style={[
        styles.filterText, 
        { color: activeFilter === item ? (colorScheme === 'dark' ? '#000' : '#fff') : theme.text }
      ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderExercise = ({ item }: { item: typeof mockExercisesLibrary[0] }) => (
    <View style={[styles.exerciseCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <View style={[styles.iconContainer, { backgroundColor: theme.background }]}>
        <Ionicons name="barbell-outline" size={24} color={theme.icon} />
      </View>
      <View style={styles.exerciseInfo}>
        <Text style={[styles.exerciseName, { color: theme.cardText }]}>{item.name}</Text>
        <Text style={[styles.exerciseTags, { color: theme.cardSecondaryText }]}>{item.muscle} • {item.equipment}</Text>
      </View>
      <Ionicons name="add-circle-outline" size={28} color={theme.tint} />
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={theme.icon} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { backgroundColor: theme.card, color: theme.text, borderColor: theme.border }]}
          placeholder="Buscar ejercicio..."
          placeholderTextColor={theme.cardSecondaryText}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <View style={styles.filtersContainer}>
        <FlatList
          data={filters}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item}
          renderItem={renderFilter}
          contentContainerStyle={styles.filtersList}
        />
      </View>

      <FlatList
        data={filteredExercises}
        keyExtractor={item => item.id}
        renderItem={renderExercise}
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
  },
  filtersList: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterText: {
    fontWeight: '500',
  },
  listContainer: {
    padding: 16,
  },
  exerciseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  exerciseTags: {
    fontSize: 13,
  },
});
