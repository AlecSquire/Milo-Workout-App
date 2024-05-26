"use client";

import MiloImage from "../public/Milo2.png";
import Image from "next/image";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";

type HomeParams = {
  finalURL?: string | undefined;
};

export default function Home({ params }: { params: HomeParams }) {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      router.push("/sign-in");
    } else if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    await signOut(auth);
    sessionStorage.removeItem("user");
    router.push("/sign-in");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-[#f38524]">
      {user ? (
        <div> User: {user.email} is logged in </div>
      ) : (
        <div>No one is logged in</div>
      )}
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
          Log in
        </Link>
        <Link
          href="/sign-up"
          className="text-[#f38524] bg-black p-2 border-spacing-1 m-2 rounded"
        >
          Sign up
        </Link>
        <button
          onClick={handleLogout}
          className="text-[#f38524] bg-black p-2 border-spacing-1 m-2 rounded"
        >
          Logout
        </button>
      </div>
    </main>
  );
}
