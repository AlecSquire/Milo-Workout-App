import { useEffect } from "react";
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

const useFetchRoutine = (
  routineID: string,
  setUserTemplate: (templates: StartNewForm[]) => void
) => {
  useEffect(() => {
    const fetchDocumentData = async () => {
      try {
        const userRoutinesRef = collection(db, "routines");
        const q = query(userRoutinesRef, where("id", "==", routineID));
        const querySnapshot = await getDocs(q);

        const routineData: StartNewForm[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data() as FormFields;
          routineData.push({ id: doc.id, ...data } as const);
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
  }, [routineID, setUserTemplate]);
};

export default useFetchRoutine;
