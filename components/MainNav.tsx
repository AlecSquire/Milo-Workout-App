"use client";
import { User, LogIn } from "lucide-react";
import Link from "next/link";
import React from "react";
import { ModeToggle } from "./ModeToggle";
import DropDownUser from "@/components/ui/DropDownUser";
import { useAppContext } from "@/context";

const MainNav = () => {
  const { userData, setUserData } = useAppContext();

  return (
    <div className="flex flex-col md:flex-row p-6 md:p-9 items-center md:items-end">
      <div className="flex w-full md:flex-auto md:w-14 items-center justify-center mb-4 md:mb-0">
        <DropDownUser />
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between flex-auto w-full md:w-max mb-4 md:mb-0">
        <Link href="/" className="mb-2 md:mb-0 md:mr-4">
          DashBoard
        </Link>
        <Link href="/workout-builder" className="mb-2 md:mb-0 md:mr-4">
          Build a workout
        </Link>
        <Link href="/routines" className="mb-2 md:mb-0 md:mr-4">
          My workout routines
        </Link>
        <Link href="/look-up-lifts" className="mb-2 md:mb-0">
          Lookup Lifts
        </Link>
      </div>
      <div className="flex w-full md:flex-auto md:w-32 justify-around items-center">
        <ModeToggle />
        <Link href="/profile">
          <User />
        </Link>
        <Link href="/Authentication">
          <LogIn />
        </Link>
      </div>
    </div>
  );
};

export default MainNav;
