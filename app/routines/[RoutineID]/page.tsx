"use client";
import FetchRoutine from "./FetchRoutine";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { FormFields, StartNewForm } from "@/types";
import { RoutineDataTable } from "./RoutineDataTable";

const UserRoutine = ({ params }: { params: { RoutineID: string } }) => {
  const [userTemplate, setUserTemplate] = useState<StartNewForm[]>([]);
  const routineID = params.RoutineID;

  // Effect to fetch all document data in the collection

  return (
    <div>
      My Routine: {routineID}
      <Card style={{ height: "70vh", overflowY: "auto" }}>
        <FetchRoutine
          routineID={routineID}
          userTemplate={userTemplate}
          setUserTemplate={setUserTemplate}
        />

        {/* <RoutineDataTable lifts={lifts} /> */}
      </Card>
    </div>
  );
};

export default UserRoutine;
