import React, { useState } from 'react';

// CreatePostModalProps 인터페이스 정의
interface CreatePostModalProps {
  onSave: (title: string, content: string) => void;
  title: string; // title prop 추가
  setTitle: (title: string) => void; // setTitle prop 추가
  content: string;
  setContent: (content: string) => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ onSave }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSave = () => {
    onSave(title, content); // 수정된 onSave 함수 호출
    setTitle('');
    setContent('');
  };
  
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>모집글 작성</h2>
        <label htmlFor="title">제목:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="content">내용:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button onClick={handleSave}>완료</button>
      </div>
    </div>
  );
};

export default CreatePostModal;
