import { useEffect } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/config";

const useAddDB = () => {
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
};

export default useAddDB;
