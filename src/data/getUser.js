import { app, db } from './firebase';
import { collection, getDocs, getDoc, doc } from 'firebase/firestore';

// firestore에서 User 데이터 불러오기
const querySnapshot = await getDocs(collection(db, 'User'));
const getDocumentsAsObjects = (querySnapshot) => {
  const documents = [];
  querySnapshot.forEach((doc) => {
    const { username, nickname, email, image } = doc.data();
    documents.push({
      id: doc.id,
      username,
      nickname,
      email,
      image,
    });
  });
  return documents;
};
export const userObjects = getDocumentsAsObjects(querySnapshot);

//
export const selectUserData = async (uid) => {
  const docRef = doc(db, 'User', uid);
  const userDoc = await getDoc(docRef);
  return userDoc.data();
  // const currentUser = userObjects.find((user) => user.id === uid);
};
