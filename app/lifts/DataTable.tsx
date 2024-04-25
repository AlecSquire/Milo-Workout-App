// import TicketStatusBadge from "@/components/TicketStatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import page from "./page";
import React from "react";

interface Props {
  exercise: Exercise[];
}

const DataTable = ({ lifts }: Props) => {
  return (
    <div className="w-full mt-5 ">
      <div className="rounded-md  sm:border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Muscle</TableHead>
              <TableHead>Equipment</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead>Instructions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lifts
              ? lifts.map((lifts) => (
                  <TableRow key={lifts.type} data-href="/">
                    <TableCell>{lifts.type}</TableCell>
                    <TableCell>{lifts.muscle}</TableCell>
                    <TableCell>{lifts.equipment}</TableCell>
                    <TableCell>{lifts.difficulty}</TableCell>
                    <TableCell>{lifts.instructions}</TableCell>
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
