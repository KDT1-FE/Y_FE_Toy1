import NoticeListBox from './NoticeListBox';
import { useSelector } from 'react-redux';
import { db } from '../../firebase';
import { getDocs, collection, orderBy, query } from 'firebase/firestore';
import { useState, useEffect } from 'react';

import '../../scss/projectList.scss';

const NoticeList = () => {
  const [title, setTitle] = useState<string[]>([]);
  const [itemId, setItemId] = useState<string[]>([]);

  const getData = async () => {
    try {
      const querySnapshot = await getDocs(query(collection(db, 'notice'), orderBy('number', 'desc')));
      const data: string[] = [];
      const itemId: string[] = [];
      querySnapshot.forEach(doc => {
        data.push(doc.data().title);
        itemId.push(doc.data().id);
      });
      setTitle(data);
      setItemId(itemId);
    } catch {
      console.error();
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const userEmail = useSelector(state => state.loginUpdate.email);
  const handleWriteBtn = (): void => {
    if (userEmail === '') {
      alert('로그인이 필요합니다!');
      return;
    } else {
      location.href = '/notice/write';
    }
  };

  return (
    <section className="section container">
      <article className="section__filter">
        <input className="section__project-search-input" type="text" />
        <button className="section__project-write-btn btn" onClick={handleWriteBtn}>
          글쓰기
        </button>
      </article>
      <article className="section__project-container">
        {title.length > 0 ? <NoticeListBox title={title} itemId={itemId} /> : <div>Loading...</div>}
      </article>
    </section>
  );
};

export default NoticeList;
