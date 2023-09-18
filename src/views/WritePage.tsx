import React from 'react';
import WriteSubmitBtn from '../components/write/WriteSubmitBtn';
import WriteTitle from '../components/write/WriteTitle';
import { Editor } from '@toast-ui/react-editor';

import '../scss/components/writePage/writePage.scss';
import '@toast-ui/editor/dist/toastui-editor.css';

const WritePage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form className="write-form" onSubmit={handleSubmit}>
      <WriteTitle />
      <Editor initialEditType="markdown" height="400px" initialValue=" "></Editor>
      <WriteSubmitBtn />
    </form>
  );
};

export default WritePage;
