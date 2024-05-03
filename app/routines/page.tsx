"use client";
import { useState } from "react";

import UserTemplates from "./UserTemplates";
import PreBuiltTemplates from "./PreBuiltTemplates";
import CreateTemplate from "./CreateTemplate";

const routines = () => {
  const [userTemplates, setUserTemplates] = useState([]);
  return (
    <div className="flex flex-row">
      <CreateTemplate
        userTemplates={userTemplates}
        setUserTemplates={setUserTemplates}
      />
      <h1>My Templates</h1>
      <UserTemplates
        userTemplates={userTemplates}
        setUserTemplates={setUserTemplates}
      />

      <h1>Pre built templates</h1>
      <PreBuiltTemplates />
    </div>
  );
};

export default routines;
