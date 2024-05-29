import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "@/firebase/config";
import { FormFields } from "@/types";
import { useState, useEffect } from "react";

// Custom hook to fetch user-specific routines
const useFetchUserRoutines = (): [
  FormFields[],
  boolean,
  any,
  React.Dispatch<React.SetStateAction<FormFields[]>>
] => {
  const [userRoutines, setUserRoutines] = useState<FormFields[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
          throw new Error("No user is signed in.");
        }

        const userID = user.uid;
        const routinesRef = collection(db, "routines");
        const q = query(routinesRef, where("userID", "==", userID));
        const querySnapshot = await getDocs(q);

        const fetchedRoutines: FormFields[] = [];
        querySnapshot.forEach((doc) => {
          fetchedRoutines.push({ id: doc.id, ...doc.data() } as FormFields);
        });

        setUserRoutines(fetchedRoutines);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutines();
  }, []);

  return [userRoutines, loading, error, setUserRoutines];
};

export default useFetchUserRoutines;
