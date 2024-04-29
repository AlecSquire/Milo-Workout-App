// import { useEffect, useState } from "react";

// const ApiCall = ({ lifts, setLifts }) => {
//   const [muscleType, setMuscleType] = useState("neck"); // Define muscleType using useState

//   // Now muscleType is accessible here

//   const apiUrl = `https://api.api-ninjas.com/v1/exercises?muscle=${muscleType}`;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(apiUrl, {
//           method: "GET",
//           headers: {
//             "X-Api-Key": "vjWYBohac5H2XORXnBSkjg==S4vvZl7nnLimZMaB",
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`Network response was not okay: ${response.status}`);
//         }

//         const responseData = await response.json();
//         setLifts(responseData);
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     };

//     fetchData();
//   }, [apiUrl]); // Depend on apiUrl to refetch if it changes

//   return <div></div>;
// };

// export default ApiCall;
