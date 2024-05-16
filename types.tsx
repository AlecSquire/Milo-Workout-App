export interface FormFields {
  id: string;
  workoutName: string;
  description?: string;
  workout: IWorkout[]; // Array of IWorkout objects
}

export interface IWorkout {
  exercise: string;
  reps: number | string;
  sets: number;
  weight: number;
  complete: boolean;
}

export type StartNewForm = {
  id: string;
  workoutName: string;
  description?: string;
  workout: Array<{
    exercise: string;
    reps: number | string;
    sets: number;
    weight: number;
    complete: boolean;
  }>;
};
