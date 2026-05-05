export const mockUser = {
  name: "Usuario",
  currentRest: {
    status: "Descansando",
    nextWorkout: "Espalda y Bíceps"
  }
};

export const mockWorkouts = [
  {
    id: "1",
    title: "Pecho y Tríceps",
    date: "Ayer, 18:30",
    duration: "1h 15m",
    exercises: 6,
    volume: "12,500 kg"
  },
  {
    id: "2",
    title: "Día de Piernas",
    date: "Hace 3 días",
    duration: "1h 30m",
    exercises: 5,
    volume: "18,200 kg"
  },
  {
    id: "3",
    title: "Espalda y Bíceps",
    date: "Hace 5 días",
    duration: "1h 10m",
    exercises: 6,
    volume: "14,100 kg"
  }
];

export const mockTrainSession = {
  title: "Día de Piernas",
  exercises: [
    {
      id: "e1",
      name: "Sentadillas con Barra",
      sets: [
        { id: "s1", reps: 10, weight: 60, completed: true },
        { id: "s2", reps: 10, weight: 80, completed: true },
        { id: "s3", reps: 8, weight: 100, completed: false },
        { id: "s4", reps: 8, weight: 100, completed: false },
      ]
    },
    {
      id: "e2",
      name: "Prensa de Piernas",
      sets: [
        { id: "s1", reps: 12, weight: 150, completed: false },
        { id: "s2", reps: 12, weight: 160, completed: false },
        { id: "s3", reps: 10, weight: 180, completed: false },
      ]
    }
  ]
};

export const mockExercisesLibrary = [
  { id: "1", name: "Press de Banca", muscle: "Pecho", equipment: "Barra" },
  { id: "2", name: "Sentadillas", muscle: "Piernas", equipment: "Barra" },
  { id: "3", name: "Dominadas", muscle: "Espalda", equipment: "Peso corporal" },
  { id: "4", name: "Curl de Bíceps", muscle: "Brazos", equipment: "Mancuernas" },
  { id: "5", name: "Press Militar", muscle: "Hombros", equipment: "Mancuernas" },
  { id: "6", name: "Prensa de Piernas", muscle: "Piernas", equipment: "Máquina" },
  { id: "7", name: "Extensiones de Tríceps", muscle: "Brazos", equipment: "Cable" },
  { id: "8", name: "Remo con Barra", muscle: "Espalda", equipment: "Barra" },
];
