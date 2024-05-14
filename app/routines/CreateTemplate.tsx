"use client";
import * as React from "react";
import { useEffect, useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  collection,
  getDocs,
  addDoc,
  query,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type UserTemplates = Array<{ workoutName: string; description: string }>;
type routinesArray = {
  id: number;
};
interface Routine {
  workoutName: string;
  description: string;
  id?: number;
}

export default function CreateTemplate() {
  //   const [userTemplates, setUserTemplates] = useState<Routine[]>([]);
  const [newRoutine, setNewRoutine] = useState<Routine>({
    workoutName: "",
    description: "",
  });
  // Empty dependencies array means the effect runs only once after the initial render
  //delete  workoutName to DB
  //add workoutName to DB
  const addRoutine = async (e: FormEvent) => {
    e.preventDefault();
    if (newRoutine.workoutName && newRoutine.description) {
      try {
        const docRef = await addDoc(collection(db, "userRoutines"), {
          workoutName: newRoutine.workoutName,
          description: newRoutine.description,
        });
        console.log("Document written with ID: ", docRef.id);
        setNewRoutine({ workoutName: "", description: "" }); // Reset the form
        // fetchRoutines(); // Refresh the list of routines
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };

  return (
    <Card className="w-[350px] ">
      <CardHeader>
        <CardTitle>Create Workout Routine</CardTitle>
        <CardDescription>
          Design your workout routine template in one-click.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name of routine</Label>
              <Input
                id="name"
                onChange={(e) =>
                  setNewRoutine({ ...newRoutine, workoutName: e.target.value })
                }
                name="workoutName"
                type="text"
                placeholder="Enter routine name"
                value={newRoutine.workoutName}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Description </Label>
              <Input
                onChange={(e) =>
                  setNewRoutine({ ...newRoutine, description: e.target.value })
                }
                value={newRoutine.description}
                name="description"
                type="text"
                placeholder="Enter routine
              description"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button type="submit" onClick={addRoutine}>
          Deploy
        </Button>
      </CardFooter>
    </Card>
  );
}
