import { User } from "lucide-react";
import Link from "next/link";
import React from "react";
import { ModeToggle } from "./ModeToggle";
import Image from "next/image";

const MainNav = () => {
  return (
    <div className="flex p-9 ">
      <div className="flex-auto w-14 flex items-center justify-center ">
        <Link href="/">
          <Image
            src={"/MiloB&W-modified.png"}
            width={80}
            height={80}
            alt={"logo of milo"}
            className="rounded-full"
          />
        </Link>
      </div>
      <div className="flex items-space justify-between flex-auto w-max ">
        <Link href="/">DashBoard</Link>
        <Link href="/workout-builder">Build a workout </Link>
        <Link href="/routines">My workout routines</Link>
        <Link href="/look-up-lifts">Lookup Lifts</Link>
      </div>
      <div className="flex flex-auto w-32 justify-around">
        <ModeToggle />
        <Link href="/sign-in">
          <User>User</User>
        </Link>
      </div>
    </div>
  );
};

export default MainNav;
