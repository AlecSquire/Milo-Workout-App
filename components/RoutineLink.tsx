"use client";
import { useRouter } from "next/navigation";
import React from "react";

// Define the props interface
interface RoutineProps {
  routineId: string;
}

const RoutineLink: React.FC<RoutineProps> = ({ routineId }) => {
  // Get the router instance
  const router = useRouter();

  const handleClick = () => {
    // Replace spaces with hyphens for a more readable URL
    const formattedRoutineId = routineId.replace(/\s+/g, "-");

    // Remove trailing hyphen if present
    const finalRoutineId = formattedRoutineId.replace(/-+$/, "");

    // Navigate to the dynamic route with correct pathname
    router.push(`/routines/${finalRoutineId}`);
  };

  return (
    // Attach the onClick handler to your clickable element
    <button onClick={handleClick}>Go to Routine {routineId}</button>
  );
};

export default RoutineLink;
