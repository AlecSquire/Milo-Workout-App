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
