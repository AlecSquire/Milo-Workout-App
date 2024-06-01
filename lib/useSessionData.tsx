import { useState, useEffect } from "react";
import { Session } from "@/types"; // Ensure the import path is correct
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/firebase/config";

const useSessionData = () => {
  const [sessionData, setSessionData] = useState<Session[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userQuery = query(
          collection(db, "sessions"),
          where("userID", "==", user.uid)
        );

        const unsubscribeFirestore = onSnapshot(userQuery, (querySnapshot) => {
          if (!querySnapshot.empty) {
            const sessionsCollection = querySnapshot.docs.map(
              (doc) => doc.data() as Session
            );
            sessionsCollection.forEach((session) => {
              console.log(session);
            });
            setSessionData(sessionsCollection);
          } else {
            console.log("No such document!");
            setSessionData(null);
          }
          setLoading(false);
        });

        return () => {
          unsubscribeFirestore();
          unsubscribeAuth();
        };
      } else {
        setSessionData(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
    };
  }, []);

  return {
    sessionData,
    loading,
    setSessionData,
  };
};

export default useSessionData;
