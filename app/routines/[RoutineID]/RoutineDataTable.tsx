"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { capitalize } from "@/lib/utils";
import { FormFields, StartNewForm } from "@/types";
import { useForm, SubmitHandler } from "react-hook-form";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { getAuth } from "firebase/auth";

interface Props {
  lifts: StartNewForm[];
  routineID?: string;
}
type CheckboxStates = {
  [key: string]: boolean;
};

const RoutineDataTable = ({ lifts, routineID }: Props) => {
  const [checkboxStates, setCheckboxStates] = useState<CheckboxStates>({});
  const { control, handleSubmit, register } = useForm({
    defaultValues: {
      workout: lifts,
    },
  });
  const { toast } = useToast();

  const handleCheckboxChange = (rowId: string) => {
    setCheckboxStates((prevState) => ({
      ...prevState,
      [rowId]: !prevState[rowId],
    }));
  };

  const onSubmit: SubmitHandler<{ workout: StartNewForm[] }> = async (data) => {
    console.log("Form Data:", data);
    try {
      // Get the current authenticated user
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        throw new Error("No user is signed in.");
      }
      // Get the user's unique ID (UID)
      const userID = user.uid;

      if (data.workout.length === 0) {
        throw new Error("No lifts provided in the form data");
      }

      // Use the formatted workoutName as the document ID
      if (!routineID) {
        throw new Error("No routineID provided");
      }
      const documentId = routineID;

      const docRef = doc(db, "routines", documentId);

      // Set the data with the generated ID

      await setDoc(docRef, {
        userID: userID, // Include the user ID
        id: documentId,
        ...data,
      });
      toast({
        title: `You updated ${routineID}`,
        description: `with ${data.workout[0]?.workout}`,
      });
      console.log("Document written with ID: ", documentId);
    } catch (error) {
      toast({
        title: `Error updating ${routineID}`,
        description: `with ${data}`,
      });
      console.error("Error adding document: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Table>
        <div className="w-full">
          <div className="rounded-md sm:border">
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
                                      onClick={() =>
                                        handleCheckboxChange(rowId)
                                      }
                                      type="checkbox"
                                      {...register(
                                        `workout.${liftIndex}.workout.${workoutIndex}.complete`
                                      )}
                                      defaultChecked={
                                        workoutItem.complete || false
                                      }
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
          </div>
        </div>
        <Button type="submit">Save Changes</Button>
      </Table>
    </form>
  );
};

export default RoutineDataTable;
