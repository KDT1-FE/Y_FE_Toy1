import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { commuteState } from '../data/atoms';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../common/config';

const useCommute = (uid: string | null | undefined) => {
  const [commuteInfo, setCommuteInfo] = useRecoilState(commuteState);

  useEffect(() => {
    const fetchOldCommuteInfo = async () => {
      if (!uid) return;

      const dateStr = new Date().toISOString().split('T')[0];
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

  return { commuteInfo, setCommuteInfo };
};

export default useCommute;
