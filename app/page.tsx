"use client";
import MiloImage from "../public/Milo2.png";
import Image from "next/image";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import Dashboard from "./Dashboard/page";

type HomeParams = {
  finalURL?: string | undefined;
};

export default function Home({ params }: { params: HomeParams }) {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      router.push("/Authentication");
    } else if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    await signOut(auth);
    sessionStorage.removeItem("user");
    router.push("/Authentication");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Dashboard />
      {user ? (
        <div> User: {user.email} is logged in </div>
      ) : (
        <div>No one is logged in</div>
      )}
      <button
        onClick={handleLogout}
        className="text-[#f38524] bg-black p-2 border-spacing-1 m-2 rounded"
      >
        Logout
      </button>
    </main>
  );
}
