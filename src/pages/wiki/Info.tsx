import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useUser } from '../../common/UserContext';
import { Console } from 'console';

const Info = () => {
  const initialMarkdown = localStorage.getItem('savedMarkdown') || 'default';
  const [markdown, setMarkdown] = useState<string>(initialMarkdown);
  const [tempMarkdown, setTempMarkdown] = useState<string>(markdown);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { user } = useUser();

  console.log(user);
  useEffect(() => {
    localStorage.setItem('savedMarkdown', markdown);
  }, [markdown]);

  const handleEditClick = () => {
    if (isEditing) {
      setMarkdown(tempMarkdown);
    } else {
      setTempMarkdown(markdown);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <textarea
            value={tempMarkdown}
            onChange={(e) => setTempMarkdown(e.target.value)}
            placeholder="내용을 입력하세요"
          />
          <button onClick={() => setTempMarkdown('')}>지우기</button>
        </div>
      ) : (
        <ReactMarkdown>{markdown}</ReactMarkdown>
      )}

      <div>
        <button onClick={handleEditClick}>{isEditing ? '저장' : '편집'}</button>
      </div>
    </div>
  );
};

export default Info;
