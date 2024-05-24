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

interface Props {
  lifts: Exercise[];
}

const DataTable = ({ lifts }: Props) => {
  return (
    <div className="w-full mt-5">
      <div className="rounded-md sm:border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Muscle</TableHead>
              <TableHead>Equipment</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead>Instructions</TableHead>
              <TableHead>Select</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lifts && lifts.length > 0
              ? lifts.map((lift) => (
                  <TableRow key={lift.name} data-href="/" className="w-full">
                    <TableCell>{capitalize(lift.name)}</TableCell>
                    <TableCell>{capitalize(lift.type)}</TableCell>
                    <TableCell>{capitalize(lift.muscle)}</TableCell>
                    <TableCell>{capitalize(lift.equipment)}</TableCell>
                    <TableCell>{capitalize(lift.difficulty)}</TableCell>
                    <TableCell className=" overflow-y-auto">
                      {capitalize(lift.instructions)}
                    </TableCell>
                    <TableCell>{lift.select}</TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DataTable;
