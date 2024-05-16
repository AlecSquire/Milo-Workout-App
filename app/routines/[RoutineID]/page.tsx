"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import { FormFields, StartNewForm } from "@/types";
import { useRouter } from "next/navigation";

const UserRoutine = ({ params }: { params: { RoutineID: string } }) => {
  const [userTemplate, setUserTemplate] = useState<StartNewForm[]>([]);
  const routineID = params.RoutineID;

  useEffect(() => {
    const fetchDocumentData = async () => {
      const docRef = doc(db, "userRoutines");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    fetchDocumentData();
  }, []);

  // Effect to fetch all document data in the collection
  useEffect(() => {
    const fetchDocumentData = async () => {
      try {
        const userRoutinesRef = collection(db, "userRoutines");
        const snapshot = await getDocs(userRoutinesRef);
        const routineData: FormFields[] = [];

        snapshot.forEach((doc) => {
          const data = doc.data() as FormFields;
          if (data.workoutName === routineID) {
            routineData.push({ id: doc.id, ...data });
          }
        });

        if (routineData.length > 0) {
          setUserTemplate(routineData);
        } else {
          console.warn(`No routines found with the workoutName: ${routineID}`);
        }
      } catch (error) {
        console.error("Error fetching document data:", error);
      }
    };

    fetchDocumentData();
  }, [routineID]);

  return (
    <div>
      My Post: {params.RoutineID}
      <Card style={{ height: "70vh", overflowY: "auto" }}>
        {userTemplate.length > 0 ? (
          userTemplate.map((routine) => (
            <div key={routine.id} className="routine-item">
              <h2>{routine.workoutName}</h2>
              <p>{routine.description}</p>
              {/* Display additional fields if needed */}
              {routine.workout &&
                routine.workout.map((workoutItem, index) => (
                  <div key={index}>
                    <p>Exercise: {workoutItem.exercise}</p>
                    <p>Sets: {workoutItem.sets}</p>
                    <p>Reps: {workoutItem.reps}</p>
                    <p>Weight: {workoutItem.weight}</p>
                  </div>
                ))}
            </div>
          ))
        ) : (
          <p>No routine found with the given ID.</p>
        )}
      </Card>
    </div>
  );
};

export default UserRoutine;
