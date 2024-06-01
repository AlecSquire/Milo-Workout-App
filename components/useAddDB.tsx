import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";

const useAddDB = () => {
  const [userTemplates, setUserTemplates] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "routines"));
        const routinesArray: any[] = [];
        querySnapshot.forEach((doc) => {
          routinesArray.push({ ...doc.data(), id: doc.id } as any);
        });
        setUserTemplates(routinesArray);
      } catch (error) {
        console.error("Error fetching user templates:", error);
      }
    };

    fetchData();
  }, []);

  return userTemplates;
};

export default useAddDB;
