import {updateDoc, doc} from "firebase/firestore";
import {db} from "../../utils/firebaseConfig";
import {WIKI} from "../../constant";

async function PostWiki(dataKey: string, newContent: string): Promise<void> {
  const newWiki = {content: newContent};

  await updateDoc(doc(db, WIKI, dataKey), {
    content: newContent,
  });

  sessionStorage.setItem(dataKey, JSON.stringify(newWiki));
}

export default PostWiki;
