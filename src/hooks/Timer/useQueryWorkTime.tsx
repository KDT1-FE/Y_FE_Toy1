import {
  collection,
  onSnapshot,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { db, auth } from "../../libs/firebase";
import { WorkTimeInfo, workTimeConverter } from "../../libs/firestore";

const useQueryWorkTime = (): [
  isLoaded: boolean,
  worktime: WorkTimeInfo[] | undefined,
] => {
  const user = auth.currentUser;
  const userUid = user ? user.uid : null;
  // TODO: 날짜도 캘린더 날짜에 따라 달라지므로 나중에 수정 필요
  const start = new Date("2023-08-15");
  const end = new Date("2023-10-15");
  const [isLoaded, setIsLoaded] = useState(false);
  const [worktime, setWorktime] = useState<WorkTimeInfo[] | undefined>();

  useEffect(() => {
    const getWorkTimes = async () => {
      // TODO: 쿼리는 아이디 값이 달라질것이기 때문에 변경 필요
      const q = query(
        collection(db, `Users/${userUid}/worktime`).withConverter(
          workTimeConverter,
        ),
        where("starttime", ">=", start),
        where("starttime", "<=", end),
      );

      // 데이터 실시간 반영
      const workTimeUnsubscribe = onSnapshot(q, (snapshot: QuerySnapshot) => {
        const data: WorkTimeInfo[] = [];
        snapshot.forEach((doc) => {
          const workTimeData = doc.data() as WorkTimeInfo;
          data.push(workTimeData);
        });

        setWorktime(data);
        setIsLoaded(true);
      });

      return () => workTimeUnsubscribe();
    };

    getWorkTimes();
  }, [userUid]);

  return [isLoaded, worktime];
};

export default useQueryWorkTime;
