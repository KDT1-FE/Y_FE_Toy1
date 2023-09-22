import {
  doc,
  addDoc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  orderBy,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { Wiki } from "@/components/wiki/types/WikiCommonType";

export const loadWikiByID = async (id: string) => {
  const wikiRef = doc(db, "Wiki", id);
  const wikiSnap = await getDoc(wikiRef);
  if (wikiSnap.exists()) {
    return wikiSnap.data() as Wiki;
  } else {
    console.warn(`Wiki ID ${id}가 존재하지 않습니다.`);
    return null;
  }
};

export const loadRootWikis = async () => {
  const q = query(
    collection(db, "Wiki"),
    where("parentID", "==", ""),
    orderBy("createdAt", "asc"),
  );
  const docs = await getDocs(q);
  return docs.docs.map((doc) => doc.data() as Wiki);
};

export const loadChildrenWikis = async (
  parentWikiID: string,
): Promise<Wiki[]> => {
  const q = query(
    collection(db, "Wiki"),
    where("parentID", "==", parentWikiID),
    orderBy("createdAt", "asc"),
  );
  const docs = await getDocs(q);
  return docs.docs.map((doc) => doc.data() as Wiki);
};

export const hasChildWikis = async (wikiID: string) => {
  const wikisCollection = collection(db, "Wiki");
  const q = query(wikisCollection, where("parentID", "==", wikiID));
  const snapshot = await getDocs(q);
  return !snapshot.empty;
};

export const saveWiki = async (newForm: Wiki) => {
  const EMPTY_STRING = "";

  let linkWikiID;
  if (newForm.wikiID && newForm.wikiID !== EMPTY_STRING) {
    const wikiRef = doc(db, "Wiki", newForm.wikiID);
    await setDoc(wikiRef, newForm, { merge: true });
    linkWikiID = newForm.wikiID;
  } else {
    const wikiCollection = collection(db, "Wiki");
    const newDocRef = await addDoc(wikiCollection, newForm);

    // Firestore에서 자동으로 생성된 문서 ID를 가져옴
    const generatedID = newDocRef.id;

    // 생성된 ID를 newForm의 wikiID에 할당하고 다시 저장
    await setDoc(
      newDocRef,
      { ...newForm, wikiID: generatedID },
      { merge: true },
    );
    linkWikiID = generatedID;
  }
  return linkWikiID;
};

export const deleteWiki = async (wikiID: string) => {
  const wikiRef = doc(db, "Wiki", wikiID);
  await deleteDoc(wikiRef);
};

export const deleteChildWikis = async (parentWikiID: string) => {
  const q = query(
    collection(db, "Wiki"),
    where("parentID", "==", parentWikiID),
  );
  const docs = await getDocs(q);
  const childWikis = docs.docs.map((doc) => doc.data() as Wiki);
  for (const childWiki of childWikis) {
    const childWikiRef = doc(db, "Wiki", childWiki.wikiID);
    await deleteDoc(childWikiRef);
  }
};
