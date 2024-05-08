"use client";
import { useState } from "react";

import UserTemplates from "./UserTemplates";
import PreBuiltTemplates from "./PreBuiltTemplates";
import CreateTemplate from "./CreateTemplate";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const routines = () => {
  const router = useRouter();

  const [userTemplates, setUserTemplates] = useState([]);
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-1">
        <Button
          className="w-full mb-10"
          onClick={() => {
            router.push("start"); // Navigate to the new route
          }}
        >
          Start empty workout
        </Button>
        <CreateTemplate
          userTemplates={userTemplates}
          setUserTemplates={setUserTemplates}
        />
      </div>
      <div className="col-span-1">
        <h1 className="mt-4">My Templates</h1>
        <UserTemplates
          userTemplates={userTemplates}
          setUserTemplates={setUserTemplates}
        />
      </div>
      <div className="col-span-1">
        <h1 className="mt-4">Pre built templates</h1>
        <PreBuiltTemplates />
      </div>
    </div>
  );
};

export default routines;
