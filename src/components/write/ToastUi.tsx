import React from 'react';
import Editor, { toastui } from '@toast-ui/editor';

const ToastUi = () => {
  const editor = new toastui.Editor();

  // editor.getHtml()을 사용해서 에디터 내용 받아오기
  const see1 = function () {
    console.log(editor.getHTML());
  };
  const see2 = function () {
    console.log(editor.getMarkdown());
  };
  return (
    <div>
      TodoTemplate
      <h1>TOAST UI TEST</h1>
      <div id="editor"></div>
      <button onClick={see1}>getHTML</button>
      <button onClick={see2}>getMarkdown</button>
    </div>
  );
};

export default ToastUi;
