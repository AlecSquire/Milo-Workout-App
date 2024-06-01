"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { capitalize } from "@/lib/utils";
import { FormFields, Session, IWorkout } from "@/types";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import useUploadSessionData from "@/lib/useUploadSessionData";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid"; // Import uuid for unique ID generation

interface Props {
  lifts: FormFields[];
  routineID?: string;
}

type CheckboxStates = {
  [key: string]: boolean;
};

// New types for transformation
interface ConvertedExerciseDetail {
  sets: number;
  reps: number;
  weight?: number;
  complete?: boolean;
  exercise: string;
}

interface ConvertedWorkoutDetail {
  workout: ConvertedExerciseDetail[];
  userID: string;
  id: string;
  description: string;
  workoutName: string;
}

interface ConvertedSession {
  description: string;
  workoutName: string;
  userID: string;
  sessionID: string;
  workout: ConvertedWorkoutDetail[];
  date: string; // Use Date type if you plan to parse it to a Date object
}

const RoutineDataTable = ({ lifts, routineID }: Props) => {
  const [checkboxStates, setCheckboxStates] = useState<CheckboxStates>({});
  const { control, handleSubmit, register, setValue } = useForm({
    defaultValues: {
      workoutName: "",
      description: "",
      workout: lifts,
    },
  });

  const { uploadSessionData } = useUploadSessionData();

  const handleCheckboxChange = (rowId: string) => {
    setCheckboxStates((prevState) => ({
      ...prevState,
      [rowId]: !prevState[rowId],
    }));
  };

  const onSubmit: SubmitHandler<{
    workoutName: string;
    description: string;
    workout: FormFields[];
  }> = async (data) => {
    console.log("Form Data:", data);

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.error("No user is authenticated");
      return;
    }

    if (!routineID) {
      console.error("No routineID provided");
      return;
    }

    // Transform the workout data to match the ConvertedSession interface
    const workoutDetails: ConvertedWorkoutDetail[] = data.workout.map(
      (lift) => ({
        workout: lift.workout.map((workoutItem) => ({
          exercise: workoutItem.exercise,
          sets: workoutItem.sets,
          reps: workoutItem.reps as number,
          weight: workoutItem.weight,
          complete: workoutItem.complete,
        })),
        userID: lift.userID || user.uid,
        id: lift.id,
        description: lift.description || "",
        workoutName: lift.workoutName,
      })
    );

    const sessionData: ConvertedSession = {
      sessionID: uuidv4(), // Generate a unique session ID
      date: new Date().toISOString(),
      userID: user.uid,
      workoutName: data.workoutName,
      description: data.description,
      workout: workoutDetails,
    };

    await uploadSessionData(sessionData as unknown as Session, routineID);
  };

  // Ensure lifts are set on the client side
  useEffect(() => {
    setValue("workout", lifts);
  }, [lifts, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Table className="w-full rounded-md sm:border">
        {Array.isArray(lifts) &&
          lifts.map((lift, liftIndex) => (
            <React.Fragment key={lift.id}>
              {lift.workout &&
                lift.workout.map((workoutItem, workoutIndex) => (
                  <React.Fragment key={workoutIndex}>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-full">
                          {capitalize(workoutItem.exercise)}
                        </TableHead>
                      </TableRow>
                      <TableRow>
                        <TableHead>Set</TableHead>
                        <TableHead>Previous</TableHead>
                        <TableHead>kg</TableHead>
                        <TableHead>Reps</TableHead>
                        <TableHead>Complete</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Array.from({ length: workoutItem.sets || 1 }).map(
                        (_, setIndex) => {
                          const rowId = `${liftIndex}-${workoutIndex}-${setIndex}`;
                          return (
                            <TableRow
                              key={setIndex}
                              className={
                                checkboxStates[rowId]
                                  ? "bg-green-400"
                                  : "inherit"
                              }
                            >
                              <TableCell>{setIndex + 1}</TableCell>
                              <TableCell>-</TableCell>
                              <TableCell>
                                <input
                                  type="number"
                                  {...register(
                                    `workout.${liftIndex}.workout.${workoutIndex}.weight`
                                  )}
                                  defaultValue={workoutItem.weight || 0}
                                />
                              </TableCell>
                              <TableCell>
                                <input
                                  type="number"
                                  {...register(
                                    `workout.${liftIndex}.workout.${workoutIndex}.reps`
                                  )}
                                  defaultValue={workoutItem.reps || 0}
                                />
                              </TableCell>
                              <TableCell>
                                <input
                                  onClick={() => handleCheckboxChange(rowId)}
                                  type="checkbox"
                                  {...register(
                                    `workout.${liftIndex}.workout.${workoutIndex}.complete`
                                  )}
                                  defaultChecked={workoutItem.complete || false}
                                />
                              </TableCell>
                            </TableRow>
                          );
                        }
                      )}
                    </TableBody>
                  </React.Fragment>
                ))}
            </React.Fragment>
          ))}
        <Button type="submit">Save Changes</Button>
      </Table>
    </form>
  );
};

export default RoutineDataTable;
