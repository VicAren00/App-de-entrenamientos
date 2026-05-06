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

export const workoutTemplates = [
  {
    id: "push",
    name: "Push - Pecho, Hombros, Tríceps",
    description: "Enfocado en movimientos de empuje. Ideal para desarrollar pecho, hombros y tríceps.",
    icon: "arrow-forward",
    exercises: [
      { name: "Press de Banca Plano", sets: 4, reps: 8, weight: 80 },
      { name: "Press de Banca Inclinado", sets: 3, reps: 10, weight: 70 },
      { name: "Press Militar (Hombros)", sets: 4, reps: 8, weight: 40 },
      { name: "Aperturas con Mancuernas", sets: 3, reps: 12, weight: 20 },
      { name: "Elevaciones Laterales", sets: 3, reps: 12, weight: 12 },
      { name: "Extensiones de Tríceps en Polea", sets: 3, reps: 12, weight: 25 },
      { name: "Fondos en Banco (Tríceps)", sets: 3, reps: 10, weight: 0 },
    ]
  },
  {
    id: "pull",
    name: "Pull - Espalda y Bíceps",
    description: "Enfocado en movimientos de tracción. Fortalece espalda, bíceps y antebrazos.",
    icon: "arrow-back",
    exercises: [
      { name: "Dominadas", sets: 4, reps: 8, weight: 0 },
      { name: "Remo con Barra", sets: 4, reps: 8, weight: 70 },
      { name: "Remo con Mancuerna", sets: 3, reps: 10, weight: 30 },
      { name: "Jalones Laterales", sets: 3, reps: 12, weight: 70 },
      { name: "Curl de Bíceps con Barra", sets: 3, reps: 10, weight: 20 },
      { name: "Curl de Bíceps con Mancuernas", sets: 3, reps: 12, weight: 15 },
      { name: "Face Pulls (Posterior de Hombros)", sets: 3, reps: 15, weight: 30 },
    ]
  },
  {
    id: "legs",
    name: "Piernas - Tren Inferior",
    description: "Entrenamiento completo de piernas. Trabaja cuádriceps, isquios, glúteos y pantorrillas.",
    icon: "accessibility",
    exercises: [
      { name: "Sentadillas con Barra", sets: 4, reps: 8, weight: 100 },
      { name: "Prensa de Piernas", sets: 3, reps: 10, weight: 200 },
      { name: "Estocadas con Mancuernas", sets: 3, reps: 10, weight: 25 },
      { name: "Extensiones de Cuádriceps", sets: 3, reps: 12, weight: 100 },
      { name: "Curl de Femorales", sets: 3, reps: 12, weight: 80 },
      { name: "Elevaciones de Pantorrilla", sets: 4, reps: 15, weight: 100 },
      { name: "Sentadillas Sumo", sets: 3, reps: 10, weight: 80 },
    ]
  },
  {
    id: "torso",
    name: "Torso - Pecho, Espalda, Hombros",
    description: "Rutina integral del torso. Combina push y pull para desarrollo equilibrado.",
    icon: "body",
    exercises: [
      { name: "Press de Banca", sets: 3, reps: 8, weight: 80 },
      { name: "Remo con Barra", sets: 3, reps: 8, weight: 70 },
      { name: "Press Militar", sets: 3, reps: 10, weight: 40 },
      { name: "Jalones Laterales", sets: 3, reps: 12, weight: 70 },
      { name: "Aperturas con Mancuernas", sets: 3, reps: 12, weight: 20 },
      { name: "Curl de Bíceps", sets: 2, reps: 10, weight: 15 },
      { name: "Extensiones de Tríceps", sets: 2, reps: 10, weight: 25 },
    ]
  },
  {
    id: "fullbody",
    name: "Full Body - Cuerpo Completo",
    description: "Entrenamiento completo en una sesión. Ideal para 3 días por semana.",
    icon: "fitness",
    exercises: [
      { name: "Sentadillas con Barra", sets: 3, reps: 8, weight: 100 },
      { name: "Press de Banca", sets: 3, reps: 8, weight: 80 },
      { name: "Remo con Barra", sets: 3, reps: 8, weight: 70 },
      { name: "Press Militar", sets: 2, reps: 10, weight: 40 },
      { name: "Extensiones de Cuádriceps", sets: 2, reps: 12, weight: 100 },
      { name: "Curl de Bíceps", sets: 2, reps: 10, weight: 15 },
      { name: "Extensiones de Tríceps", sets: 2, reps: 10, weight: 25 },
      { name: "Planchas Abdominales", sets: 3, reps: "60s", weight: 0 },
    ]
  },
];

export const mockExercisesLibrary = [
  // PECHO
  {
    id: "1",
    name: "Press de Banca",
    muscle: "Pecho",
    secondaryMuscles: ["Tríceps", "Hombros"],
    equipment: "Barra",
    description: "Acuéstate en el banco, agarra la barra a la altura del pecho y empuja hacia arriba hasta estirar los brazos completamente.",
    benefits: "Aumenta la fuerza y masa del pecho, mejora la estabilidad de hombros",
    level: "Intermedio"
  },
  {
    id: "2",
    name: "Press de Mancuernas",
    muscle: "Pecho",
    secondaryMuscles: ["Tríceps", "Hombros"],
    equipment: "Mancuernas",
    description: "Acuéstate en el banco, sostén una mancuerna en cada mano al nivel del pecho y empuja hacia arriba.",
    benefits: "Mayor rango de movimiento, mejor equilibrio y estabilidad muscular",
    level: "Intermedio"
  },
  {
    id: "3",
    name: "Aperturas con Mancuernas",
    muscle: "Pecho",
    secondaryMuscles: ["Hombros"],
    equipment: "Mancuernas",
    description: "Acuéstate en el banco, abre los brazos en arco manteniendo una ligera flexión del codo, trae las mancuernas hacia el centro del pecho.",
    benefits: "Fortalece el pecho, mejora la flexibilidad de hombros",
    level: "Intermedio"
  },
  {
    id: "4",
    name: "Fondos en Banco",
    muscle: "Pecho",
    secondaryMuscles: ["Tríceps", "Hombros"],
    equipment: "Peso corporal",
    description: "Colócate de frente a un banco, baja el cuerpo doblando los codos hasta formar un ángulo de 90 grados.",
    benefits: "Trabaja el pecho inferior y tríceps, accesible para principiantes",
    level: "Principiante"
  },
  {
    id: "5",
    name: "Flexiones",
    muscle: "Pecho",
    secondaryMuscles: ["Tríceps", "Hombros"],
    equipment: "Peso corporal",
    description: "Colócate en posición de tabla, baja el cuerpo doblando los codos hasta que el pecho casi toque el suelo.",
    benefits: "Ejercicio completo, mejora fuerza funcional y resistencia",
    level: "Principiante"
  },

  // ESPALDA
  {
    id: "6",
    name: "Dominadas",
    muscle: "Espalda",
    secondaryMuscles: ["Bíceps"],
    equipment: "Peso corporal",
    description: "Cuelga de una barra, tira tu cuerpo hacia arriba hasta que tu barbilla supere la barra.",
    benefits: "Fortalece la espalda, brazos y aumenta la fuerza de agarre",
    level: "Intermedio"
  },
  {
    id: "7",
    name: "Remo con Barra",
    muscle: "Espalda",
    secondaryMuscles: ["Bíceps"],
    equipment: "Barra",
    description: "Inclínate hacia adelante con la barra en las manos, tira la barra hacia tu pecho y baja controladamente.",
    benefits: "Desarrolla una espalda fuerte, mejora la postura",
    level: "Intermedio"
  },
  {
    id: "8",
    name: "Remo con Mancuernas",
    muscle: "Espalda",
    secondaryMuscles: ["Bíceps"],
    equipment: "Mancuernas",
    description: "Inclínate hacia adelante, sostén una mancuerna en cada mano y tira hacia tu pecho alternando o simultáneamente.",
    benefits: "Mayor control e independencia de cada lado",
    level: "Intermedio"
  },
  {
    id: "9",
    name: "Jalones Laterales",
    muscle: "Espalda",
    secondaryMuscles: ["Bíceps"],
    equipment: "Cable",
    description: "Siéntate en la máquina, agarra la barra ancha y tira hacia tu pecho bajando los codos.",
    benefits: "Aísla la espalda, excelente para principiantes",
    level: "Principiante"
  },
  {
    id: "10",
    name: "Remo en Máquina",
    muscle: "Espalda",
    secondaryMuscles: ["Bíceps"],
    equipment: "Máquina",
    description: "Siéntate en la máquina de remo, agarra los mangos y tira hacia ti contrayendo la espalda.",
    benefits: "Movimiento controlado y seguro para principiantes",
    level: "Principiante"
  },
  {
    id: "11",
    name: "Peso Muerto",
    muscle: "Espalda",
    secondaryMuscles: ["Piernas", "Glúteos"],
    equipment: "Barra",
    description: "De pie con la barra en el suelo, levanta la barra hasta la posición de pie manteniendo la espalda recta.",
    benefits: "Fortalecimiento completo del cuerpo, aumenta la fuerza funcional",
    level: "Intermedio"
  },

  // PIERNAS
  {
    id: "12",
    name: "Sentadillas con Barra",
    muscle: "Piernas",
    secondaryMuscles: ["Glúteos", "Core"],
    equipment: "Barra",
    description: "De pie con la barra sobre los hombros, baja el cuerpo doblando las rodillas hasta la paralela.",
    benefits: "Fortalece piernas y glúteos, mejora estabilidad y core",
    level: "Intermedio"
  },
  {
    id: "13",
    name: "Sentadillas",
    muscle: "Piernas",
    secondaryMuscles: ["Glúteos", "Core"],
    equipment: "Peso corporal",
    description: "De pie, baja el cuerpo doblando las rodillas hasta que los muslos estén paralelos al suelo.",
    benefits: "Fortalece piernas, accesible para todos los niveles",
    level: "Principiante"
  },
  {
    id: "14",
    name: "Prensa de Piernas",
    muscle: "Piernas",
    secondaryMuscles: ["Glúteos"],
    equipment: "Máquina",
    description: "Siéntate en la máquina, coloca los pies en la plataforma y baja el peso doblando las rodillas.",
    benefits: "Reduce el estrés en la espalda, buen ejercicio para principiantes",
    level: "Principiante"
  },
  {
    id: "15",
    name: "Estocadas",
    muscle: "Piernas",
    secondaryMuscles: ["Glúteos"],
    equipment: "Peso corporal",
    description: "De pie, avanza una pierna, baja el cuerpo doblando ambas rodillas hasta formar ángulos de 90 grados.",
    benefits: "Trabaja cada pierna individualmente, mejora el balance",
    level: "Principiante"
  },
  {
    id: "16",
    name: "Leg Press",
    muscle: "Piernas",
    secondaryMuscles: ["Glúteos"],
    equipment: "Máquina",
    description: "Sentado, empuja la plataforma con los pies hacia adelante hasta estirar las piernas completamente.",
    benefits: "Fortalece cuádriceps y glúteos de forma segura",
    level: "Principiante"
  },
  {
    id: "17",
    name: "Extensiones de Cuádriceps",
    muscle: "Piernas",
    secondaryMuscles: [],
    equipment: "Máquina",
    description: "Siéntate en la máquina, coloca las piernas bajo la palanca y levanta hacia arriba extendiendo las rodillas.",
    benefits: "Aísla el cuádriceps, buen ejercicio para recuperación",
    level: "Principiante"
  },
  {
    id: "18",
    name: "Curl de Femorales",
    muscle: "Piernas",
    secondaryMuscles: [],
    equipment: "Máquina",
    description: "Acuéstate boca abajo, coloca las piernas bajo la palanca y dobla las rodillas hacia el glúteo.",
    benefits: "Aísla los isquiotibiales, previene desequilibrios musculares",
    level: "Principiante"
  },
  {
    id: "19",
    name: "Sentadilla Búlgara",
    muscle: "Piernas",
    secondaryMuscles: ["Glúteos"],
    equipment: "Peso corporal",
    description: "De pie frente a un banco, coloca un pie atrás sobre el banco, baja doblando la pierna delantera.",
    benefits: "Trabaja una pierna a la vez, mejora el balance y la fuerza",
    level: "Intermedio"
  },

  // HOMBROS
  {
    id: "20",
    name: "Press Militar",
    muscle: "Hombros",
    secondaryMuscles: ["Tríceps"],
    equipment: "Barra",
    description: "De pie, sostén la barra a la altura de los hombros y empuja hacia arriba hasta estirar los brazos.",
    benefits: "Fortalece hombros, mejora estabilidad y postura",
    level: "Intermedio"
  },
  {
    id: "21",
    name: "Press de Hombros con Mancuernas",
    muscle: "Hombros",
    secondaryMuscles: ["Tríceps"],
    equipment: "Mancuernas",
    description: "De pie o sentado, sostén una mancuerna en cada mano a la altura del hombro y empuja hacia arriba.",
    benefits: "Mayor rango de movimiento y simetría muscular",
    level: "Intermedio"
  },
  {
    id: "22",
    name: "Elevaciones Laterales",
    muscle: "Hombros",
    secondaryMuscles: [],
    equipment: "Mancuernas",
    description: "De pie, sostén una mancuerna en cada mano, levanta los brazos hacia los lados hasta la altura del hombro.",
    benefits: "Aísla el deltoides, excelente para principiantes",
    level: "Principiante"
  },
  {
    id: "23",
    name: "Elevaciones Frontales",
    muscle: "Hombros",
    secondaryMuscles: [],
    equipment: "Mancuernas",
    description: "De pie, sostén una mancuerna en cada mano, levanta los brazos hacia adelante hasta la altura del hombro.",
    benefits: "Fortalece el deltoides anterior, buen ejercicio de aislamiento",
    level: "Principiante"
  },
  {
    id: "24",
    name: "Pájaros en Pecho",
    muscle: "Hombros",
    secondaryMuscles: [],
    equipment: "Mancuernas",
    description: "Inclínate hacia adelante, sostén mancuernas y levanta los brazos hacia los lados en un movimiento de arco.",
    benefits: "Trabaja el deltoides trasero, mejora la postura",
    level: "Principiante"
  },
  {
    id: "25",
    name: "Encogimientos de Hombros",
    muscle: "Hombros",
    secondaryMuscles: [],
    equipment: "Mancuernas",
    description: "De pie con mancuernas en las manos, levanta los hombros hacia las orejas sin doblar los brazos.",
    benefits: "Fortalece el trapecio, ejercicio simple y efectivo",
    level: "Principiante"
  },

  // BRAZOS
  {
    id: "26",
    name: "Curl de Bíceps",
    muscle: "Brazos",
    secondaryMuscles: [],
    equipment: "Mancuernas",
    description: "De pie con mancuernas en las manos, dobla los codos levantando las mancuernas hacia los hombros.",
    benefits: "Aísla el bíceps, buen ejercicio para aumentar tamaño",
    level: "Principiante"
  },
  {
    id: "27",
    name: "Curl de Bíceps con Barra",
    muscle: "Brazos",
    secondaryMuscles: [],
    equipment: "Barra",
    description: "De pie con la barra en las manos, dobla los codos levantando la barra hacia el pecho.",
    benefits: "Mayor peso, fortalecimiento completo del bíceps",
    level: "Intermedio"
  },
  {
    id: "28",
    name: "Curl Martillo",
    muscle: "Brazos",
    secondaryMuscles: ["Antebrazos"],
    equipment: "Mancuernas",
    description: "De pie, sostén mancuernas con las palmas enfrentadas, dobla los codos levantando hacia los hombros.",
    benefits: "Trabaja bíceps y braquial, mejor para el agarre",
    level: "Principiante"
  },
  {
    id: "29",
    name: "Extensiones de Tríceps con Cable",
    muscle: "Brazos",
    secondaryMuscles: [],
    equipment: "Cable",
    description: "De pie frente a la polea, agarra la cuerda, dobla los codos y estira hacia abajo extendiendo los brazos.",
    benefits: "Aísla el tríceps, buen ejercicio de aislamiento",
    level: "Principiante"
  },
  {
    id: "30",
    name: "Extensiones de Tríceps sobre la Cabeza",
    muscle: "Brazos",
    secondaryMusicles: [],
    equipment: "Mancuerna",
    description: "De pie o sentado, sostén una mancuerna con ambas manos sobre la cabeza, baja hacia la nuca flexionando los codos.",
    benefits: "Fortalece el tríceps, mejora la flexibilidad del hombro",
    level: "Principiante"
  },
  {
    id: "31",
    name: "Flexiones de Tríceps en Banco",
    muscle: "Brazos",
    secondaryMuscles: ["Pecho"],
    equipment: "Peso corporal",
    description: "Colócate de espaldas a un banco, baja el cuerpo doblando los codos hacia atrás.",
    benefits: "Fortalece el tríceps sin equipo, accesible para todos",
    level: "Principiante"
  },
  {
    id: "32",
    name: "Curl de Bíceps en Cable",
    muscle: "Brazos",
    secondaryMuscles: [],
    equipment: "Cable",
    description: "De pie frente a la polea baja, agarra la cuerda y dobla los codos levantando hacia los hombros.",
    benefits: "Tensión constante durante el movimiento",
    level: "Principiante"
  },

  // CORE
  {
    id: "33",
    name: "Abdominales",
    muscle: "Core",
    secondaryMuscles: [],
    equipment: "Peso corporal",
    description: "Acuéstate boca arriba, dobla los codos y levanta el torso contrayendo el abdomen.",
    benefits: "Fortalece abdominales, mejora postura y estabilidad",
    level: "Principiante"
  },
  {
    id: "34",
    name: "Planchas",
    muscle: "Core",
    secondaryMuscles: ["Espalda", "Hombros"],
    equipment: "Peso corporal",
    description: "Colócate en posición de tabla, mantén el cuerpo recto contrayendo el core.",
    benefits: "Fortalece core completo, mejora resistencia y estabilidad",
    level: "Principiante"
  },
  {
    id: "35",
    name: "Rueda Abdominal",
    muscle: "Core",
    secondaryMuscles: ["Espalda"],
    equipment: "Rueda Abdominal",
    description: "De rodillas o de pie, sostén la rueda y extiende el cuerpo hacia adelante, luego vuelve a la posición inicial.",
    benefits: "Fortalecimiento completo del core",
    level: "Intermedio"
  },
  {
    id: "36",
    name: "Crunches Declinados",
    muscle: "Core",
    secondaryMuscles: [],
    equipment: "Banco Declinado",
    description: "Acuéstate en un banco inclinado hacia abajo, dobla el torso hacia arriba contrayendo los abdominales.",
    benefits: "Mayor intensidad que crunches normales",
    level: "Intermedio"
  },
  {
    id: "37",
    name: "Elevación de Rodillas Colgando",
    muscle: "Core",
    secondaryMuscles: ["Psoas"],
    equipment: "Peso corporal",
    description: "Cuelga de una barra, levanta las rodillas hacia el pecho contrayendo el abdomen.",
    benefits: "Fortalece abdominales bajos y psoas",
    level: "Intermedio"
  },
  {
    id: "38",
    name: "Rotaciones Rusas",
    muscle: "Core",
    secondaryMuscles: ["Oblicuos"],
    equipment: "Peso corporal",
    description: "Siéntate con las rodillas flexionadas, sostén un peso y rota el torso de lado a lado.",
    benefits: "Fortalece oblicuos y core rotacional",
    level: "Principiante"
  },
  {
    id: "39",
    name: "Dead Bug",
    muscle: "Core",
    secondaryMuscles: [],
    equipment: "Peso corporal",
    description: "Acuéstate boca arriba, levanta los brazos y piernas, alterna bajando brazo derecho con pierna izquierda.",
    benefits: "Fortalece core de forma segura, buen ejercicio para principiantes",
    level: "Principiante"
  },
  {
    id: "40",
    name: "Pallof Press",
    muscle: "Core",
    secondaryMuscles: ["Oblicuos"],
    equipment: "Cable",
    description: "De pie frente a una polea lateral, sostén la cuerda a la altura del pecho y empuja hacia adelante.",
    benefits: "Fortalece core de forma funcional, excelente para la estabilidad",
    level: "Intermedio"
  }
];
