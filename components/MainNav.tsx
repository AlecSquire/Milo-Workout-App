"use client";
import { User } from "lucide-react";
import Link from "next/link";
import React from "react";
import { ModeToggle } from "./ModeToggle";
import Image from "next/image";
import DropDownUser from "@/components/ui/DropDownUser";
import { useAppContext } from "@/app/context/Index";

const MainNav = () => {
  const { userData, setUserData } = useAppContext();
  return (
    <div className="flex p-9 ">
      <div className="flex-auto w-14 flex items-center justify-center ">
        <DropDownUser />
      </div>
      <div className="flex items-space justify-between flex-auto w-max ">
        <Link href="/">DashBoard</Link>
        <Link href="/workout-builder">Build a workout </Link>
        <Link href="/routines">My workout routines</Link>
        <Link href="/look-up-lifts">Lookup Lifts</Link>
        <Link href="/profile">Profile</Link>
      </div>
      <div className="flex flex-auto w-32 justify-around">
        <ModeToggle />
        <Link href="/Authentication">
          <User>User</User>
        </Link>
      </div>
    </div>
  );
};

export default MainNav;
