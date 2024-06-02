import React, { useState } from "react";
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
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  const toggleExpand = (name: string) => {
    setExpanded((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const renderInstructions = (instructions: string, name: string) => {
    const isExpanded = expanded[name];
    const maxLength = 100; // Define the length at which to truncate

    if (instructions.length <= maxLength) {
      return <span>{capitalize(instructions)}</span>;
    }

    return (
      <div>
        <span>
          {isExpanded
            ? capitalize(instructions)
            : `${capitalize(instructions.slice(0, maxLength))}...`}
        </span>
        <button
          onClick={() => toggleExpand(name)}
          className="text-blue-500 ml-2"
        >
          {isExpanded ? "Show Less" : "Show More"}
        </button>
      </div>
    );
  };

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
                    <TableCell className="overflow-y-auto">
                      {renderInstructions(lift.instructions, lift.name)}
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
