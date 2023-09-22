import {
  getFirestore,
  collection,
  doc,
  setDoc,
  deleteDoc,
  query,
  getDocs,
  where,
  orderBy,
  limit,
  serverTimestamp,
} from 'firebase/firestore/lite';
import { app } from 'apis/firebase';

const db = getFirestore(app);
const wikiRef = collection(db, 'wiki');
export const create = async (category: string, contents: string) => {
  try {
    await setDoc(doc(db, `wiki/${category}`), {
      subject: category,
      content: contents,
      writeTime: serverTimestamp(),
      id: wikiRef.id,
    });
  } catch (e) {
    console.error(e);
    alert('알 수 없는 오류입니다');
  }
};

export const read = async (category: string) => {
  const document = query(
    wikiRef,
    where('subject', '==', category),
    orderBy('writeTime', 'desc'),
    limit(1),
  );
  const latestDocument = await getDocs(document);

  if (latestDocument.docs.length !== 0) {
    return latestDocument.docs[0].data();
  }
};

export const update = async (category: string, updatedContents: string) => {
  try {
    const documentForUpdate = doc(wikiRef);
    await setDoc(doc(db, `wiki/${category}`), {
      subject: category,
      content: updatedContents,
      id: documentForUpdate.id,
      writeTime: serverTimestamp(),
    });
  } catch (e) {
    console.error(e);
  }
};

export const wikiDelete = async function (category: string) {
  try {
    if (confirm('글을 삭제하시겠습니까?') == true) {
      await deleteDoc(doc(db, `wiki/${category}`));
    }
  } catch (e) {
    alert('삭제에 실패했습니다.');
    console.error(e);
  }
};
