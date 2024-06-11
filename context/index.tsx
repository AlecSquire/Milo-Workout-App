"use-client";
import { PersonalBest, SavedLift, User, Session } from "@/types";
import { createContext, useContext, useState, ReactNode } from "react";
import useUserData from "@/lib/useUserData";
import useSessionData from "@/lib/useSessionData";
interface UserContext {
  userData: User | null;
  setUserData: React.Dispatch<React.SetStateAction<User | null>>;
  sessionData: Session[] | null;
  setSessionData: React.Dispatch<React.SetStateAction<Session[] | null>>;
}

const AppContext = createContext<UserContext | undefined>(undefined);

export function AppWrapper({ children }: { children: ReactNode }): JSX.Element {
  const { userData, setUserData } = useUserData();
  const { sessionData, setSessionData } = useSessionData();

  return (
    <AppContext.Provider
      value={{ userData, setUserData, sessionData, setSessionData }}
    >
      {children}
    </AppContext.Provider>
  );
}
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppWrapper");
  }
  return context;
}
