"use client";
import { useState } from "react";
import ExerciseForm from "./ExerciseForm";
import DataTable from "./DataTable";
import { Card } from "@/components/ui/card";

async function fetchWorkouts(queryParams: string) {
  const res = await fetch(`/api/fetchWorkout?${queryParams}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch workouts");
  }
  return res.json();
}

export default function Lifts() {
  const [muscleType, setMuscleType] = useState<string[]>([]);
  const [name, setName] = useState<string>("");
  const [exercise, setExercise] = useState<string>("");
  const [lifts, setLifts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetch = async () => {
    const queryParams = new URLSearchParams();
    if (muscleType.length > 0)
      queryParams.append("muscle", muscleType.join(","));
    if (name) queryParams.append("name", name);
    if (exercise) queryParams.append("type", exercise);

    setLoading(true);
    setError(null);
    try {
      const data = await fetchWorkouts(queryParams.toString());
      setLifts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
    setLoading(false);
  };

  return (
    <Card>
      {loading && <p>Loading...</p>}
      {error && <p>Error loading data: {error}</p>}

      <ExerciseForm
        onMuscleSelect={setMuscleType}
        onName={setName}
        onExerciseType={setExercise}
        onFetch={handleFetch}
        isLoading={loading}
      />
      <DataTable lifts={lifts} />
    </Card>
  );
}
