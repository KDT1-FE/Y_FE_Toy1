import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

import '../scss/contentsPage.scss';

const Contents = () => {
  const location = useLocation();
  const itemId = location.state;
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [content, setContent] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const navigate = useNavigate();

  const getData = async () => {
    const docRef = doc(db, 'notice', location.state);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const title = docSnap.data().title;
      const time = docSnap.data().time;
      const content = docSnap.data().content;
      const imgUrl = docSnap.data().url;
      setTitle(title);
      setTime(time);
      setContent(content);
      setImgUrl(imgUrl);
    } else {
      console.error('파일이 없습니다!');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="contents">
      <div className="content-util">
        <p className="content-util__time">{time}</p>
        <button
          className="btn content-util__modify"
          onClick={() => navigate(`/notice/content/update/${location.state}`, { state: itemId })}>
          수정
        </button>
      </div>
      <div className="content-title">{title}</div>
      <div className="content-item">{content}</div>
      {imgUrl ? <img src={imgUrl} alt={title} className="content-img" /> : ''}
    </div>
  );
};

export default Contents;
