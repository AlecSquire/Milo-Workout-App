"use client";

import React from "react";
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

interface Props {
  lifts: FormFields[];
  routineID?: string;
}

const RoutineDataTable = ({ lifts, routineID }: Props) => {
  const { control, handleSubmit, register } = useForm({
    defaultValues: {
      lifts: lifts,
    },
  });

  const onSubmit: SubmitHandler<{ lifts: StartNewForm[] }> = async (data) => {
    console.log("Form Data:", data);
    try {
      if (data.lifts.length === 0 || !data.lifts?.workoutName) {
        throw new Error("Workout name is missing in the form data");
      }

      const workoutName = data.lifts;
      console.log(workoutName);

      // Join workoutName with hyphens between words
      const formattedRoutineId = workoutName
        .replace(/\s+$/, "")
        .replace(/\s+/g, "-");

      // Use the formatted workoutName as the document ID
      const documentId = formattedRoutineId;

      // Create a document reference with the generated ID
      const docRef = doc(db, "routines", documentId);

      // Set the data with the generated ID
      await setDoc(docRef, {
        ...data,
        id: documentId,
      });
      console.log("Document written with ID: ", documentId);
    } catch (error) {
      console.error("Error adding document: ", error.message);
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
                            (_, setIndex) => (
                              <TableRow key={setIndex}>
                                <TableCell>{setIndex + 1}</TableCell>
                                <TableCell>-</TableCell>
                                <TableCell>
                                  <input
                                    type="number"
                                    {...register(
                                      `lifts.${liftIndex}.workout.${workoutIndex}.weight`
                                    )}
                                    defaultValue={workoutItem.weight || 0}
                                  />
                                </TableCell>
                                <TableCell>
                                  <input
                                    type="number"
                                    {...register(
                                      `lifts.${liftIndex}.workout.${workoutIndex}.reps`
                                    )}
                                    defaultValue={workoutItem.reps || 0}
                                  />
                                </TableCell>
                                <TableCell>
                                  <input
                                    type="checkbox"
                                    {...register(
                                      `lifts.${liftIndex}.workout.${workoutIndex}.complete`
                                    )}
                                    defaultChecked={
                                      workoutItem.complete || false
                                    }
                                  />
                                </TableCell>
                              </TableRow>
                            )
                          )}
                        </TableBody>
                      </React.Fragment>
                    ))}
                </React.Fragment>
              ))}
          </div>
        </div>
        <button type="submit">Save Changes</button>
      </Table>
    </form>
  );
};

export default RoutineDataTable;
