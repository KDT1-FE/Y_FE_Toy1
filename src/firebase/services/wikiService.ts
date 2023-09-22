import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/firebase";

export const hasChildWikis = async (wikiID: string) => {
  const wikisCollection = collection(db, "Wiki");
  const q = query(wikisCollection, where("parentID", "==", wikiID));
  const snapshot = await getDocs(q);
  return !snapshot.empty;
};
