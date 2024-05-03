import React from "react";
import UserTemplates from "./UserTemplates";
import PreBuiltTemplates from "./PreBuiltTemplates";

const routines = () => {
  return (
    <>
      <h1>My Templates</h1>
      <UserTemplates />
      <h1>Pre built templates</h1>
      <PreBuiltTemplates />
    </>
  );
};

export default routines;
