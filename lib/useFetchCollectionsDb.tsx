// useFetchCollectionsDb.js
import { useEffect } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/config";
import { FormFields } from "@/types";

export function useFetchCollectionsDb(setUserTemplates: Function) {
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "routines"),
      (snapshot) => {
        const routinesArray = snapshot.docs.map((doc) => ({
          id: doc.id, // Ensure ID is included
          ...doc.data(),
        }));
        setUserTemplates(routinesArray);
      },
      (error) => {
        console.error("Error fetching routines: ", error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [setUserTemplates]);
}
