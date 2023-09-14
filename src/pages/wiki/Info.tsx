import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { db } from '../../common/config';
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';

const Info = () => {
  const [markdown, setMarkdown] = useState<string>('');
  const [tempMarkdown, setTempMarkdown] = useState<string>(markdown);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [lastEdited, setLastEdited] = useState<null | Date>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'infoData', 'markdownContent');
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setMarkdown(data.content);
          if (data.lastEdited) {
            setLastEdited(data.lastEdited.toDate());
          }
        } else {
          console.log('문서가 없음');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleEditClick = async () => {
    if (isEditing) {
      setMarkdown(tempMarkdown);
      const currentTime = Timestamp.now();
      try {
        const docRef = doc(db, 'infoData', 'markdownContent');
        await setDoc(docRef, {
          content: tempMarkdown,
          lastEdited: currentTime,
        });
        setLastEdited(currentTime.toDate());
      } catch (error) {
        console.error(error);
      }
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
      <hr />
      <div>
        {lastEdited && <p>마지막 수정: {lastEdited.toLocaleString()}</p>}
        <button onClick={handleEditClick}>{isEditing ? '저장' : '편집'}</button>
      </div>
    </div>
  );
};

export default Info;
