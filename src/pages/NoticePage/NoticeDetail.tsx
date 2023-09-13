import React, { useEffect, useState } from 'react';
import { DocumentData, doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { db } from '../../firebaseSDK';

function NoticeDetail() {
  const [noticeData, setNoticeData] = useState<DocumentData | undefined>({});
  const { noticeId } = useParams();

  // 공지사항 전체 가져오기
  const FetchNoticeData = async (): Promise<void> => {
    const docRef = doc(db, 'notice', String(noticeId));
    const docSnap = (await getDoc(docRef)).data();

    setNoticeData(docSnap);
  };

  useEffect(() => {
    FetchNoticeData();
  }, []);
  return (
    <div>
      <div>{noticeData?.subject}</div>
      <div>{noticeData?.contents}</div>
      <div>{noticeData?.createAt}</div>
    </div>
  );
}

export default NoticeDetail;
