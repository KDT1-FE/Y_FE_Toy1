import { useState, useEffect } from 'react';
import { marked } from 'marked';

const Team = () => {
  const initialMarkdown = localStorage.getItem('saved') || '소ㄱㅐ내용~~';
  const [markdown, setMarkdown] = useState<string>(initialMarkdown);
  const [tempMarkdown, setTempMarkdown] = useState<string>(markdown);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('saved', markdown);
  }, [markdown]);

  const handleEditClick = () => {
    if (isEditing) {
      setMarkdown(tempMarkdown);
    } else {
      setTempMarkdown(markdown);
    }
    setIsEditing(!isEditing);
  };

  const renderedMarkdown = marked(markdown);

  return (
    <div>
      {isEditing ? (
        <div>
          <textarea
            value={tempMarkdown}
            onChange={(e) => setTempMarkdown(e.target.value)}
            placeholder="내용을 입력하세요"
          />
        </div>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: renderedMarkdown }} />
      )}

      <div>
        <button onClick={handleEditClick}>{isEditing ? '저장' : '편집'}</button>
      </div>
    </div>
  );
};

export default Team;
