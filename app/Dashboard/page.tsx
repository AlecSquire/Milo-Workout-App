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
import { ScrollArea } from "@/components/ui/scroll-area";

const Dashboard = () => {
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
      {/* <ScrollArea className="w-96 whitespace-nowrap rounded-md border"> */}
      <div className="flex w-max space-x-4 p-4"></div>
      <h1 className="text-2xl font-bold">Workout History</h1>
      {/* <ScrollArea className="w-96 whitespace-nowrap rounded-md border"> */}
      <div className="flex w-max space-x-4 p-4">
        <WorkoutHistory />
      </div>
      {/* </ScrollArea> */}
      <h1 className="text-2xl font-bold">Workout Data</h1>
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

export default Dashboard;
