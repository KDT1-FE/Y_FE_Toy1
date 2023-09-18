import {updateDoc, doc} from "firebase/firestore";
import {db} from "../../utils/firebaseConfig";

async function PostWiki(dataKey: string, newContent: string): Promise<void> {
  await updateDoc(doc(db, "wiki", dataKey), {
    content: newContent,
  });
}

export default PostWiki;
