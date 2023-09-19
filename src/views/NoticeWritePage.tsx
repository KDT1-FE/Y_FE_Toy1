import React, { useState } from 'react';
import { Editor } from '@toast-ui/react-editor';
import { ChangeEvent } from 'react';

import '../scss/components/writePage/writePage.scss';
import '@toast-ui/editor/dist/toastui-editor.css';

const NoticeWritePage = () => {
  const [contentTitle, setContentTitle] = useState<string>('');
  // const [contentText, setContentText] = useState<string>('');
  const handleContentTitle = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setContentTitle(target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form className="write-form" onSubmit={handleSubmit}>
      <div className="write-form__title">
        <textarea
          className="write-form__title__item"
          placeholder="제목을 입력하세요"
          onChange={handleContentTitle}
          value={contentTitle}></textarea>
        ;
      </div>
      <Editor initialEditType="markdown" height="400px" initialValue=" "></Editor>
      <button type="submit" className="write-form__button btn">
        완료
      </button>
    </form>
  );
};

export default NoticeWritePage;
