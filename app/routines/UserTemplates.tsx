"use client";

import RoutineLink from "@/components/RoutineLink";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import DropDown from "../../components/ui/DropDown";
import { Trash } from "lucide-react";
import { FormFields, Toast } from "@/types";
import useFetchUserRoutines from "@/lib/useFetchUserRoutines";

type SelectedRoutineType = number | null;

const UserTemplates = () => {
  const [userRoutines, loading, error, setUserRoutines] =
    useFetchUserRoutines();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [routineToDelete, setRoutineToDelete] = useState<FormFields | null>(
    null
  );

  const [selectedRoutineIndex, setSelectedRoutineIndex] =
    useState<SelectedRoutineType>(null);

  const hasId = (
    routine: FormFields
  ): routine is FormFields & { id: string } => {
    return !!routine.id;
  };

  const deleteItem = async () => {
    if (routineToDelete && hasId(routineToDelete)) {
      try {
        await deleteDoc(doc(db, "routines", routineToDelete.id));
        console.log("Document successfully deleted!");
        // Remove the deleted routine from the state
        setUserRoutines(
          userRoutines.filter((routine) => routine.id !== routineToDelete.id)
        );
      } catch (error) {
        console.error("Error deleting document: ", error);
      }
    }
    setRoutineToDelete(null);
    setDeleteDialogOpen(false);
  };

  const handleRoutineClick = (index: number) => {
    setSelectedRoutineIndex(index);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Card className="h-[70vh] overflow-y-auto w-full p-16">
        {userRoutines.map((routine, index) => (
          <div
            key={index}
            className="routine-item"
            onClick={() => handleRoutineClick(index)}
          >
            <h2>{routine.workoutName}</h2>
            <p>{routine.description}</p>
            {/* <p>UserId: {routine.userID}</p> */}
            <div className="flex items-center">
              <DropDown id={routine.id} />
              <Trash
                className="ml-2 h-4 w-4 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setRoutineToDelete(routine);
                  setDeleteDialogOpen(true);
                }}
              />
            </div>
          </div>
        ))}
      </Card>
      <AlertDialog open={deleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              routine and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={deleteItem}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {selectedRoutineIndex !== null && (
        <AlertDialog open={selectedRoutineIndex !== null}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <h2>{userRoutines[selectedRoutineIndex]?.workoutName}</h2>
              <p>{userRoutines[selectedRoutineIndex]?.description}</p>
            </AlertDialogHeader>
            <AlertDialogDescription>
              <div className="routine-details">
                {userRoutines[selectedRoutineIndex].workout?.map(
                  (workout, index) => (
                    <div key={index} className="workout-item">
                      <h3>
                        {" "}
                        {workout.sets} x {workout.exercise}
                      </h3>
                      <br />
                    </div>
                  )
                )}
              </div>
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setSelectedRoutineIndex(null)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction>
                <RoutineLink
                  routineId={userRoutines[selectedRoutineIndex].workoutName}
                />
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};

export default UserTemplates;
