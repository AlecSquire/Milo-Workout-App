export interface FormFields {
  id: string;
  userID?: string;
  timestamp?: string;
  workoutName: string;
  description?: string;
  workout: IWorkout[]; // Array of IWorkout objects
}

export interface IWorkout {
  exercise: string;
  reps: number | string;
  sets: number;
  weight?: number;
  complete?: boolean;
  previous?: string | number;
}

export type StartNewForm = {
  id: string;
  userID?: string;
  timestamp?: string;
  workoutName: string;
  description?: string;
  workout: Array<{
    exercise: string;
    reps?: number | string;
    sets?: number;
    weight?: number;
    complete?: boolean;
  }>;
};

export type Exercise = {
  name: string;
  type: string;
  muscle: string;
  equipment: string;
  difficulty: string;
  instructions: string;
  select?: boolean;
};

export type User = {
  name: string;
  email: string;
  userID: string;
  img: string;
  personalBest: PersonalBest;
  savedLifts: SavedLift[];
  bio: string;
};
export interface ExerciseDetail {
  sets: string;
  reps: string;
  weight: string;
  complete: boolean;
  exercise: string;
}

// Define the structure of a workout, which includes an array of exercises
export interface WorkoutDetail {
  workout: ExerciseDetail[];
  userID: string;
  id: string;
  description: string;
  workoutName: string;
}

// Define the structure of a session, which includes an array of workouts
export interface Session {
  description: string;
  workoutName: string;
  userID: string;
  sessionID: string;
  workout: WorkoutDetail[];
  date: string; // Use Date type if you plan to parse it to a Date object
}
export type PersonalBest = {
  [exercise: string]: {
    reps: string;
    weight: string;
  };
};

export type SavedLift = {
  exercise: string;
  defaultReps: string;
  defaultSets: string;
  defaultWeight: string;
};
export type Toast = {
  title: React.ReactNode;
  description: React.ReactNode;
  status?: "success" | "error"; // Define the status property
};
