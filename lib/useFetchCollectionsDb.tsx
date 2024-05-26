import {
  collection,
  getDoc,
  addDoc,
  query,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/firebase/config";

import { FormFields } from "@/types";

import { useEffect } from "react";

export function useFetchCollectionsDb(
  setUserTemplates: (data: FormFields[]) => void
) {
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "routines"), (snapshot) => {
      const routinesArray: FormFields[] = [];
      snapshot.forEach((doc) => {
        routinesArray.push({
          ...doc.data(),
          id: doc.workoutName,
        } as FormFields);
        console.log(doc.workoutName);
      });
      setUserTemplates(routinesArray);
    });

    return () => {
      unsubscribe();
    };
  }, []);
}
