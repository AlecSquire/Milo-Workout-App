import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Import Firebase Auth
import { db } from "@/firebase/config";

const useFetchUserRoutines = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    console.error("No user is signed in.");
    return [];
  }

  const userID = user.uid;
  const routinesRef = collection(db, "routines");

  // Query to fetch routines specific to the logged-in user
  const q = query(routinesRef, where("userID", "==", userID));
  const querySnapshot = await getDocs(q);

  const userRoutines = [];
  querySnapshot.forEach((doc) => {
    userRoutines.push({ id: doc.id, ...doc.data() });
  });

  return userRoutines;
};
