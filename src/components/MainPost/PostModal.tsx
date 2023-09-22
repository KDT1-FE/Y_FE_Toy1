import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface ICreatePostModalProps {
  onSave: (title: string, content: string, selectedDate: Date) => void;
  title: string;
  setTitle: (title: string) => void;
  content: string;
  setContent: (content: string) => void;
  onClose: () => void;
}

const CreatePostModal: React.FC<ICreatePostModalProps> = ({
  onSave,
  onClose,
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date()); // 선택된 날짜 상태 추가

  const handleSave = () => {
    onSave(title, content, selectedDate); // 수정된 onSave 함수 호출
    setTitle('');
    setContent('');
    setSelectedDate(new Date()); // 날짜 초기화
  };

  const handleClose = () => {
    onClose(); // 모달 닫기 함수 호출
  };

  return (
    <div className="main-modal">
      <div className="main-modal-content">
        <div className="modal-header">
          <div className="main-modal-text">스터디 모집글 작성</div>
        </div>
        <div className="modal-body">
          <label htmlFor="date">모집 마감일</label>
          <DatePicker
            id="date"
            selected={selectedDate}
            onChange={(date: Date) => setSelectedDate(date)}
          />
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <div className="modal-footer">
          <button onClick={handleClose}>Close</button>
          <button onClick={handleSave}>Complete</button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
