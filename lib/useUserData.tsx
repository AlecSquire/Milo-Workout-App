import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/config";
import { PersonalBest, SavedLift, User, Session } from "@/types";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const useUserData = () => {
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);

        const unsubscribeFirestore = onSnapshot(userRef, (docSnapshot) => {
          if (docSnapshot.exists()) {
            setUserData(docSnapshot.data() as User);
          } else {
            console.log("No such document!");
          }
        });

        // Clean up Firestore listener when the user logs out or the component unmounts
        return () => unsubscribeFirestore();
      } else {
        setUserData(null);
      }
    });

    // Clean up the auth state listener when the component unmounts
    return () => unsubscribeAuth();
  }, []);

  return {
    userData,
    setUserData,
  };
};

export default useUserData;
