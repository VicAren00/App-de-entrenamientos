import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Set {
  id: string;
  reps: string;
  weight: string;
  completed: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  sets: Set[];
}

export interface Workout {
  id: string;
  title: string;
  date: string; // ISO string
  duration: number; // seconds
  exercises: Exercise[];
}

const WORKOUTS_KEY = 'workouts';

export const saveWorkout = async (workout: Workout): Promise<void> => {
  try {
    const existingWorkouts = await loadWorkouts();
    const updatedWorkouts = [workout, ...existingWorkouts];
    await AsyncStorage.setItem(WORKOUTS_KEY, JSON.stringify(updatedWorkouts));
  } catch (error) {
    console.error('Error saving workout:', error);
  }
};

export const loadWorkouts = async (): Promise<Workout[]> => {
  try {
    const data = await AsyncStorage.getItem(WORKOUTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading workouts:', error);
    return [];
  }
};