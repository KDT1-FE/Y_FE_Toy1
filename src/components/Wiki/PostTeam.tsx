import {updateDoc, doc} from "firebase/firestore";
import {db} from "../../utils/firebaseConfig";

async function PostTeam(dataKey: string, newContent: string): Promise<void> {
  await updateDoc(doc(db, "team", dataKey), {
    content: newContent,
  });
}

export default PostTeam;
