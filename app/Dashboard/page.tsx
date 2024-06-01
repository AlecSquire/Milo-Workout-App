"use client";
import React from "react";
import useSessionData from "../../lib/useSessionData"; // Ensure the import path is correct
import WorkoutHistory from "@/components/WorkoutHistory";
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
      <h1 className="text-xl rounded-md p-2 bg-orange-500">
        Still Under Construction
      </h1>
      <WorkoutHistory />
      <h1>Training History</h1>

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
