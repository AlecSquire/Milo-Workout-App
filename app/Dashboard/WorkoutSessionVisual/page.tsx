"use client";
import React from "react";
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

export default function WorkoutSessionVisual() {
  return (
    <div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg p-6 md:p-8 lg:p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold">Morning Jog</h2>
            <p className="text-gray-500 dark:text-gray-400">
              June 1, 2024 - 7:00 AM
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              Duration: 45 minutes
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold">Performance Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <h4 className="text-lg font-medium mb-2">Heart Rate</h4>
                <LineChartComponent className="aspect-[4/3]" />
              </div>
              <div>
                <h4 className="text-lg font-medium mb-2">Calories Burned</h4>
                <BarChartComponent className="aspect-[4/3]" />
              </div>
              <div>
                <h4 className="text-lg font-medium mb-2">Distance</h4>
                <p className="text-2xl font-bold">5.2 mi</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Workout Breakdown</h3>
          <div className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 md:gap-6">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1 text-sm">
                Warm-up
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">
                  Duration: 5 minutes
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  Avg. Heart Rate: 90 bpm
                </p>
                <p className="text-gray-500 dark:text-gray-400">Calories: 25</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">25 Cal</p>
              </div>
            </div>
            <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 md:gap-6">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1 text-sm">
                Jogging
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">
                  Duration: 35 minutes
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  Avg. Heart Rate: 145 bpm
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  Calories: 325
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">325 Cal</p>
              </div>
            </div>
            <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 md:gap-6">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1 text-sm">
                Cool-down
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">
                  Duration: 5 minutes
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  Avg. Heart Rate: 100 bpm
                </p>
                <p className="text-gray-500 dark:text-gray-400">Calories: 20</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">20 Cal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 md:mt-8 lg:mt-10 space-y-4 md:space-y-6">
        <h3 className="text-xl font-bold">Your Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div>
            <h4 className="text-lg font-medium mb-2">Personal Bests</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p>Fastest 5K</p>
                <p className="font-bold">22:15</p>
              </div>
              <div className="flex items-center justify-between">
                <p>Highest Calorie Burn</p>
                <p className="font-bold">450 Cal</p>
              </div>
              <div className="flex items-center justify-between">
                <p>Longest Distance</p>
                <p className="font-bold">7.1 mi</p>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-medium mb-2">Improvement Areas</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p>Average Heart Rate</p>
                <p className="font-bold">145 bpm</p>
              </div>
              <div className="flex items-center justify-between">
                <p>Calories per Mile</p>
                <p className="font-bold">62 Cal</p>
              </div>
              <div className="flex items-center justify-between">
                <p>Pace</p>
                <p className="font-bold">8:40 min/mi</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BarChartComponent(props: any) {
  const data = [
    { name: "Jan", count: 111 },
    { name: "Feb", count: 157 },
    { name: "Mar", count: 129 },
    { name: "Apr", count: 150 },
    { name: "May", count: 119 },
    { name: "Jun", count: 72 },
  ];

  return (
    <div {...props}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#2563eb" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function LineChartComponent(props: any) {
  const data = [
    { name: "Jan", Desktop: 43, Mobile: 60 },
    { name: "Feb", Desktop: 137, Mobile: 48 },
    { name: "Mar", Desktop: 61, Mobile: 177 },
    { name: "Apr", Desktop: 145, Mobile: 78 },
    { name: "May", Desktop: 26, Mobile: 96 },
    { name: "Jun", Desktop: 154, Mobile: 204 },
  ];

  return (
    <div {...props}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Desktop" stroke="#2563eb" />
          <Line type="monotone" dataKey="Mobile" stroke="#e11d48" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
