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
import { FormFields, Lift, StartNewForm, WorkoutItem } from "@/types";
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
  const [lifts, setLifts] = useState<Lift[]>([]);
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
        const routineData: Lift[] = [];

        snapshot.forEach((doc) => {
          const data = doc.data() as FormFields;
          // Ensure description is always a string
          const lift: Lift = {
            ...data,
            id: doc.id,
            description: data.description || "",
            userID: data.userID || "",
          };
          routineData.push(lift);
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
