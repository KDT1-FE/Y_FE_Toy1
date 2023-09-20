import {updateDoc, doc} from "firebase/firestore";
import {db} from "../../utils/firebaseConfig";

async function PostTeam(
  dataKey: string,
  newContent: string,
  멘티: string,
  멘토: string,
  img: string,
): Promise<void> {
  await updateDoc(doc(db, "team", dataKey), {
    content: newContent,
  });

  sessionStorage.setItem(
    dataKey,
    JSON.stringify({
      멘티,
      멘토,
      img,
      content: newContent,
    }),
  );
}

export default PostTeam;
