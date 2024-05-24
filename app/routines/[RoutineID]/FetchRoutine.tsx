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
import UserTemplates from "../UserTemplates";
import RoutineDataTable from "./RoutineDataTable";

interface FetchRoutineProps {
  routineID?: string;
  setUserTemplate: React.Dispatch<React.SetStateAction<StartNewForm[]>>;
  userTemplate: StartNewForm[];
}

const FetchRoutine: React.FC<FetchRoutineProps> = ({
  routineID,
  setUserTemplate,
  userTemplate,
}) => {
  const [lifts, setLifts] = useState<StartNewForm[]>([]);
  console.log(lifts);

  useEffect(() => {
    const fetchDocumentData = async () => {
      try {
        const userRoutinesRef = collection(db, "userRoutines");
        const snapshot = await getDocs(userRoutinesRef);
        const routineData: StartNewForm[] = [];

        snapshot.forEach((doc) => {
          const data = doc.data() as StartNewForm;
          if (data.id === routineID) {
            routineData.push({ id: doc.id, ...data });
          }
        });

        if (routineData.length > 0) {
          setLifts(routineData);
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
      <RoutineDataTable lifts={lifts} />
    </div>
  );
};

export default FetchRoutine;
