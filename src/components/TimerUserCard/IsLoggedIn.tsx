import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'data/user';
import { db } from 'data/firebase';
import { doc, updateDoc } from 'firebase/firestore';

export function IsLoggedIn({ userId }: any) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [lastLoggedId, setLastLoggedId] = useState(
    sessionStorage.getItem('uid'),
  );
  // useEffect(() => {
  // Firebase Auth의 로그인 상태 변화를 감지합니다.
  onAuthStateChanged(auth, (user) => {
    if (user && user.uid === lastLoggedId) {
      // 사용자가 로그인한 경우
      setLastLoggedId(sessionStorage.getItem('uid'));
      console.log('로그잉ㄴ' + lastLoggedId);
      updateFirestoreUserStatus(lastLoggedId, true);
      setIsLoggedIn(true);
    } else if (lastLoggedId) {
      console.log('여기' + lastLoggedId);
      updateFirestoreUserStatus(lastLoggedId, false);
      setIsLoggedIn(false);
    }
  });
  // }, []);

  return (
    <div>
      {isLoggedIn ? (
        <div
          style={{
            backgroundColor: 'green',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
          }}
        ></div>
      ) : (
        <div
          style={{
            backgroundColor: 'red',
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
