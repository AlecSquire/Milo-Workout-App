"use client";
import React from "react";
import { User } from "@/types";
import { useAppContext } from "../context/Index";
import useUserData from "@/lib/useUserData";
const Profile = () => {
  const { userData } = useUserData();

  if (!userData) {
    return (
      <div>
        <h1>No user data</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>{userData.name}</h1>
      <p>Email: {userData.email}</p>
      {userData.img && (
        <img src={userData.img} alt={`${userData.name}'s profile`} />
      )}
      {/* Render other user data as needed */}
    </div>
  );
};

export default Profile;

{
  /* <img src={userData.img} alt={`${userData.name}'s profile`} /> */
}
