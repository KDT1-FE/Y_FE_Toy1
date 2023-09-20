import React, { EventHandler, useState } from 'react';

import '../scss/components/writePage/writePage.scss';

const NoticeWritePage = () => {
  const [notice, setNotice] = useState({});
  const [file, setFile] = useState<File | null>();
  const [content, setContent] = useState<string>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFile(files && files[0]);
      return;
    }
    setNotice(item => ({ ...item, [name]: value }));
  };

  const handleContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <form className="write-form" onSubmit={handleSubmit}>
      <div className="write-form__title">
        <input
          type="text"
          name="title"
          className="write-form__title__item"
          placeholder="제목을 입력하세요"
          onChange={handleChange}
          required></input>
        ;
      </div>
      <div className="write-form__content">
        <textarea name="content" className="write-form__content__item" onChange={handleContent}></textarea>
      </div>
      <div className="write-util">
        <input
          type="file"
          accept="image/*"
          name="file"
          required
          className="write-util__image"
          onChange={handleChange}
        />
        <button type="submit" className="write-form__button btn">
          완료
        </button>
      </div>
    </form>
  );
};

export default NoticeWritePage;
