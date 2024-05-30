export interface FormFields {
  id: string;
  userID: string;
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
  userID: string;
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
  session: Session;
  personalBest: PersonalBest;
  savedLifts: SavedLift[];
};
export type Session = {
  sessionID: string;
  userID: string;
  date: string;
  workoutName: string;
  description: string;
  workout: Array<IWorkout>;
};
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
