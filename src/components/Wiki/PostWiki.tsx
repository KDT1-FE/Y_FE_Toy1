import {updateDoc, doc} from "firebase/firestore";
import {db} from "../../utils/firebaseConfig";

async function PostWiki(dataKey: string, newContent: string): Promise<void> {
  const newWiki = {content: newContent};

  await updateDoc(doc(db, "wiki", dataKey), {
    content: newContent,
  });

  sessionStorage.setItem(dataKey, JSON.stringify(newWiki));
}

export default PostWiki;
