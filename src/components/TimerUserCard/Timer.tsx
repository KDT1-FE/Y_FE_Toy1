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
import { formatTime } from 'data/formatTime';

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
  const [count, setCount] = useState(0);
  const intervalRef = useRef<number | null>(null); // interval ID 저장
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  // const [currentDate, setCurrentDate] = useState(
  //   getCurrentDateFromStamp(timeStamp),
  // );

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
  const handleStart: (event: any) => void = useCallback(
    async (event) => {
      event.stopPropagation();
      //버튼 비활성화
      setIsTimerRunning(true);

      if (intervalRef.current !== null) {
        return;
      }
      const chosenUserRef = doc(db, 'User', event.target.id);
      if (!isTimerRunning) {
        // 타이머 시작 (1초마다 호출)
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

  //정지 버튼 동작
  const handleStop: (event: any) => void = useCallback((event) => {
    event.stopPropagation();
    if (timer !== null) {
      clearInterval(timer);
      timer = null; // 타이머 중지
    }

    if (unsubscribe) {
      unsubscribe();
      unsubscribe = undefined;
    }
    // 버튼 활성화
    setIsTimerRunning(false);
  }, []);

  // 날짜 변경 감지 및 count 초기화
  useEffect(() => {
    const userRef = doc(db, 'User', id);
    // 간격을 두고 실행
    const checkDateInterval = setInterval(async () => {
      const docSnapshot = await getDoc(userRef);
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        const serverTimestamp = userData.serverTimestamp; // Firestore의 서버 타임스탬프
        const currentServerTime = Math.floor(new Date().getTime() / 1000);

        // 서버 시간과 Firestore의 서버 타임스탬프를 비교하여 날짜 변경 확인
        if (currentServerTime > serverTimestamp) {
          setCount(0);
          // Firestore에 count 업데이트
          await updateDoc(userRef, { accumulateCount: 0 });
        }
      }
    }, 1800000); // 30분마다 체크

    return () => {
      clearInterval(checkDateInterval);
    };
  }, [id]);

  const formattedTime = formatTime(count);

  return (
    <div>
      <p>{formattedTime}</p>
      {user.uid === id && (
        <button id={id} onClick={handleStart}>
          시작
        </button>
      )}
      {user.uid === id && <button onClick={handleStop}>정지</button>}
    </div>
  );
}
