"use client";

// Lifts.js
import React, { useEffect, useState } from "react";
import ExerciseForm from "./ExerciseForm";
import DataTable from "./DataTable";
import columns from "./Columns";
import { LiftsForm } from "./LiftsForm";

const Lifts = () => {
  const [lifts, setLifts] = useState([]);
  const [muscleType, setMuscleType] = useState("");

  const apiUrl = `https://api.api-ninjas.com/v1/exercises?muscle=${muscleType}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "X-Api-Key": "vjWYBohac5H2XORXnBSkjg==S4vvZl7nnLimZMaB",
          },
        });

        if (!response.ok) {
          throw new Error(`Network response was not okay: ${response.status}`);
        }

        const responseData = await response.json();
        setLifts(responseData);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (muscleType) {
      fetchData();
    }
  }, [apiUrl, muscleType]);

  const handleMuscleSelect = (selectedMuscle) => {
    setMuscleType(selectedMuscle);
  };

  const muscleGroups = [
    {
      id: "biceps",
      label: "Biceps",
    },
    {
      id: "calves",
      label: "Calves",
    },
    {
      id: "chest",
      label: "Chest",
    },
    {
      id: "forearms",
      label: "Forearms",
    },
    {
      id: "glutes",
      label: "Glutes",
    },
    {
      id: "hamstrings",
      label: "Hamstrings",
    },
    {
      id: "lats",
      label: "Lats",
    },
    {
      id: "lower_back",
      label: "Lower Back",
    },
    {
      id: "middle_back",
      label: "Middle Back",
    },
    {
      id: "neck",
      label: "Neck",
    },
    {
      id: "quadriceps",
      label: "Quadriceps",
    },
    {
      id: "traps",
      label: "Traps",
    },
    {
      id: "triceps",
      label: "Triceps",
    },
    {
      id: "abdominals",
      label: "Abdominals",
    },
  ];

  return (
    <div className="container mx-auto py-10">
      {/* <ExerciseForm onMuscleSelect={handleMuscleSelect} /> */}
      <LiftsForm options={muscleGroups} onMuscleSelect={handleMuscleSelect} />
      <DataTable columns={columns} lifts={lifts} />
    </div>
  );
};

export default Lifts;
