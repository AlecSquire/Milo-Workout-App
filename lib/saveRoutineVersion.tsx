import { doc, setDoc, serverTimestamp, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "@/firebase/config";
import { StartNewForm } from "../types";

const saveRoutineVersion = async (routineID: string, workout: StartNewForm) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      throw new Error("No user is signed in.");
    }

    const userID = user.uid;
    const timestamp = new Date().toISOString(); // Generates a unique ISO timestamp

    const routineRef = doc(db, "routines", routineID);
    const versionRef = doc(collection(routineRef, "versions"), timestamp);

    await setDoc(versionRef, {
      userID, // Associate the version with the user's ID
      workout,
      timestamp: serverTimestamp(),
    });

    console.log("Routine version saved with ID: ", timestamp);
  } catch (error) {
    console.log("error"); // Enhanced error logging
  }
};

export { saveRoutineVersion };
