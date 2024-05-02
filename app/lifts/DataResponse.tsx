// Lifts.js
import React, { useEffect, useState } from "react";
import { loadEnvConfig } from "@next/env";
const DataResponse = ({ finalURL }) => {
  const [lifts, setLifts] = useState([]);
  console.log(lifts);
  console.log(finalURL);
  console.log(process.env.NEXT_PUBLIC_REACT_APP_API_KEY);
  console.log(process.env);

  useEffect(() => {
    const fetchData = async () => {
      if (finalURL) {
        try {
          const response = await fetch(finalURL, {
            method: "GET",
            headers: {
              "X-Api-Key": process.env.NEXT_PUBLIC_REACT_APP_API_KEY,
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
