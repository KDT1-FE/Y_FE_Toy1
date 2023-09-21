import {useEffect, useRef} from "react";

type Callback = () => void;

export default function useInterval(callback: Callback, delay: number | null) {
  const savedCallback = useRef<Callback | null>(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function func() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }
    if (delay !== null) {
      const id = setInterval(func, delay);
      return () => clearInterval(id);
    }
    return undefined;
  }, [delay]);
}
