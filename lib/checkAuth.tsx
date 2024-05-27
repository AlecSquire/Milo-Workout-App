// checkAuth.js
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { SetStateAction } from "react";

const checkAuth = (setUser: {
  (value: SetStateAction<null>): void;
  (authenticatedUser: SetStateAction<null>): void;
  (authenticatedUser: any): void;
  (arg0: User | null): void;
}) => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });
};

export { checkAuth };
