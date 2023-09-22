import NoticeListBox from '@components/Notice/NoticeListBox';
import { useSelector } from 'react-redux';
import { getDocs, collection, orderBy, query, onSnapshot, Unsubscribe } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { db } from '../../firebase';

import '@scss/components/noticeList.scss';

const NoticeList = () => {
  const [title, setTitle] = useState<string[]>([]);
  const [itemId, setItemId] = useState<string[]>([]);
  const [data, setData] = useState<NoticeData[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 10;
  const currentItems = data?.slice((currentPage - 1) * itemPerPage, currentPage * itemPerPage);

  const getData = async () => {
    try {
      const querySnapshot = await getDocs(query(collection(db, 'notice'), orderBy('number', 'desc')));
      const data: string[] = [];
      const itemId: string[] = [];
      querySnapshot.forEach(doc => {
        data.push(doc.data().title);
        itemId.push(doc.data().id);
      });
      const firebaseData: NoticeData[] = querySnapshot.docs.map(doc => ({ ...(doc.data() as NoticeData) }));

      setData(firebaseData);
      setTitle(data);
      setItemId(itemId);
    } catch {
      console.error();
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const userEmail = useSelector((state: State) => state.loginUpdate.email);
  const handleWriteBtn = (): void => {
    if (userEmail === '') {
      alert('로그인이 필요합니다!');
      return;
    } else {
      location.href = '/notice/write';
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      alert('가장 처음 페이지입니다!');
    }
  };

  const handleNextPage = () => {
    const maxPage = Math.ceil(data!.length / itemPerPage);
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
    } else {
      alert('가장 마지막 페이지입니다!');
    }
  };

  const querySnapshot = query(collection(db, 'notice'), orderBy('number', 'desc'));
  const unsubscribe: Unsubscribe = onSnapshot(querySnapshot, snapshot => {
    snapshot.docChanges().forEach(change => {
      if (change.type === 'removed') {
        getData();
      }
    });
  });

  return (
    <section className="notice">
      <article className="notice-title">
        <h1>공지사항</h1>
      </article>
      <button className="notice-write-btn btn" onClick={handleWriteBtn}>
        글쓰기
      </button>
      <article className="notice__item-container">
        {title.length > 0 ? (
          <NoticeListBox itemId={itemId} unsubscribe={unsubscribe} currentItems={currentItems} />
        ) : (
          <div>Loading...</div>
        )}
      </article>
      <div className="notice__btns">
        <button type="button" className="notice__prev-btn btn" onClick={handlePrevPage}>
          이전 페이지
        </button>
        <button type="button" className="notice__next-btn btn" onClick={handleNextPage}>
          다음 페이지
        </button>
      </div>
    </section>
  );
};

export default NoticeList;

interface NoticeData {
  content: string;
  id: string;
  number: number;
  time: string;
  title: string;
  url: string;
  userEmail: string;
}

interface login {
  email: string;
}

interface State {
  loginUpdate: login;
}
