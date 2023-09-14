import { useEffect, useRef } from 'react';

const useInterval = (callback: () => unknown, delay: number | null) => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay == null) {
      return;
    }

    const timeId = setInterval(() => savedCallback.current(), delay);

    return () => clearInterval(timeId);
  }, [delay]);
};

export default useInterval;
