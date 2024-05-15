"use client";

import { useState, useEffect } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import Link from "next/link";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [
    createUserWithEmailAndPassword,
    user, // This is the user object you're looking for
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);

  useEffect(() => {
    if (user) {
      console.log(user); // This should log the user's data
      sessionStorage.setItem("user", true.toString());
      // Redirect or perform additional operations here
    }
  }, [user]);

  const handleSignUp = () => {
    createUserWithEmailAndPassword(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-white text-2xl mb-5">Sign Up</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        <button
          onClick={handleSignUp}
          className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
        >
          Sign Up
        </button>
        <div className="my-4">
          <Link
            href="/sign-in"
            className="block w-full p-3 bg-indigo-600 rounded text-center text-white hover:bg-indigo-500"
          >
            Log in here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
