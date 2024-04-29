import { User } from "lucide-react";
import Link from "next/link";
import React from "react";
import { ModeToggle } from "./ModeToggle";
import Image from "next/image";

const MainNav = () => {
  return (
    <div className="flex p-9 ">
      <div className="flex-auto w-14 flex items-center justify-center ">
        <Image
          src={"/MiloB&W-modified.png"}
          width={80}
          height={80}
          alt={"logo of milo"}
          className="rounded-full"
        />
      </div>
      <div className="flex items-space justify-between flex-auto w-64 mr-8">
        <Link href="/">DashBoard</Link>
        <Link href="/start">Start a session </Link>
        <Link href="/routines">Routines</Link>
        <Link href="/lifts">Lifts </Link>
        <Link href="./info">Info</Link>
      </div>
      <div className="flex flex-auto w-32 justify-around">
        <ModeToggle />
        <a href="/">
          <User>User</User>
        </a>
      </div>
    </div>
  );
};

export default MainNav;
