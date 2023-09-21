import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'data/user';
import { db } from 'data/firebase';
import { doc, updateDoc, collection, getDocs } from 'firebase/firestore';

export function IsLoggedIn({ userId }: any) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userStatus, setUserStatus] = useState<{ [key: string]: boolean }>({});
  const [lastLoggedId, setLastLoggedId] = useState(
    sessionStorage.getItem('uid'),
  );
  useEffect(() => {
    // Firebase Auth의 로그인 상태 변화를 감지
    onAuthStateChanged(auth, (user) => {
      if (user && user.uid === userId) {
        // 사용자가 로그인한 경우
        updateFirestoreUserStatus(userId, true);
        setIsLoggedIn(true);
      } else if (!user && userId) {
        // 사용자가 로그아웃한 경우
        updateFirestoreUserStatus(userId, false);
        setIsLoggedIn(false);
      }
    });
  }, [userId]);

  useEffect(() => {
    const fetchUserStatus = async () => {
      const userCollectionRef = collection(db, 'User');
      const querySnapshot = await getDocs(userCollectionRef);

      const statusData: { [key: string]: boolean } = {};
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        statusData[doc.id] = userData.isLoggedIn;
      });

      setUserStatus(statusData);
    };

    fetchUserStatus();
  }, []);

  return (
    <div>
      {userStatus[userId] !== undefined && (
        <div
          style={{
            backgroundColor: userStatus[userId] ? 'green' : 'red',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
          }}
        ></div>
      )}
    </div>
  );
}

export const updateFirestoreUserStatus = async (
  userId: string,
  isLoggedIn: boolean,
) => {
  if (!userId) return;

  const userRef = doc(db, 'User', userId);

  try {
    await updateDoc(userRef, { isLoggedIn });
    console.log(`Firestore에서 사용자의 isLoggedIn 상태가 업데이트되었습니다.`);
  } catch (error) {
    console.error(
      `Firestore에서 사용자의 isLoggedIn 상태를 업데이트하는 중 오류 발생:`,
      error,
    );
  }
};
