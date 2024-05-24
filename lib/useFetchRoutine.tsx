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

interface FormFields {
  id: string;
  // Define other properties of FormFields interface here
}

interface StartNewForm {
  // Define properties of StartNewForm interface here
}

const useFetchRoutine = (
  routineID: string,
  setUserTemplate: (templates: StartNewForm[]) => void
) => {
  useEffect(() => {
    const fetchDocumentData = async () => {
      try {
        const userRoutinesRef = collection(db, "userRoutines");
        const q = query(userRoutinesRef, where("id", "==", routineID));
        const querySnapshot = await getDocs(q);

        const routineData: StartNewForm[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data() as FormFields;
          routineData.push({ id: doc.id, ...data });
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
