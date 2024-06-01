import React from "react";
import useSessionData from "../../lib/useSessionData";
import WorkoutHistory from "@/components/WorkoutHistory";
import { ExerciseDetail, WorkoutDetail, Session } from "@/types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";

const DashboardPage = () => {
  const { sessionData, loading } = useSessionData();
  console.log(sessionData);

  if (loading) {
    return <p>Loading session data...</p>;
  }

  // Prepare data for the charts
  const chartData = sessionData?.flatMap((workout) =>
    workout.workout[0].workout.map((exerciseDetail) => ({
      date: new Date(workout.date).toLocaleDateString(),
      exercise: exerciseDetail.exercise,
      sets: parseInt(exerciseDetail.sets, 10),
      reps: parseInt(exerciseDetail.reps, 10),
      weight: parseFloat(exerciseDetail.weight),
    }))
  );

  return (
    <>
      <WorkoutHistory />
      <h1>Training History</h1>
      {/* {sessionData && (
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
      )} */}

      {/* Line Chart for Reps Over Time */}
      <h2>Reps Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="reps" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>

      {/* Bar Chart for Weight Lifted */}
      <h2>Weight Lifted</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="weight" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default DashboardPage;
