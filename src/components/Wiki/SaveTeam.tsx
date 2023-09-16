import {collection, getDocs} from "firebase/firestore";
import {db} from "../../utils/firebaseConfig";

async function SaveTeam(): Promise<any> {
  const teamSnapshot = await getDocs(collection(db, "team"));

  teamSnapshot.forEach(teamDoc => {
    const team = teamDoc.data();

    if (team) {
      sessionStorage.setItem(teamDoc.id, JSON.stringify(team));
    }
  });
}

export default SaveTeam;
