"use client";
import MiloImage from "../public/Milo2.png";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import FormPractice from "./lifts/FormPractice";
import { Button } from "@/components/ui/button";
import DataResponse from "./lifts/DataResponse";
import NewUserSurvey from "./NewUserSurvey";
// import firebase from "@/firebase";
import { signOut, useSession } from "next-auth/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import Link from "next/link";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

export default function Home({ finalURL }) {
  const [user] = useAuthState(auth);
  console.log({ user });
  console.log(finalURL);
  const userSession = sessionStorage.getItem("user");
  const router = useRouter();
  if (!user && !userSession) {
    router.push("/sign-in");
  }
  // const session = useSession();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-[#f38524]">
      <NewUserSurvey />

      <Image
        src={MiloImage}
        width={500}
        height={500}
        alt="Milo artwork carrying a bull"
      />
      <div className="flex justify-center">
        <Link
          href="/sign-in"
          className="text-[#f38524] bg-black p-2 border-spacing-1 m-2 rounded"
        >
          Login in
        </Link>
        <Link
          href="/sign-up"
          className="text-[#f38524] bg-black p-2 border-spacing-1 m-2 rounded"
        >
          Sign up
        </Link>
        <div> {userSession?.data?.user?.name}</div>
        <button
          onClick={() => {
            signOut(auth);
            sessionStorage.removeItem("user");
          }}
        >
          Logout
        </button>
      </div>
    </main>
  );
}
