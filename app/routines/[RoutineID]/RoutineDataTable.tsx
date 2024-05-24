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
import { Exercise } from "@/types";
import { capitalize } from "@/lib/utils";
import { IWorkout } from "@/types";

interface Props {
  lifts: IWorkout;
}

const RoutineDataTable = ({ lifts }: Props) => {
  return (
    <div className="w-full mt-5">
      <div className="rounded-md sm:border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Set</TableHead>
              <TableHead>Previous</TableHead>
              <TableHead>kg</TableHead>
              <TableHead>Reps</TableHead>
              <TableHead>Complete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lifts.map((lift) => (
              <React.Fragment key={lift.id}>
                {lift.workout.map((workoutItem, index) => (
                  <TableRow key={index}>
                    <TableCell>{capitalize(workoutItem.exercise)}</TableCell>
                    <TableCell>{workoutItem.sets}</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>{workoutItem.weight}</TableCell>
                    <TableCell>{workoutItem.reps}</TableCell>
                    <TableCell>{workoutItem.complete ? "Yes" : "No"}</TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
export default RoutineDataTable;
