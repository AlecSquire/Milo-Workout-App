"use client";
import { useState } from "react";
import UserTemplates from "./UserTemplates";
import { Button } from "@/components/ui/button";
import FormFields from "@/types";
import { useRouter } from "next/navigation";

const Routines = () => {
  const router = useRouter();

  // Initialize the state with the correct type
  const [userTemplates, setUserTemplates] = useState([]);

  console.log(userTemplates);

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-1">
        <Button
          className="w-full mb-10"
          onClick={() => {
            router.push("/start"); // Navigate to the new route
          }}
        >
          Start empty workout
        </Button>
      </div>
      <div className="col-span-1">
        <h1 className="mt-4">My Templates</h1>
        <UserTemplates
          userTemplates={userTemplates}
          setUserTemplates={setUserTemplates}
        />
      </div>
    </div>
  );
};

export default Routines;
