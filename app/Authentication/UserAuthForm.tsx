"use client";

import React, { useState } from "react";
import {
  useSignInWithEmailAndPassword,
  useCreateUserWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/config";
import { createUserDocument } from "@/lib/createUserDocument";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/Icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        const result = await createUserWithEmailAndPassword(email, password);

        if (result?.user) {
          await createUserDocument(result.user, { name });
        }
      } else {
        await signInWithEmailAndPassword(email, password);
      }

      sessionStorage.setItem("user", "true");
      router.push("/");
    } catch (error) {
      console.error("Error during authentication", error);
    } finally {
      setIsLoading(false);
      setEmail("");
      setPassword("");
      setName("");
    }
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="mail@example.com"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          {isSignUp && (
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="name">
                Display Name (this can be changed later)
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Display Name (this can be changed later)"
                autoCapitalize="none"
                autoComplete="name"
                autoCorrect="off"
                disabled={isLoading}
              />
            </div>
          )}
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoCapitalize="none"
              autoComplete="current-password"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
        </div>
      </form>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-muted-foreground">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={toggleForm}
            className="underline underline-offset-4 hover:text-primary"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </span>
      </div>
    </div>
  );
}
