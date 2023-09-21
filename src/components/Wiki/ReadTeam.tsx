import {doc, getDoc} from "firebase/firestore";
import {db} from "../../utils/firebaseConfig";
import {TEAM} from "../../constant";

async function ReadTeam(teamName: string): Promise<any> {
  const wikiRef = doc(db, TEAM, teamName);
  const wikiSnap = await getDoc(wikiRef);
  const wiki = wikiSnap.data();

  return wiki;
}

export default ReadTeam;
