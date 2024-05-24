"use client";

// Lifts.js
import { useEffect, useState } from "react";
import ExerciseForm from "./ExerciseForm";
import DataTable from "./DataTable";
import DataResponse from "./DataResponse";
import { Card } from "@/components/ui/card";
// import ComposableForm from "./ComposableForm";

const Lifts = () => {
  const [lifts, setLifts] = useState([]);
  const [muscleType, setMuscleType] = useState("");
  const [name, setName] = useState("");
  const [exercise, setExercise] = useState("");
  const [apiUrl, setApiUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // API key and base URL
  const headers = { "X-Api-Key": process.env.NEXT_PUBLIC_API_KEY_WORKOUT };

  // Handle selections
  const handleMuscleSelect = (selectedMuscle: string) => {
    setMuscleType(selectedMuscle);
  };

  const handleNameSelect = (selectedName: string) => {
    setName(selectedName);
  };

  const handleExerciseSelect = (selectedExerciseType: string) => {
    setExercise(selectedExerciseType);
  };

  // Effect to fetch data based on state changes
  useEffect(() => {
    // Construct the API URL with dynamic parameters
    const queryParams = new URLSearchParams();
    if (muscleType) queryParams.append("muscle", muscleType);
    if (name) queryParams.append("name", name);
    if (exercise) queryParams.append("type", exercise); // Adjust this key based on your API parameter

    setApiUrl(
      `https://api.api-ninjas.com/v1/exercises?${queryParams.toString()}&offset=2`
    );
  }, [muscleType, name, exercise]);

  return (
    <Card>
      <ExerciseForm
        onMuscleSelect={handleMuscleSelect}
        onName={handleNameSelect}
        onExerciseType={handleExerciseSelect}
        isLoading={isLoading}
      />

      <DataResponse
        finalURL={apiUrl}
        headers={headers}
        onLiftsLoaded={setLifts}
        setIsLoading={setIsLoading}
      />
      <DataTable lifts={lifts} />
    </Card>
  );
};

export default Lifts;
