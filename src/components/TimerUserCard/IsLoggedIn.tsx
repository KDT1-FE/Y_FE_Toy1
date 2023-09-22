import React, { useEffect, useState } from 'react';
import { db } from 'data/firebase';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
import './IsLoggedIn.scss';

export function IsLoggedIn({ userId }: any) {
  const [userStatus, setUserStatus] = useState<boolean | null>(null);

  useEffect(() => {
    const userRef = doc(db, 'User', userId);

    const unsubscribe = onSnapshot(userRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        if (userData) {
          const isLoggedIn = userData.isLoggedIn;
          setUserStatus(isLoggedIn);
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [userId]);

  return (
    <div>
      {userStatus !== null && (
        <div
          className="user-status"
          style={{
            backgroundColor: userStatus ? 'green' : 'red',
            width: '23px',
            height: '23px',
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
  } catch (error) {
    console.error(
      `FiresisLoggedIn tore에서 사용자의 상태를 업데이트하는 중 오류 발생: ${error}`,
    );
  }
};
