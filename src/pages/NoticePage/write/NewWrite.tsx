import React, { useEffect, useState } from 'react';
import { DocumentData, doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import NoticeWrite from '../NoticeWrite';
import { db } from '../../../firebaseSDK';

function EditWrite() {
  const { noticeId } = useParams();
  const [data, setData] = useState<DocumentData | undefined>({});

  // 공지사항 정보 가져오기 함수
  const FetchNoticeData = async (): Promise<void> => {
    try {
      const docRef = doc(db, 'notice', String(noticeId));
      const docSnap = (await getDoc(docRef)).data();
      setData(docSnap);
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  useEffect(() => {
    FetchNoticeData();
  }, []);

  return <NoticeWrite isEdit data={data} />;
}

export default EditWrite;
