import React from "react";
import { useState } from "react";
import WikiEdit from "./WikiEdit";

interface ValueState {
  id: number;
  title: string;
  content: string;
}

const Attendance = () => {
  //수정 창 열고 닫기
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<ValueState>({
    id: 1,
    title: " 제목입니다",
    content: "내용임",
  });

  //제목, 내용 상태관리
  const [title, setTitle] = useState<string>("제목");
  const [content, setContent] = useState<string>("글 내용");

  // 타이핑 하는 값 받아오기
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    console.log(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    console.log(e.target.value);
  };

  // 수정 완료 버튼 함수
  const handleSubmitBtn = () => {
    const updatedValue = { ...value, title, content };
    setValue(updatedValue);
    setIsOpen(false);
    console.log(isOpen);
  };

  if (!!isOpen)
    return (
      <WikiEdit
        handleTitleChange={handleTitleChange}
        title={title}
        content={content}
        handleSubmitBtn={handleSubmitBtn}
        handleContentChange={handleContentChange}
      />
    );
  return (
    <>
      <main className="main-container">
        <button onClick={() => setIsOpen(true)}> 수정 </button>
        <div> {title} </div>
        <div> {content} </div>
      </main>
    </>
  );
};

export default Attendance;
