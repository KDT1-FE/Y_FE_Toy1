import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebaseSDK';

const getNoticeData = async () => {
  try {
    const notice = collection(db, 'notice');
    const querySnapshot = await getDocs(query(notice, orderBy('noticeNumber', 'desc')));
    return querySnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error('Error:', error);
  }
  return null;
};

export default getNoticeData;
