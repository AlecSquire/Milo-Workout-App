import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/config";

const useDeleteDbItem = async (
  routineToDelete: { id: string },
  setRoutineToDelete: (arg0: null) => void,
  setDeleteDialogOpen: (arg0: boolean) => void,
  hasId: (arg0: any) => any
) => {
  if (routineToDelete && hasId(routineToDelete)) {
    try {
      await deleteDoc(doc(db, "routines", routineToDelete.id));
      console.log("Document successfully deleted!");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  }
  setRoutineToDelete(null);
  setDeleteDialogOpen(false);
};

export default useDeleteDbItem;
