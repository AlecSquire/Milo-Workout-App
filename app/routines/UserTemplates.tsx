"use client";
import { useEffect, useState, FormEvent } from "react";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  collection,
  getDocs,
  addDoc,
  query,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/firebase/config";
type UserTemplates = Array<{ item: string; description: string }>;
type routinesArray = {
  id: number;
};
interface Routine {
  item: string;
  description: string;
  id?: number;
}

const UserTemplates: React.FC = ({ userTemplates, setUserTemplates }) => {
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
  }, []);

  return (
    <Card style={{ height: "70vh", overflowY: "auto" }}>
      {userTemplates.map((routine, index) => (
        <div
          key={index}
          className="w-64 p-4 border border-gray-300 rounded cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md mb-4"
        >
          <h2 className="text-lg font-bold mb-2">{routine.item}</h2>
          <p className="text-sm text-gray-700  mb-4">{routine.description}</p>
        </div>
      ))}
    </Card>
  );
};
export default UserTemplates;
