"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";

import { db } from "@/firebase/config";
import { FormFields, StartNewForm } from "@/types";
import { useRouter } from "next/navigation";
import UserTemplates from "../UserTemplates";
import RoutineDataTable from "./RoutineDataTable";

interface FetchRoutineProps {
  routineID?: string;
  TimeStamp?: string;
  setUserTemplate: React.Dispatch<React.SetStateAction<StartNewForm[]>>;
  userTemplate: StartNewForm[];
}

const FetchRoutine: React.FC<FetchRoutineProps> = ({
  routineID,
  setUserTemplate,
  userTemplate,
}) => {
  const [lifts, setLifts] = useState<FormFields[]>([]);
  console.log(lifts);

  useEffect(() => {
    const fetchDocumentData = async () => {
      try {
        const userRoutinesRef = collection(db, "routines");
        const q = query(
          userRoutinesRef,
          where("id", "==", routineID),
          // orderBy("timestamp", "desc"),
          limit(1)
        );
        const snapshot = await getDocs(q);
        const routineData: FormFields[] = [];

        snapshot.forEach((doc) => {
          const data = doc.data() as any;
          routineData.push({ id: doc.id, ...data });
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
      <RoutineDataTable lifts={lifts} routineID={routineID} />
    </div>
  );
};

export default FetchRoutine;
