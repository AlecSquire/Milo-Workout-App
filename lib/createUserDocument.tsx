import { auth, db } from "@/firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { User, PersonalBest, SavedLift, Session } from "@/types";

export const createUserDocument = async (
  user: any, // Updated type since firebase.User doesn't exist in v9
  additionalData?: Partial<User>
) => {
  if (!user) return;

  const userRef = doc(db, "users", user.uid);

  const userSnapshot = await getDoc(userRef);

  if (!userSnapshot.exists()) {
    const { displayName, email, photoURL } = user;
    const createdAt = new Date().toISOString();

    const newUser: User = {
      name: displayName || "",
      email: email || "",
      userID: user.uid,
      img: photoURL || "",
      personalBest: {} as PersonalBest,
      savedLifts: [] as SavedLift[],
      ...additionalData,
    };

    try {
      await setDoc(userRef, newUser);
      console.log("User document created successfully");
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
};
