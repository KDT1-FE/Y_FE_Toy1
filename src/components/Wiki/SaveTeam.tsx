import {collection, getDocs} from "firebase/firestore";
import {db} from "../../utils/firebaseConfig";
import {TEAM} from "../../constant";

async function SaveTeam(): Promise<any> {
  const teamSnapshot = await getDocs(collection(db, TEAM));

  teamSnapshot.forEach(teamDoc => {
    const team = teamDoc.data();

    if (team) {
      sessionStorage.setItem(teamDoc.id, JSON.stringify(team));
    }
  });
}

export default SaveTeam;
