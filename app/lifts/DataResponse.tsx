"use client";

// Lifts.js
import React, { useEffect, useState } from "react";

const DataResponse = ({ finalURL }) => {
  const [lifts, setLifts] = useState([]);
  console.log(lifts);
  console.log(finalURL);

  useEffect(() => {
    const fetchData = async () => {
      if (finalURL) {
        try {
          const response = await fetch(finalURL, {
            method: "GET",
            headers: {
              "X-Api-Key": "vjWYBohac5H2XORXnBSkjg==S4vvZl7nnLimZMaB",
            },
          });

          if (!response.ok) {
            throw new Error(
              `Network response was not okay: ${response.status}`
            );
          }

          const responseData = await response.json();
          setLifts(responseData);
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };

    fetchData();
  }, [finalURL]); // Fetch data whenever finalURL changes
  return (
    <>
      <p>hello</p>
      {lifts.map((lift, key) => (
        <div key={key}>
          <p>{lift.name}</p>
          <p>{lift.type}</p>
          <p>{lift.muscle}</p>
          <p>{lift.equipment}</p>
          <p>{lift.difficulty}</p>
          <p>{lift.instructions}</p>

          <span>-----</span>
        </div>
      ))}
    </>
  );
};
export default DataResponse;
