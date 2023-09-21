import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from './firebase';

// 사용자 정보 가져오기
export const getCurrentUserData = async () => {
  const user = auth.currentUser;
  if (user) {
    const docRef = doc(db, 'User', user.uid); // 'User' 컬렉션에서 현재 사용자 문서 가져오기
    try {
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        return docSnapshot.data();
      } else {
        console.error('사용자 데이터를 찾을 수 없습니다.');
        return null;
      }
    } catch (error) {
      console.error('사용자 데이터를 불러오는 중 오류 발생:', error);
      return null;
    }
  } else {
    console.error('사용자가 인증되지 않았습니다.');
    return null;
  }
};

// 사용자 인증 상태 변경 감지
export const onAuthStateChange = (callback) => {
  onAuthStateChanged(auth, callback);
};

export const useAuth = () => {
  return { auth };
};
