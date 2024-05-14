"use client";
import { useEffect, useState, FormEvent } from "react";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  collection,
  getDoc,
  addDoc,
  query,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import { doc, deleteDoc } from "firebase/firestore";
import DropDown from "./DropDown";
import { Trash } from "lucide-react";
import { IWorkout, FormFields } from "@/types";

interface UserTemplatesProps {
  userTemplates: FormFields[];
  setUserTemplates: React.Dispatch<React.SetStateAction<FormFields[]>>;
}

const UserTemplates = ({
  userTemplates,
  setUserTemplates,
}: UserTemplatesProps) => {
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [routineToDelete, setRoutineToDelete] = useState<FormFields | null>(
    null
  );
  const [selectedRoutineIndex, setSelectedRoutineIndex] = useState<
    number | null
  >(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "userRoutines"),
      (snapshot) => {
        const routinesArray: FormFields[] = [];
        snapshot.forEach((doc) => {
          routinesArray.push({ ...doc.data(), id: doc.id } as FormFields);
        });
        setUserTemplates(routinesArray);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [setUserTemplates]);

  const hasId = (
    routine: FormFields
  ): routine is FormFields & { id: string } => {
    return !!routine.id;
  };

  const deleteItem = async () => {
    if (routineToDelete && hasId(routineToDelete)) {
      try {
        await deleteDoc(doc(db, "userRoutines", routineToDelete.id));
        console.log("Document successfully deleted!");
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
  return (
    <>
      <Card style={{ height: "70vh", overflowY: "auto" }}>
        {userTemplates.map((routine, index) => (
          <div
            key={index}
            className="routine-item"
            onClick={() => handleRoutineClick(index)}
          >
            <h2>{routine.data?.workoutName}</h2>
            <p>{routine.data?.description}</p>
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
              <h2>{userTemplates[selectedRoutineIndex].data?.workoutName}</h2>
              <p>{userTemplates[selectedRoutineIndex].data?.description}</p>
            </AlertDialogHeader>
            <AlertDialogDescription>
              <div className="routine-details">
                {userTemplates[selectedRoutineIndex].data.workout?.map(
                  (workout, index) => (
                    <div key={index} className="workout-item">
                      <p>Exercise: {workout.exercise}</p>
                      <p>Reps: {workout.reps}</p>
                      <p>Sets: {workout.sets}</p>
                      <p>Weight: {workout.weight}</p>
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
              <AlertDialogAction
                onClick={() => {
                  setSelectedRoutineIndex(null);
                  router.push("/routines/[RoutineID]");
                }}
              >
                Start Workout
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};

export default UserTemplates;
