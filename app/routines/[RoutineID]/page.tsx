"use client";
import FetchRoutine from "./FetchRoutine";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { FormFields, StartNewForm } from "@/types";

const UserRoutine = ({ params }: { params: { RoutineID: string } }) => {
  const [userTemplate, setUserTemplate] = useState<StartNewForm[]>([]);
  const routineID = params.RoutineID;

  // Effect to fetch all document data in the collection

  return (
    <div>
      <h1 className=" text-xl rounded-md p-15	bg-orange-500	">
        Still Under Construction{" "}
      </h1>
      <h1>My Routine: {routineID}</h1>
      <Card style={{ height: "70vh", overflowY: "auto" }}>
        <FetchRoutine
          routineID={routineID}
          userTemplate={userTemplate}
          setUserTemplate={setUserTemplate}
        />
      </Card>
    </div>
  );
};

export default UserRoutine;
