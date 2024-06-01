import { useToast } from "@/components/ui/use-toast";
import { getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { Sessions, IWorkout } from "@/types";

const useUploadSessionData = () => {
  const { toast } = useToast();

  const uploadSessionData = async (
    sessionData: Sessions,
    routineID: string
  ) => {
    try {
      // Get the current authenticated user
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        throw new Error("No user is signed in.");
      }

      // Get the user's unique ID (UID)
      sessionData.userID = user.uid;

      if (!routineID) {
        throw new Error("No routineID provided");
      }
      const documentId = `${user.uid} + ${routineID}`;
      sessionData.sessionID = documentId; // Assign the routineID as the session ID

      const docRef = doc(db, "sessions", documentId);

      // Set the data with the generated ID
      await setDoc(docRef, sessionData);

      toast({
        title: `You updated ${routineID}`,
        description: `with ${sessionData.workout?.length || 0} workouts`,
      });

      console.log("Document written with ID: ", documentId);
    } catch (error: any) {
      toast({
        title: `Error updating ${routineID}`,
        description: error.message,
      });
      console.error("Error adding document: ", error);
    }
  };

  return { uploadSessionData };
};

export default useUploadSessionData;
