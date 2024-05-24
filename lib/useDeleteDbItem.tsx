import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/config";

const useDeleteDbItem = async (
  routineToDelete,
  setRoutineToDelete,
  setDeleteDialogOpen,
  hasId
) => {
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

export default useDeleteDbItem;
