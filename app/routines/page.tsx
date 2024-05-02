import React from "react";
import MyTemplates from "./AddNewTemplate";
import StandardTemplates from "./RoutineTemplates";

const routines = () => {
  return (
    <>
      <h1>My Templates</h1>
      <MyTemplates />
      <h1>Pre built templates</h1>
      <StandardTemplates />
    </>
  );
};

export default routines;
