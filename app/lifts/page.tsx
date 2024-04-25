"use client";
import React, { useState, useEffect } from "react";
import DataTable from "./DataTable";
import columns from "./Columns";

const Lifts = () => {
  const [lifts, setLifts] = useState([]);
  // Use a state or context if you plan to make it dynamic
  const muscleType = "traps";

  const apiUrl = `https://api.api-ninjas.com/v1/exercises?${muscleType}=`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl, {
          method: "GET", // method is optional since GET is the default
          headers: {
            "X-Api-Key": "vjWYBohac5H2XORXnBSkjg==S4vvZl7nnLimZMaB",
          },
          // contentType header is not needed when making GET requests, it's mainly for POST/PUT requests
        });

        if (!response.ok) {
          throw new Error(`Network response was not okay: ${response.status}`);
        }

        const responseData = await response.json();
        setLifts(responseData); // Assuming responseData is directly an array of exercises
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [apiUrl]); // Depend on apiUrl to refetch if it changes

  return (
    <div>
      {lifts.map(
        (
          { name, type, muscle, equipment, difficulty, instructions },
          index
        ) => (
          <div key={index}></div>
        )
      )}
      <div className="container mx-auto py-10">
        {/* <DataTable columns={columns} data={data} /> */}

        <DataTable columns={columns} lifts={lifts} />
      </div>
    </div>
  );
};

export default Lifts;
