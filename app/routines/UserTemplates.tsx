"use client";

import { useEffect, useState, FormEvent } from "react";
import {
  collection,
  getDocs,
  addDoc,
  query,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/firebase/config";

import { VscAdd } from "react-icons/vsc";

type UserTemplates = Array<{ item: string; description: string }>;
type routinesArray = {
  id: number;
};
interface Routine {
  item: string;
  description: string;
  id?: number;
}

const UserTemplates: React.FC = () => {
  const [newRoutine, setNewRoutine] = useState<Routine>({
    item: "",
    description: "",
  });
  const [userTemplates, setUserTemplates] = useState<Routine[]>([]);

  //add item to DB
  const addRoutine = async (e: FormEvent) => {
    e.preventDefault();
    if (newRoutine.item && newRoutine.description) {
      try {
        const docRef = await addDoc(collection(db, "userRoutines"), {
          item: newRoutine.item,
          description: newRoutine.description,
        });
        console.log("Document written with ID: ", docRef.id);
        setNewRoutine({ item: "", description: "" }); // Reset the form
        // fetchRoutines(); // Refresh the list of routines
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };

  useEffect(() => {
    const q = query(collection(db, "userRoutines"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let routinesArray: Routine[] = [];

      querySnapshot.forEach((doc) => {
        routinesArray.push({ ...doc.data(), id: doc.id });
      });
      setUserTemplates(routinesArray);
    });

    // Cleanup function to unsubscribe when component unmounts or when the effect is re-run
    return () => {
      unsubscribe();
    };
  }, []); // Empty dependencies array means the effect runs only once after the initial render
  //delete  item to DB

  return (
    <>
      <div className="flex flex-col">
        <form>
          <div className="flex flex-col w-60 p-3 border col-span-10">
            <input
              onChange={(e) =>
                setNewRoutine({ ...newRoutine, item: e.target.value })
              }
              name="item"
              type="text"
              placeholder="Enter routine name"
              value={newRoutine.item}
            />
            <input
              onChange={(e) =>
                setNewRoutine({ ...newRoutine, description: e.target.value })
              }
              value={newRoutine.description}
              name="description"
              type="text"
              placeholder="Enter routine description"
            />
          </div>
          <button
            type="submit"
            className="border col-span-3"
            onClick={addRoutine}
          >
            <VscAdd style={{ width: "200px" }} />
          </button>
        </form>
        {userTemplates.map((routine, index) => (
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
export default UserTemplates;
