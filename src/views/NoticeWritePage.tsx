import React, { useState } from 'react';
import { storage, db } from '../firebase';
import { doc, addDoc, collection, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useSelector } from 'react-redux';

import '../scss/components/writePage/writePage.scss';

const NoticeWritePage = () => {
  const [title, setTitle] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [content, setContent] = useState<string>();
  const userEmail = useSelector(state => state.loginUpdate.email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (file !== null) {
        const noticeRef = ref(storage, `images/notice/${new Date().getTime() + file.name}`);
        const snapshot = await uploadBytes(noticeRef, file);
        const imgUrl = await getDownloadURL(snapshot.ref);
        const data = {
          title,
          content,
          time: new Date().toLocaleString(),
          userEmail,
          url: imgUrl,
          number: new Date().getTime(),
        };

        await addDoc(collection(db, 'notice'), data).then(item => {
          const docRef = doc(db, 'notice', item.id);
          updateDoc(docRef, {
            id: item.id,
          });
          alert('사진 등록이 완료 되었습니다.');
        });
      } else {
        const data = {
          title,
          content,
          time: new Date().toLocaleString(),
          userEmail,
          url: null,
          number: new Date().getTime(),
        };
        await addDoc(collection(db, 'notice'), data).then(item => {
          const docRef = doc(db, 'notice', item.id);
          updateDoc(docRef, {
            id: item.id,
          });
          alert('완료 되었습니다.');
        });
      }
    } catch {
      console.error();
    } finally {
      window.location.href = '/company/notice';
    }
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files && e.target.files[0]);
  };

  return (
    <form className="write-form" onSubmit={handleSubmit}>
      <div className="write-form__title">
        <input
          type="text"
          name="title"
          className="write-form__title__item"
          placeholder="제목을 입력하세요"
          onChange={handleTitle}
          required></input>
        ;
      </div>
      <div className="write-form__content">
        <textarea name="content" className="write-form__content__item" onChange={handleContent}></textarea>
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

export default NoticeWritePage;
