"use client";
import { useState } from "react";

import UserTemplates from "./UserTemplates";
import PreBuiltTemplates from "./PreBuiltTemplates";
import CreateTemplate from "./CreateTemplate";

const routines = () => {
  const [userTemplates, setUserTemplates] = useState([]);
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-1">
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
