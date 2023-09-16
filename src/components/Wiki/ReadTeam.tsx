import {doc, getDoc} from "firebase/firestore";
import {db} from "../../utils/firebaseConfig";

async function ReadTeam(teamName: string): Promise<any> {
  const wikiRef = doc(db, "team", teamName);
  const wikiSnap = await getDoc(wikiRef);
  const wiki = wikiSnap.data();

  return wiki;
}

export default ReadTeam;
