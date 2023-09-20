import {collection, getDocs} from "firebase/firestore";
import {db} from "../../utils/firebaseConfig";

async function SaveContents(): Promise<any> {
  const wikiSnapshot = await getDocs(collection(db, "wiki"));

  wikiSnapshot.forEach(wikiDoc => {
    const wiki = wikiDoc.data();

    if (wiki) {
      sessionStorage.setItem(wikiDoc.id, JSON.stringify(wiki));
    }
  });
}

export default SaveContents;
