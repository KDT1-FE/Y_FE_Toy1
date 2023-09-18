import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  doc,
  updateDoc,
  onSnapshot,
  Unsubscribe,
  getDoc,
  serverTimestamp,
  query,
  collection,
} from 'firebase/firestore';
import { db } from 'data/firebase';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/types'; // RootState 타입 추가

//unix timestamp
const timeStamp = Math.floor(new Date().getTime() / 1000);
function getCurrentDateFromStamp(timestamp: number): number {
  const fullDate = new Date(timestamp * 1000);
  const onlyDate = fullDate.getDate();
  return onlyDate;
}

interface TimerProps {
  id: string;
}

//Timer 컴포넌트
export function Timer({ id }: TimerProps): JSX.Element {
  const [currentHours, setCurrentHours] = useState(0);
  const [currentMinutes, setCurrentMinutes] = useState(0);
  const [currentSeconds, setCurrentSeconds] = useState(0);

  const [count, setCount] = useState(0);
  const intervalRef: React.MutableRefObject<unknown | null> = useRef(null);

  let unsubscribe: Unsubscribe | undefined;
  let timer: any;
  //스토어 유저 정보
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

  //시작 버튼 동작
  const handleStart: (event: any) => void = useCallback(async (event) => {
    if (intervalRef.current !== null) {
      return;
    }
    const chosenUserRef = doc(db, 'User', event.target.id);

    // 타이머 시작 (1초마다 호출)
    timer = setInterval(async () => {
      const docSnapshot = await getDoc(chosenUserRef);
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        const newAccumulateCount = userData.accumulateCount + 1;
        await updateDoc(chosenUserRef, {
          accumulateCount: newAccumulateCount,
        });
        setCount(newAccumulateCount);
      } else {
        console.error('문서가 없음');
      }
    }, 1000);

    //실시간 업데이트 수신 중지
    unsubscribe = onSnapshot(chosenUserRef, async (docSnapshot) => {
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        setCount(userData.accumulateCount);
      } else {
        return;
      }
    });
  }, []);

  //정지 버튼 동작
  const handleStop: () => void = useCallback(() => {
    if (timer !== null) {
      clearInterval(timer);
      timer = null; // 타이머 중지
    }

    if (unsubscribe) {
      unsubscribe();
      unsubscribe = undefined;
    }
  }, []);

  //시간 초기화
  const reset: () => void = useCallback(() => {
    setCount(0);
  }, []);

  useEffect(() => {
    const hours = Math.floor(count / 3600);
    const minutes = Math.floor((count % 3600) / 60);
    const seconds = count % 60;
    setCurrentHours(hours);
    setCurrentSeconds(seconds);
    setCurrentMinutes(minutes);
  }, [count]);

  const currentDate = getCurrentDateFromStamp(timeStamp);

  useEffect(() => {
    reset();
  }, [currentDate]);

  return (
    <div>
      <p>
        {currentHours < 10 ? `0${currentHours}` : currentHours}:
        {currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes}:
        {currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds}
      </p>
      {user.uid === id && (
        <button id={id} onClick={handleStart}>
          시작
        </button>
      )}
      {user.uid === id && <button onClick={handleStop}>정지</button>}
    </div>
  );
}
