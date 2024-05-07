"use client";
import { useEffect, useState, FormEvent } from "react";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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
import { doc, deleteDoc } from "firebase/firestore";
import DropDown from "./DropDown";
import { db } from "@/firebase/config";
import { Trash } from "lucide-react";
type UserTemplates = Array<{ item: string; description: string }>;
type routinesArray = {
  id: number;
};
interface Routine {
  item: string;
  description: string;
  id?: number;
}

const UserTemplates: React.FC = ({ userTemplates, setUserTemplates }) => {
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [routineToDelete, setRoutineToDelete] = useState<Routine | null>(null);
  const [modalTemplate, setModalTemplate] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "userRoutines"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let routinesArray: Routine[] = [];

      querySnapshot.forEach((doc) => {
        routinesArray.push({ ...doc.data(), id: doc.id });
      });
      setUserTemplates(routinesArray);
    });

    // Cleanup function to unsubscribe when component unmounts or when the effect is re-run
    return () => {
      unsubscribe();
    };
  }, []);
  const deleteItem = async () => {
    if (routineToDelete) {
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

  return (
    <Card style={{ height: "70vh", overflowY: "auto" }}>
      {userTemplates.map((routine, index) => (
        <div
          key={index}
          className="flex items-center justify-between w-full p-4 border border-gray-300 rounded cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md w-100%"
          onClick={() => setModalTemplate(true)} // Open modal when clicking on the routine item
        >
          <div>
            <h2 className="text-lg font-bold mb-2">{routine.item}</h2>
            <p className="text-sm text-gray-700 mb-4">{routine.description}</p>
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
        </div>
      ))}
      {/* Modal Preview of workout template */}
      {modalTemplate && (
        <AlertDialog
          open={modalTemplate} // Set open to modalTemplate
          onClose={() => setModalTemplate(false)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Workout Name</AlertDialogTitle>
              <AlertDialogDescription>
                {" "}
                <ul>
                  <li>Exercise 1</li>
                  <li>Exercise 2</li>
                  <li>Exercise 3</li>
                  <li>Exercise 4</li>
                </ul>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setModalTemplate(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  setModalTemplate(false); // Close the modal
                  router.push("routines/[RoutineID]"); // Navigate to the new route
                }}
              >
                Start Workout
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {/* Alert Dialog */}
      <AlertDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
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
    </Card>
  );
};
export default UserTemplates;
