import React, { useEffect, useState, useRef, useCallback } from 'react';

//unix timestamp
const timeStamp = Math.floor(new Date().getTime() / 1000);
function getCurrentDateFromStamp(timestamp: number): number {
  const fullDate = new Date(timestamp * 1000);
  const onlyDate = fullDate.getDate();
  return onlyDate;
}

//Timer의 시작, 중지, 초기화 동작
function handleTimer(
  initialValue: number,
  ms: number,
): {
  count: number;
  start: () => void;
  stop: () => void;
  reset: () => void;
} {
  const [count, setCount] = useState(initialValue);
  const intervalRef: React.MutableRefObject<unknown | null> = useRef(null);
  console.log(intervalRef);
  const start: () => void = useCallback(() => {
    if (intervalRef.current !== null) {
      return;
    }
    intervalRef.current = setInterval(() => {
      setCount((c) => c + 1);
    }, ms);
    console.log(intervalRef.current);
  }, []);
  console.log(intervalRef);
  console.log(intervalRef.current);
  const stop: () => void = useCallback(() => {
    if (intervalRef.current === null) {
      return;
    }
    clearInterval(intervalRef.current as number);
    intervalRef.current = null;
  }, []);
  const reset: () => void = useCallback(() => {
    setCount(0);
  }, []);
  return { count, start, stop, reset };
}

//Timer 컴포넌트
export function Timer(): JSX.Element {
  const [currentHours, setCurrentHours] = useState(0);
  const [currentMinutes, setCurrentMinutes] = useState(0);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const { count, start, stop, reset } = handleTimer(0, 1000);

  useEffect(() => {
    const checkMinutes = Math.floor(count / 60);
    const hours = Math.floor(count / 3600);
    const minutes = checkMinutes % 60;
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
      <h1>타이머입니당~</h1>
      <p>
        {currentHours < 10 ? `0${currentHours}` : currentHours}:
        {currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes}:
        {currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds}
      </p>
      <button onClick={start}>시작</button>
      <button onClick={stop}>정지</button>
    </div>
  );
}
