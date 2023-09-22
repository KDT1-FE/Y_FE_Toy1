import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../libs/firebase";

export async function updateOrder(
  id: string,
  order: number,
  isStatusChanged = false,
  status?: string,
) {
  try {
    const docRef = doc(db, "Project", id);
    if (isStatusChanged) {
      await updateDoc(docRef, {
        status,
        order,
      });
    } else {
      await updateDoc(docRef, {
        order,
      });
    }
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
  }
}
