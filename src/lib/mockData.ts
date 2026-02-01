import {
  Exercise,
  ExerciseRecord,
  ExerciseCompletionRecord,
  Plan,
  PlanRecord,
  RoutineCompletionRecord,
  Routine,
  RoutineRecord,
  UserData,
  UserProfile,
  AuthSession,
} from '@/types';

export const planImageStorage: Record<string, string> = {
  plan_1:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAkeYfuiPYqt6xnfSjHtgKnCtlHaumyTwsAd1iENGEGXUfTp3STzh6UFm0xSBQ0tUJuMlVA9m0CFk7kVhPvjWHGD0zTopeYZWjagjX_RLuwXjfkJlp5ChlF-geTPIJEPlKLTuyXA2qXhe-yUfa629zMJjURdiZ8lOxmEyukTEP-vMHmoPyMmyllBLQ8YsQXj6rfr79JOwCl6kPpLDhOSCXXBVdBNugZRlLjeoEJQYHqcKhk-DBF0sULGnGiBKtVLVdAM63QPWQqteE',
  plan_2:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD81ZMK-TPwzRtIqE1VifGL4gbeThF1XUhDdcn--SYU3U6SIqEStrHN0Gg0oKLv79gYiv9a-OQ10ZAjknIwIpJnEpVV8HaJhIRYPSWhgO6HRE4-Gu3zfFges5m80ihGqfpb6p3979c6SUkcZoEY3QKQqx60a_w3AtHNjFCDfQktbY1kS8aVaDFEDYOcLaLc5kzcDopPZzTXvYnX65jP5K5Os3g6nbFnJQ2_vgdsk4_wKXI7xqJQxXjURFQHz701y2MbFBjM-wWN9ws',
  plan_3:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBXekZcU-SO7qB6z-7tin8qdk9ho0nEtntHtZBJEts181XzF_ph16Q3Cr39v4XPomgHPbazL0iMtbudxO957bUKMYtOo8SiiQtnHoaKFyclcwyyO7763DN0Qec1HyKJsXrb1DL_rhyY-YrDfEIWfG5BtLSE4pG2RcN_FLH3SxGrD2YoIZAkumLds-uM26TaIncK-gKQR2dZ3xNKpEK_9e_5NSSkqBNsyc_NgY6H5Z2FgJkTAXSAx6acY_au3zQxqKGhkxgAvC7g2Ok',
};

export const routineImageStorage: Record<string, string> = {
  routine_1:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC-1fovAQv534D-5gIX1EhxC7-VkPA-ImyucKJZMFFLJQmmtMjg3tmBqXrwVTKBTnqouIDl0zJRdx_j9CtKHDV2qJjxi3g-iOAdMqrRFLxYYbwn78Bul7jd360psVfbgDE1JxcFVoE9IJMWA0-paCT1_5-5J2xO83Ddj1Vno5ctw7_n-PjPJU1esfC0rvctEkpFkIDN49pKHkDodhOgU5h3RBR70o7ooJe4GFyCfaheptjx_lWXrTi6E8DVCWbBQjNsHpSVCvVfbyM',
  routine_2:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB9oLci0eZAB7-n_KFUR3fPBnAdjyzXV55BL2dTxKEyuTKqJ2ag359M2_8VZ-vgNwZrFBTvqWL2hqUFgvAfRJ5UAgIiMAvfuZBUnryZ-uYm-vQ0Vw-PcCi3i7EnwIcKPjupWSy4c7AyFzxxyJECs-HcXTTreZ_z8BrTGaA3hhbCZ44dtXedvdpJ065EPStuF-jYUkrmMKpCLSqJowbF4Hr6PtJqUcNIqweJtKX2hWhRxKenE76pkRlKGU4RxwAt8ms3W9vMC1WCvYY',
  routine_3:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD-e9At5bUL4UPDB0RtCswGdRVx2S-0Y8BPP97YvgzfYhC5vzGW04k_FWlF5oHA-0pFmhxcq7vsjPa0nK_ISfPVws7KfsbJU9ZyQEBR8IP7Opu0CFL1-QSZSSbYbkLq3C5eQxBLxVA5kR6tCwjuTGTvsLO9SY5MrVvGhPzfi-xKsCj1Kl0eGFjwBXDlPGaGNT8aL_u2ryBlyrpNNr3_QmUGO2cEqePhLUKVH1Z0zCt0YOy1xLTUAqtaFNqLVB-5tlLDXVn8Z3X904Q',
};

export const routineScheduleTable: Record<string, { day: string; time: string }> = {
  routine_1: { day: 'Monday', time: '08:00 AM' },
  routine_2: { day: 'Wednesday', time: '05:30 PM' },
  routine_3: { day: 'Friday', time: '07:00 AM' },
  routine_4: { day: 'Tuesday', time: '06:30 PM' },
  routine_5: { day: 'Saturday', time: '09:00 AM' },
};

export const sessionStorageKey = 'gym-planner-session' as const;
export const sessionDuration = 24 * 60 * 60 * 1000; // 24 hours

export function validateLogin(email: string, password: string): UserProfile | null {
  const user = usersTable.find(
    (u) => u.email === email && u.password === password
  );
  return user ?? null;
}

export function createSession(user: UserProfile): AuthSession {
  return {
    userId: user.id,
    email: user.email,
    name: user.name,
    expiresAt: Date.now() + sessionDuration,
  };
}

export function readSession(): AuthSession | null {
  if (typeof window === 'undefined') return null;
  const stored = window.localStorage.getItem(sessionStorageKey);
  if (!stored) return null;

  try {
    const session = JSON.parse(stored) as AuthSession;
    // Check if session has expired
    if (session.expiresAt < Date.now()) {
      window.localStorage.removeItem(sessionStorageKey);
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export function writeSession(session: AuthSession) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(sessionStorageKey, JSON.stringify(session));
}

export function clearSession() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(sessionStorageKey);
}

export function getCurrentUser(): UserProfile | null {
  const session = readSession();
  if (!session) return null;
  return usersTable.find((u) => u.id === session.userId) ?? null;
}

export const usersTable: UserProfile[] = [
  {
    id: 'user_1',
    name: 'Alex Rivers',
    email: 'alex@example.com',
    password: 'password123', // In real app, this would be hashed
    activePlanId: 'plan_1',
    profileImage: 'https://via.placeholder.com/100',
    planIds: ['plan_1', 'plan_2', 'plan_3'],
  },
  {
    id: 'user_2',
    name: 'Jordan Smith',
    email: 'jordan@example.com',
    password: 'password123',
    activePlanId: 'plan_2',
    profileImage: undefined,
    planIds: ['plan_2'],
  },
];

export const plansTable: PlanRecord[] = [
  {
    id: 'plan_1',
    name: 'Strength Training',
    description: 'Build strength with compound movements',
    difficulty: 'Advanced',
    frequency: '6x/week',
    image: planImageStorage.plan_1,
    routineIds: ['routine_1', 'routine_2', 'routine_3'],
  },
  {
    id: 'plan_2',
    name: 'Weight Loss',
    description: 'Burn calories with cardio and circuit training',
    difficulty: 'Intermediate',
    frequency: '5x/week',
    image: planImageStorage.plan_2,
    routineIds: ['routine_4'],
  },
  {
    id: 'plan_3',
    name: 'Hypertrophy',
    description: 'Muscle building with higher volume training',
    difficulty: 'Expert',
    frequency: '6x/week',
    image: planImageStorage.plan_3,
    routineIds: ['routine_5'],
  },
];

export const routinesTable: RoutineRecord[] = [
  {
    id: 'routine_1',
    name: 'Push Day',
    description: 'Chest, Shoulders, Triceps',
    duration: 45,
    calories: 320,
    difficulty: 'Advanced',
    lastCompleted: '2025-01-30',
    exerciseIds: ['ex_1', 'ex_2', 'ex_3', 'ex_4', 'ex_5', 'ex_6'],
  },
  {
    id: 'routine_2',
    name: 'Pull Day',
    description: 'Back, Biceps, Rear Delts',
    duration: 50,
    calories: 300,
    difficulty: 'Advanced',
    lastCompleted: '2025-01-29',
    exerciseIds: ['ex_7', 'ex_8', 'ex_9', 'ex_10', 'ex_11'],
  },
  {
    id: 'routine_3',
    name: 'Leg Day',
    description: 'Quads, Hamstrings, Calves',
    duration: 65,
    calories: 380,
    difficulty: 'Advanced',
    exerciseIds: ['ex_12', 'ex_13', 'ex_14', 'ex_15', 'ex_16', 'ex_17', 'ex_18'],
  },
  {
    id: 'routine_4',
    name: 'Cardio Blast',
    description: 'High intensity cardio',
    duration: 40,
    calories: 500,
    difficulty: 'Intermediate',
    exerciseIds: ['ex_19', 'ex_20', 'ex_21'],
  },
  {
    id: 'routine_5',
    name: 'Upper Body',
    description: 'All upper body muscle groups',
    duration: 75,
    calories: 420,
    difficulty: 'Expert',
    exerciseIds: ['ex_22', 'ex_23'],
  },
];

export const exercisesTable: ExerciseRecord[] = [
  {
    id: 'ex_1',
    name: 'Bench Press',
    muscleGroups: ['Chest', 'Triceps', 'Shoulders'],
    sets: 4,
    reps: 10,
  },
  {
    id: 'ex_2',
    name: 'Overhead Press',
    muscleGroups: ['Shoulders', 'Triceps'],
    sets: 3,
    reps: 12,
  },
  {
    id: 'ex_3',
    name: 'Tricep Extensions',
    muscleGroups: ['Triceps'],
    sets: 4,
    reps: 15,
  },
  {
    id: 'ex_4',
    name: 'Chest Flys',
    muscleGroups: ['Chest'],
    sets: 3,
    reps: 15,
  },
  {
    id: 'ex_5',
    name: 'Lateral Raises',
    muscleGroups: ['Shoulders'],
    sets: 4,
    reps: 20,
  },
  {
    id: 'ex_6',
    name: 'Push-ups',
    muscleGroups: ['Chest', 'Shoulders', 'Triceps'],
    sets: 3,
    reps: 15,
  },
  {
    id: 'ex_7',
    name: 'Deadlifts',
    muscleGroups: ['Back', 'Hamstrings'],
    sets: 4,
    reps: 8,
  },
  {
    id: 'ex_8',
    name: 'Pull-ups',
    muscleGroups: ['Back', 'Biceps'],
    sets: 4,
    reps: 10,
  },
  {
    id: 'ex_9',
    name: 'Barbell Rows',
    muscleGroups: ['Back', 'Biceps'],
    sets: 4,
    reps: 10,
  },
  {
    id: 'ex_10',
    name: 'Face Pulls',
    muscleGroups: ['Rear Delts', 'Back'],
    sets: 3,
    reps: 15,
  },
  {
    id: 'ex_11',
    name: 'Bicep Curls',
    muscleGroups: ['Biceps'],
    sets: 3,
    reps: 12,
  },
  {
    id: 'ex_12',
    name: 'Squats',
    muscleGroups: ['Quads', 'Hamstrings'],
    sets: 4,
    reps: 8,
  },
  {
    id: 'ex_13',
    name: 'Leg Press',
    muscleGroups: ['Quads', 'Hamstrings'],
    sets: 4,
    reps: 10,
  },
  {
    id: 'ex_14',
    name: 'Romanian Deadlifts',
    muscleGroups: ['Hamstrings', 'Back'],
    sets: 3,
    reps: 10,
  },
  {
    id: 'ex_15',
    name: 'Leg Curls',
    muscleGroups: ['Hamstrings'],
    sets: 3,
    reps: 12,
  },
  {
    id: 'ex_16',
    name: 'Leg Extensions',
    muscleGroups: ['Quads'],
    sets: 3,
    reps: 15,
  },
  {
    id: 'ex_17',
    name: 'Calf Raises',
    muscleGroups: ['Calves'],
    sets: 4,
    reps: 20,
  },
  {
    id: 'ex_18',
    name: 'Walking Lunges',
    muscleGroups: ['Quads', 'Glutes'],
    sets: 3,
    reps: 12,
  },
  {
    id: 'ex_19',
    name: 'Treadmill Running',
    muscleGroups: ['Full Body'],
    sets: 1,
    reps: 40,
  },
  {
    id: 'ex_20',
    name: 'Burpees',
    muscleGroups: ['Full Body'],
    sets: 3,
    reps: 15,
  },
  {
    id: 'ex_21',
    name: 'Jump Rope',
    muscleGroups: ['Full Body'],
    sets: 5,
    reps: 60,
  },
  {
    id: 'ex_22',
    name: 'Incline Bench Press',
    muscleGroups: ['Chest', 'Shoulders'],
    sets: 4,
    reps: 8,
  },
  {
    id: 'ex_23',
    name: 'Cable Flyes',
    muscleGroups: ['Chest'],
    sets: 4,
    reps: 12,
  },
];

export const routineCompletionsTable: RoutineCompletionRecord[] = [
  {
    id: 'rc_1',
    userId: 'user_1',
    planId: 'plan_1',
    routineId: 'routine_1',
    completedAt: '2026-01-31T18:20:00.000Z',
  },
  {
    id: 'rc_2',
    userId: 'user_1',
    planId: 'plan_1',
    routineId: 'routine_2',
    completedAt: '2026-01-30T18:20:00.000Z',
  },
];

export const exerciseCompletionsTable: ExerciseCompletionRecord[] = [
  {
    id: 'ec_1',
    userId: 'user_1',
    planId: 'plan_1',
    routineId: 'routine_1',
    exerciseId: 'ex_1',
    completedAt: '2026-01-31T18:10:00.000Z',
  },
  {
    id: 'ec_2',
    userId: 'user_1',
    planId: 'plan_1',
    routineId: 'routine_1',
    exerciseId: 'ex_2',
    completedAt: '2026-01-31T18:12:00.000Z',
  },
  {
    id: 'ec_3',
    userId: 'user_1',
    planId: 'plan_1',
    routineId: 'routine_1',
    exerciseId: 'ex_3',
    completedAt: '2026-01-31T18:15:00.000Z',
  },
  {
    id: 'ec_4',
    userId: 'user_1',
    planId: 'plan_1',
    routineId: 'routine_1',
    exerciseId: 'ex_4',
    completedAt: '2026-01-31T18:17:00.000Z',
  },
  {
    id: 'ec_5',
    userId: 'user_1',
    planId: 'plan_1',
    routineId: 'routine_1',
    exerciseId: 'ex_5',
    completedAt: '2026-01-31T18:18:00.000Z',
  },
  {
    id: 'ec_6',
    userId: 'user_1',
    planId: 'plan_1',
    routineId: 'routine_1',
    exerciseId: 'ex_6',
    completedAt: '2026-01-31T18:19:00.000Z',
  },
  {
    id: 'ec_7',
    userId: 'user_1',
    planId: 'plan_1',
    routineId: 'routine_2',
    exerciseId: 'ex_7',
    completedAt: '2026-01-30T18:10:00.000Z',
  },
  {
    id: 'ec_8',
    userId: 'user_1',
    planId: 'plan_1',
    routineId: 'routine_2',
    exerciseId: 'ex_8',
    completedAt: '2026-01-30T18:12:00.000Z',
  },
  {
    id: 'ec_9',
    userId: 'user_1',
    planId: 'plan_1',
    routineId: 'routine_2',
    exerciseId: 'ex_9',
    completedAt: '2026-01-30T18:14:00.000Z',
  },
  {
    id: 'ec_10',
    userId: 'user_1',
    planId: 'plan_1',
    routineId: 'routine_2',
    exerciseId: 'ex_10',
    completedAt: '2026-01-30T18:16:00.000Z',
  },
  {
    id: 'ec_11',
    userId: 'user_1',
    planId: 'plan_1',
    routineId: 'routine_2',
    exerciseId: 'ex_11',
    completedAt: '2026-01-30T18:18:00.000Z',
  },
];

const exerciseMap = new Map<string, ExerciseRecord>(
  exercisesTable.map((exercise) => [exercise.id, exercise])
);

const routineMap = new Map<string, RoutineRecord>(
  routinesTable.map((routine) => [routine.id, routine])
);

const planMap = new Map<string, PlanRecord>(
  plansTable.map((plan) => [plan.id, plan])
);

function buildRoutine(routineRecord: RoutineRecord): Routine {
  const exercises = routineRecord.exerciseIds
    .map((id) => exerciseMap.get(id))
    .filter((exercise): exercise is Exercise => Boolean(exercise));

  return {
    id: routineRecord.id,
    name: routineRecord.name,
    description: routineRecord.description,
    duration: routineRecord.duration,
    calories: routineRecord.calories,
    difficulty: routineRecord.difficulty,
    lastCompleted: routineRecord.lastCompleted,
    exercises,
  };
}

function buildPlan(planRecord: PlanRecord): Plan {
  const routines = planRecord.routineIds
    .map((id) => routineMap.get(id))
    .filter((routine): routine is RoutineRecord => Boolean(routine))
    .map(buildRoutine);

  return {
    id: planRecord.id,
    name: planRecord.name,
    description: planRecord.description,
    difficulty: planRecord.difficulty,
    frequency: planRecord.frequency,
    image: planRecord.image,
    routines,
  };
}

export function getUserProfile(userId: string): UserProfile | null {
  return usersTable.find((user) => user.id === userId) ?? null;
}

export function getPlansForUser(userId: string): PlanRecord[] {
  const user = getUserProfile(userId);
  if (!user) return [];

  return user.planIds
    .map((id) => planMap.get(id))
    .filter((plan): plan is PlanRecord => Boolean(plan));
}

export function getPlanById(planId: string): Plan | null {
  const planRecord = planMap.get(planId);
  return planRecord ? buildPlan(planRecord) : null;
}

export function getRoutineById(routineId: string): Routine | null {
  const routineRecord = routineMap.get(routineId);
  return routineRecord ? buildRoutine(routineRecord) : null;
}

export function getActivePlanForUser(userId: string): Plan | null {
  const user = getUserProfile(userId);
  if (!user?.activePlanId) return null;
  return getPlanById(user.activePlanId);
}

export function getRoutineCompletionIds(userId: string, planId: string): Set<string> {
  return new Set(
    routineCompletionsTable
      .filter((record) => record.userId === userId && record.planId === planId)
      .map((record) => record.routineId)
  );
}

export function getExerciseCompletionIds(
  userId: string,
  planId: string,
  routineId: string
): Set<string> {
  return new Set(
    exerciseCompletionsTable
      .filter(
        (record) =>
          record.userId === userId &&
          record.planId === planId &&
          record.routineId === routineId
      )
      .map((record) => record.exerciseId)
  );
}

// Storage keys for localStorage
const completionStorageKeys = {
  routines: 'gym-planner:routine-completions',
  exercises: 'gym-planner:exercise-completions',
};

export function readRoutineCompletionStorage(): RoutineCompletionRecord[] {
  if (typeof window === 'undefined') return [];
  const stored = window.localStorage.getItem(completionStorageKeys.routines);
  if (!stored) return [];

  try {
    return JSON.parse(stored) as RoutineCompletionRecord[];
  } catch {
    return [];
  }
}

export function readExerciseCompletionStorage(): ExerciseCompletionRecord[] {
  if (typeof window === 'undefined') return [];
  const stored = window.localStorage.getItem(completionStorageKeys.exercises);
  if (!stored) return [];

  try {
    return JSON.parse(stored) as ExerciseCompletionRecord[];
  } catch {
    return [];
  }
}

export function writeRoutineCompletionStorage(records: RoutineCompletionRecord[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(completionStorageKeys.routines, JSON.stringify(records));
}

export function writeExerciseCompletionStorage(records: ExerciseCompletionRecord[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(completionStorageKeys.exercises, JSON.stringify(records));
}

export function getUserData(userId: string): UserData | null {
  const user = usersTable.find((u) => u.id === userId);
  if (!user) return null;

  const plans = user.planIds
    .map((id) => planMap.get(id))
    .filter((plan): plan is PlanRecord => Boolean(plan))
    .map(buildPlan);

  return {
    id: user.id,
    name: user.name,
    activePlanId: user.activePlanId,
    profileImage: user.profileImage,
    plans,
  };
}

export const mockUserData: UserData = getUserData('user_1') ?? {
  id: 'user_1',
  name: 'Unknown User',
  activePlanId: null,
  plans: [],
};
