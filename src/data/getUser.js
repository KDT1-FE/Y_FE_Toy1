import { app, db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

//firestore에서 User 데이터 불러오기
const querySnapshot = await getDocs(collection(db, 'User'));
const getDocumentsAsObjects = (querySnapshot) => {
  const documents = [];

  querySnapshot.forEach((doc) => {
    documents.push({
      id: doc.id,
      name: doc.data().name,
      photo: doc.data().photo,
    });
  });
  return documents;
};
export const userObjects = getDocumentsAsObjects(querySnapshot);
