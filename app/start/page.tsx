import StopWatch from "@/components/StopWatch";
import React from "react";
import StartBlankWorkoutForm from "./StartBlankWorkoutForm";

const StartWorkout = () => {
  return (
    <>
      <div className="flex flex-col h-96 ">
        <StopWatch />

        <StartBlankWorkoutForm />
      </div>
    </>
  );
};

export default StartWorkout;
