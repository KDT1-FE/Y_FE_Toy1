import React from "react";

interface ValueState {
  id: number;
  title: string;
  content: string;
}

interface WikiEditProps {
  handleSubmitBtn: () => void;
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  content: string;
  title: string;
}

const WikiEdit: React.FC<WikiEditProps> = ({
  handleTitleChange,
  handleSubmitBtn,
  handleContentChange,
  title,
  content,
}) => {
  return (
    <div>
      <form>
        <div>
          <input name="title" onChange={handleTitleChange} value={title} />
        </div>
        <div>
          <textarea
            rows={8}
            onChange={handleContentChange}
            name="content"
            value={content}
          />
        </div>

        <button onClick={handleSubmitBtn}>수정 완료</button>
        <button>닫기 </button>
      </form>
    </div>
  );
};

export default WikiEdit;
