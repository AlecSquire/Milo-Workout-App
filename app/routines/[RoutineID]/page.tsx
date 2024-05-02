import React from "react";

const UserRoutine = ({ params }: { params: { RoutineID: string } }) => {
  return <div>My Post: {params.RoutineID}</div>;
};

export default UserRoutine;
