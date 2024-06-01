import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";
import { FormFields } from "@/types";

const useFetchRoutine = () => {
  const [routineData, setRoutineData] = useState<FormFields[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRoutineData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "routines"));
        const data: FormFields[] = [];
        querySnapshot.forEach((doc) => {
          const routine = doc.data() as FormFields;
          data.push({ ...routine, id: doc.id } as const);
        });
        setRoutineData(data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutineData();
  }, []);

  return { routineData, loading, error };
};

export default useFetchRoutine;
