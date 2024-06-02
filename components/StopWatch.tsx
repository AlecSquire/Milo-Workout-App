// "use client";
// import { useState, useEffect } from "react";
// import { TiStopwatch } from "react-icons/ti";

// const StopWatch = () => {
//   const [seconds, setSeconds] = useState(0);
//   const [isActive, setIsActive] = useState(false);

//   useEffect(() => {
//     let interval = null;
//     if (isActive) {
//       interval = setInterval(() => {
//         setSeconds((seconds) => seconds + 1);
//       }, 1000);
//     } else if (!isActive && seconds !== 0) {
//       clearInterval(interval);
//     }
//     return () => clearInterval(interval);
//   }, [isActive, seconds]);

//   const handleStartStop = () => {
//     setIsActive(!isActive);
//   };

//   const handleReset = () => {
//     setSeconds(0);
//     setIsActive(false);
//   };

//   return (
//     <div className="">
//       <TiStopwatch />

//       <div className="timer" style={{ fontSize: "2rem" }}>
//         {seconds}s
//       </div>
//       <div className="buttons" style={{ marginTop: "1rem" }}>
//         <button
//           className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
//           onClick={handleStartStop}
//         >
//           {isActive ? "Pause" : "Start"}
//         </button>
//         <button
//           className="px-4 py-2 bg-red-500 text-white rounded-md"
//           onClick={handleReset}
//         >
//           Reset
//         </button>
//       </div>
//     </div>
//   );
// };

// export default StopWatch;
