"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Columns } from "lucide-react";

// Define your columns
const columns: ColumnDef<Exercise>[] = [
  {
    accessorKey: "name", // Accessor function or dot notation
    header: "Name", // Column header name
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "muscle",
    header: "Muscle",
  },
  {
    accessorKey: "equipment",
    header: "Equipment",
  },
  {
    accessorKey: "difficulty",
    header: "Difficulty",
  },
  {
    accessorKey: "instructions",
    header: "Instructions",
  },
];
export default Columns;
