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

export interface BodyMeasurement {
  id: string;
  date: string; // ISO string
  weight: number; // kg
  chest?: number; // cm
  waist?: number; // cm
  hips?: number; // cm
  notes?: string;
}

const WORKOUTS_KEY = 'workouts';
const MEASUREMENTS_KEY = 'measurements';

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

export const clearWorkouts = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(WORKOUTS_KEY);
  } catch (error) {
    console.error('Error clearing workouts:', error);
  }
};

// Measurements functions
export const saveMeasurement = async (measurement: BodyMeasurement): Promise<void> => {
  try {
    const existingMeasurements = await loadMeasurements();
    const updatedMeasurements = [measurement, ...existingMeasurements];
    await AsyncStorage.setItem(MEASUREMENTS_KEY, JSON.stringify(updatedMeasurements));
  } catch (error) {
    console.error('Error saving measurement:', error);
  }
};

export const loadMeasurements = async (): Promise<BodyMeasurement[]> => {
  try {
    const data = await AsyncStorage.getItem(MEASUREMENTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading measurements:', error);
    return [];
  }
};

export const deleteMeasurement = async (id: string): Promise<void> => {
  try {
    const measurements = await loadMeasurements();
    const filtered = measurements.filter(m => m.id !== id);
    await AsyncStorage.setItem(MEASUREMENTS_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting measurement:', error);
  }
};