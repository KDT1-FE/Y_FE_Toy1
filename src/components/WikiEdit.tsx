import React from "react";
import EditorBox from "./EditorBox";
import "./Wiki.css";

interface WikiEditProps {
  handleSubmitBtn: () => void;
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  content: string;
  setContent: (value: string) => void;
  title: string;
}

const WikiEdit: React.FC<WikiEditProps> = ({
  handleTitleChange,
  handleSubmitBtn,
  // handleContentChange,
  title,
  content,
  setContent,
}) => {
  return (
    <div className="wiki__wrapper">
      <form>
        <div className="wiki__header">
          <input
            className="wikiEdit__title "
            name="title"
            onChange={handleTitleChange}
            value={title}
          />
          <div className="wikiEdit__btn">
            <button className="wikiEdit__btn-edit" onClick={handleSubmitBtn}>
              수정 완료
            </button>
            <button className="wikiEdit__btn-edit">수정 취소 </button>
          </div>
        </div>
        <div className="wikiEdit__textContent">
          <EditorBox value={content} setContent={setContent} />
        </div>
      </form>
    </div>
  );
};

export default WikiEdit;
