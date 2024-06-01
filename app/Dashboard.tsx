import React from "react";
import useSessionData from "../lib/useSessionData";
import { ExerciseDetail, WorkoutDetail, Session } from "../types";

const Dashboard = () => {
  const { sessionData, loading } = useSessionData();
  console.log(sessionData);

  if (loading) {
    return <p>Loading session data...</p>;
  }

  return (
    <>
      <h1>Training History </h1>
      {sessionData && (
        <ul>
          {sessionData.map((workout, index) => (
            <li key={index}>
              <p>Workout Name: {workout.workout[0].workoutName}</p>
              <p>Description: {workout.workout[0].description}</p>
              <p>Session Date: {new Date(workout.date).toLocaleDateString()}</p>
              <br />
              <ul>
                {workout.workout[0].workout.map((exerciseDetail, idx) => (
                  <li key={idx}>
                    <p>
                      Exercise {idx + 1}: {exerciseDetail.exercise}
                    </p>
                    <p>Sets: {exerciseDetail.sets}</p>
                    <p>Reps: {exerciseDetail.reps}</p>
                    <p>
                      Weight:{" "}
                      {exerciseDetail.weight
                        ? exerciseDetail.weight
                        : "Body Weight"}
                    </p>
                    <p>Complete: {exerciseDetail.complete ? "Yes" : "No"}</p>
                    <br />
                    <br />
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Dashboard;
