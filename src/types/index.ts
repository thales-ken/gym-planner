export interface Exercise {
  id: string;
  name: string;
  muscleGroups: string[];
  sets: number;
  reps: number;
  icon?: string;
}

export interface Routine {
  id: string;
  name: string;
  description: string;
  exercises: Exercise[];
  duration: number; // in minutes
  calories: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  lastCompleted?: string; // date string
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  routines: Routine[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  frequency: string; // e.g., "6x/week"
  image?: string;
}

export interface UserData {
  id: string;
  name: string;
  activePlanId: string | null;
  plans: Plan[];
  profileImage?: string;
}

export interface RoutineCompletion {
  routineId: string;
  date: string;
  completed: boolean;
}

export interface RoutineCompletionRecord {
  id: string;
  userId: string;
  planId: string;
  routineId: string;
  completedAt: string;
}

export interface ExerciseCompletionRecord {
  id: string;
  userId: string;
  planId: string;
  routineId: string;
  exerciseId: string;
  completedAt: string;
}

// Normalized table records (mock database structure)
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  password: string;
  profileImage?: string;
  activePlanId: string | null;
  planIds: string[];
}

export interface AuthSession {
  userId: string;
  email: string;
  name: string;
  expiresAt: number;
}

export interface PlanRecord {
  id: string;
  name: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  frequency: string;
  image?: string;
  routineIds: string[];
}

export interface RoutineRecord {
  id: string;
  name: string;
  description: string;
  duration: number;
  calories: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  lastCompleted?: string;
  exerciseIds: string[];
}

export interface ExerciseRecord {
  id: string;
  name: string;
  muscleGroups: string[];
  sets: number;
  reps: number;
  icon?: string;
}
