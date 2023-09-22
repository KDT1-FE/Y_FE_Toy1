import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  doc,
  updateDoc,
  onSnapshot,
  Unsubscribe,
  getDoc,
  query,
  collection,
} from 'firebase/firestore';
import { db } from 'data/firebase';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/types';
import { formatTime } from 'data/formatTime';

//unix timestamp
const timeStamp = Math.floor(new Date().getTime() / 1000);
function getCurrentDateFromStamp(timestamp: number): number {
  const fullDate = new Date(timestamp * 1000);
  const onlyDate = fullDate.getDate();
  return onlyDate;
}

interface ITimerProps {
  id: string;
  showButton?: boolean;
}

//Timer 컴포넌트
export function Timer({ id, showButton = true }: ITimerProps): JSX.Element {
  const [count, setCount] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  let unsubscribe: Unsubscribe | undefined;
  let timer: any;
  const user = useSelector((state: RootState) => state);

  //페이지 로드 시 count 데이터 불러오기
  useEffect(() => {
    const userRef = doc(db, 'User', id);
    const fetchData = async () => {
      const docSnapshot = await getDoc(userRef);
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        setCount(userData.accumulateCount);
      }
    };
    fetchData();
  }, [id]);

  //firestore에서 데이터 업데이트 발생 시 데이터 받아오기
  useEffect(() => {
    const docRefs = query(collection(db, 'User'));
    onSnapshot(docRefs, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.id === id) {
          setCount(doc.data().accumulateCount);
        }
      });
    });
  }, [count]);

  const handleStart: (event: any) => void = useCallback(
    async (event) => {
      event.stopPropagation();
      setIsTimerRunning(true);

      if (intervalRef.current !== null) {
        return;
      }
      const chosenUserRef = doc(db, 'User', event.target.id);
      if (!isTimerRunning) {
        timer = setInterval(async () => {
          const docSnapshot = await getDoc(chosenUserRef);
          if (docSnapshot.exists()) {
            const userData = docSnapshot.data();
            const newAccumulateCount = userData.accumulateCount + 1;
            setCount(newAccumulateCount);
            await updateDoc(chosenUserRef, {
              accumulateCount: newAccumulateCount,
            });
          } else {
            console.error('문서가 없음');
          }
        }, 1000);
      }

      //실시간 업데이트 수신 중지
      unsubscribe = onSnapshot(chosenUserRef, async (docSnapshot) => {
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          setCount(userData.accumulateCount);
        } else {
          return;
        }
      });
    },
    [isTimerRunning],
  );

  const handleStop: (event: any) => void = useCallback((event) => {
    event.stopPropagation();
    if (timer !== null) {
      clearInterval(timer);
      timer = null;
    }

    if (unsubscribe) {
      unsubscribe();
      unsubscribe = undefined;
    }

    setIsTimerRunning(false);
  }, []);

  // 날짜 변경 감지 및 count 초기화
  useEffect(() => {
    const userRef = doc(db, 'User', id);
    const checkDateInterval = setInterval(async () => {
      const docSnapshot = await getDoc(userRef);
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        const serverTimestamp = userData.serverTimestamp;
        const currentServerTime = Math.floor(new Date().getTime() / 1000);

        // 서버 시간과 Firestore의 서버 타임스탬프를 비교해서 count 업데이트
        if (currentServerTime > serverTimestamp) {
          setCount(0);
          await updateDoc(userRef, { accumulateCount: 0 });
        }
      }
    }, 1800000);

    return () => {
      clearInterval(checkDateInterval);
    };
  }, [id]);

  const formattedTime = formatTime(count);

  return (
    <div>
      <p>{formattedTime}</p>
      {showButton && user.uid === id && (
        <button id={id} onClick={handleStart}>
          시작
        </button>
      )}
      {showButton && user.uid === id && (
        <button onClick={handleStop}>정지</button>
      )}
    </div>
  );
}
