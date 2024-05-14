// import { useEffect, useState } from "react";
// import { collection, query, onSnapshot } from "firebase/firestore";
// import { db } from "@/firebase/config";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import { Card } from "@/components/ui/card";
// import DropDown from "./DropDown";

// const PreBuiltTemplates = () => {
//   interface Routine {
//     name: string;
//     description: string;
//     id?: string;
//   }

//   const [preBuiltRoutinesArray, setPreBuiltRoutinesArray] = useState<Routine[]>(
//     []
//   );

//   useEffect(() => {
//     const q = query(collection(db, "preBuiltRoutines"));
//     const unsubscribe = onSnapshot(q, (querySnapshot) => {
//       let preBuiltRoutinesArray: Routine[] = [];

//       querySnapshot.forEach((doc) => {
//         preBuiltRoutinesArray.push({ ...doc.data(), id: doc.id });
//       });
//       setPreBuiltRoutinesArray(preBuiltRoutinesArray);
//     });

//     // Cleanup function to unsubscribe when component unmounts or when the effect is re-run
//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   return (
//     <Card style={{ height: "70vh", overflowY: "auto" }}>
//       {preBuiltRoutinesArray.map((routine, index) => (
//         <div
//           key={index.name}
//           className="w-100% p-4 border border-gray-300 rounded cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md"
//         >
//           <h2 className="text-lg font-bold mb-2">{routine.name}</h2>
//           <p className="text-sm text-gray-700  mb-4">{routine.description}</p>

//           <DropDown />
//         </div>
//       ))}
//     </Card>
//   );
// };

// export default PreBuiltTemplates;
