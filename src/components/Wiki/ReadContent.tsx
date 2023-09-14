import {doc, getDoc} from "firebase/firestore";
import {db} from "../../utils/firebaseConfig";

async function ReadContent(dataKey: string): Promise<any> {
  const wikiRef = doc(db, "wiki", dataKey);
  const wikiSnap = await getDoc(wikiRef);
  const wiki = wikiSnap.data();

  return wiki;
}

export default ReadContent;
