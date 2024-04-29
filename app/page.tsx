"use client";
import MiloImage from "../public/Milo2.png";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import FormPractice from "./lifts/FormPractice";
import { Button } from "@/components/ui/button";
import DataResponse from "./lifts/DataResponse";
import NewUserSurvey from "./NewUserSurvey";

export default function Home({ finalURL }) {
  console.log(finalURL);
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
        <button className="text-[#f38524] bg-black p-2 border-spacing-1 m-2 rounded">
          Login in
        </button>
        <button className="text-[#f38524] bg-black p-2 border-spacing-1 m-2 rounded">
          Sign up
        </button>
      </div>
    </main>
  );
}
