import { MouseEventHandler, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { commuteState } from '../data/atoms';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../common/config';
import { uploadCommuteInfo } from '../utils/firebaseUtils';
import { formatDate } from '../utils/formatTime';

const useCommute = (uid: string | null | undefined, toggleModal: () => void) => {
  const [commuteInfo, setCommuteInfo] = useRecoilState(commuteState);

  useEffect(() => {
    const storedStartTime = localStorage.getItem('startTime');
    const storedIsWorking = localStorage.getItem('isWorking');
    if (storedStartTime && storedIsWorking) {
      setCommuteInfo((prev) => ({
        ...prev,
        startTime: JSON.parse(localStorage.getItem('startTime') || ''),
        isWorking: JSON.parse(localStorage.getItem('isWorking') || ''),
      }));
    }
  }, [commuteInfo.startTime]);

  useEffect(() => {
    const getDateInSeoul = () => {
      const formattedDate = formatDate();
      const dateArr = formattedDate.split('. ');
      const [year, month, day] = dateArr;

      return `${year}-${month}-${day}`;
    };

    const fetchOldCommuteInfo = async () => {
      if (!uid) return;

      const dateStr = getDateInSeoul();
      const commuteDateRef = doc(db, 'commute', uid, 'commuteDays', dateStr);
      const commuteDateDoc = await getDoc(commuteDateRef);
      console.log(commuteDateDoc.data());

      if (commuteDateDoc.exists()) {
        console.log('Document exists with data:', commuteDateDoc.data());
        setCommuteInfo((prev) => ({
          ...prev,
          hasWorked: true,
        }));
      } else {
        console.log('No data for path:', 'commute', uid, 'commuteDays', dateStr);
      }
    };

    fetchOldCommuteInfo();
  }, [uid]);

  const handleCommute: MouseEventHandler = (): void => {
    // 출근 눌렀을 때
    if (!commuteInfo.isWorking) {
      localStorage.setItem('startTime', JSON.stringify(Date.now()));
      localStorage.setItem('isWorking', JSON.stringify(true));

      setTimeout(() => {
        setCommuteInfo((prev) => ({
          ...prev,
          isWorking: true,
          startTime: Date.now(),
        }));
      }, 200);
      toggleModal();
      return;
    }
    // 퇴근 눌렀을 때
    const updatedCommuteInfo = {
      ...commuteInfo,
      date: Date.now(),
      isWorking: false,
      endTime: Date.now(),
      workingTime: Date.now() - commuteInfo.startTime,
    };

    setCommuteInfo(updatedCommuteInfo);
  };

  // 확인 눌렀을 때
  const confirmWorkingTime: MouseEventHandler = (): void => {
    uploadCommuteInfo(uid, commuteInfo);
    setTimeout(() => {
      setCommuteInfo((prev) => ({
        ...prev,
        hasWorked: true,
        workingTime: 0,
      }));
    }, 200);

    localStorage.removeItem('startTime');
    localStorage.removeItem('isWorking');
    toggleModal();
  };

  return { commuteInfo, setCommuteInfo, confirmWorkingTime, handleCommute };
};

export default useCommute;
