import React, { useState, useEffect } from 'react';
import { storage, db } from '../firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useLocation } from 'react-router-dom';

import '../scss/components/writePage/writePage.scss';

const NoticeUpdatePage = () => {
  const location = useLocation();
  const itemId = location.state;
  const [title, setTitle] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [content, setContent] = useState<string>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (file !== null) {
        const noticeRef = ref(storage, `images/notice/${new Date().getTime() + file.name}`);
        const snapshot = await uploadBytes(noticeRef, file);
        const imgUrl = await getDownloadURL(snapshot.ref);
        const docRef = doc(db, 'notice', itemId);
        await updateDoc(docRef, {
          title,
          content,
          time: new Date().toLocaleString(),
          url: imgUrl,
        });
        alert('완료 되었습니다.');
      }

      const docRef = doc(db, 'notice', itemId);
      await updateDoc(docRef, {
        title,
        content,
        time: new Date().toLocaleString(),
      });
      alert('완료 되었습니다.');
    } catch {
      console.error();
    } finally {
      window.location.href = '/company/notice';
    }
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    console.log(title);
  };

  const handleContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files && e.target.files[0]);
  };

  const getData = async () => {
    const docRef = doc(db, 'notice', itemId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const title = docSnap.data().title;
      const content = docSnap.data().content;
      setTitle(title);
      setContent(content);
    } else {
      console.error('파일이 없습니다!');
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <form className="write-form" onSubmit={handleSubmit}>
      <div className="write-form__title">
        <input
          type="text"
          name="title"
          className="write-form__title__item"
          placeholder="제목을 입력하세요"
          onChange={handleTitle}
          value={title}
          required></input>
        ;
      </div>
      <div className="write-form__content">
        <textarea
          name="content"
          className="write-form__content__item"
          onChange={handleContent}
          value={content}></textarea>
      </div>
      <div className="write-util">
        <input type="file" accept="image/*" name="file" className="write-util__image" onChange={handleFile} />
        <button type="submit" className="write-form__button btn">
          완료
        </button>
      </div>
    </form>
  );
};

export default NoticeUpdatePage;
