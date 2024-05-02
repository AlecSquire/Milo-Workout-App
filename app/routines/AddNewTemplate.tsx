"use client";
import React from "react";
import { VscAdd } from "react-icons/vsc";

import { useRouter } from "next/navigation";

const AddNewTemplate = () => {
  const router = useRouter();

  //create a new dynamic url
  //create new collection in DB (empty template)
  const handleClick = () => {
    router.push("routines/[RoutineID]");
  };
  return (
    <div className="flex flex-wrap gap-4">
      <div className="w-64 p-4 border border-gray-300 rounded cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md">
        <VscAdd style={{ width: "200px" }} onClick={handleClick} />
      </div>
    </div>
  );
};

export default AddNewTemplate;
