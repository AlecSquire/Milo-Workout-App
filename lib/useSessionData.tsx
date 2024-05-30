import { useState } from "react";
import { Session } from "@/types"; // Make sure the import path is correct

const useSessionData = () => {
  // seSessionData(query.snapShot(db, sessions) as Session)
  const [sessionData, setSessionData] = useState<Session>({
    sessionID: "",
    userID: "",
    date: "",
    workoutName: "",
    description: "",
    workout: [],
  });

  return {
    sessionData,
    setSessionData,
  };
};

export default useSessionData;
