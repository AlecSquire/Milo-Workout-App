"use client";
import { useEffect, useState } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/config";

const PreBuiltTemplates = () => {
  interface Routine {
    item: string;
    description: string;
    id?: string | number;
  }

  const [preBuiltRoutinesArray, setPreBuiltRoutinesArray] = useState<Routine[]>(
    []
  );

  useEffect(() => {
    const q = query(collection(db, "preBuiltRoutines"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let preBuiltRoutinesArray: Routine[] = [];

      querySnapshot.forEach((doc) => {
        preBuiltRoutinesArray.push({ ...doc.data(), id: doc.id });
      });
      setPreBuiltRoutinesArray(preBuiltRoutinesArray);
    });

    // Cleanup function to unsubscribe when component unmounts or when the effect is re-run
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <div className="flex flex-col">
        {preBuiltRoutinesArray.map((routine, index) => (
          <div key={index} className="flex flex-wrap gap-4 mb-4">
            <div className="w-64 p-4 border border-gray-300 rounded cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md">
              <h2 className="text-lg font-bold mb-2">{routine.item}</h2>
              <p className="text-sm text-gray-700  mb-4">
                {routine.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PreBuiltTemplates;
