import { useState, useEffect, useRef } from 'react';
import { Editor, Viewer } from '@toast-ui/react-editor';
import { db } from '../../common/config';
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import '@toast-ui/editor/dist/toastui-editor.css';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;

const TitleInput = styled.input`
  display: block;
  margin-bottom: 10px;
  width: 100%;
  padding: 8px;
  font-size: 16px;
`;

const StyledButton = styled.button`
  margin-top: 10px;
  padding: 5px 15px;
  font-size: 14px;
  cursor: pointer;
`;

const Team = () => {
  const [title, setTitle] = useState<string>('');
  const [markdown, setMarkdown] = useState<string>('');
  const editorRef = useRef<Editor | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [lastEdited, setLastEdited] = useState<null | Date>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'teamData', 'markdownContent');
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setMarkdown(data.content);
          setTitle(data.title || '');
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
    if (isEditing && editorRef.current) {
      const editedMarkdown = editorRef.current.getInstance().getMarkdown();
      setMarkdown(editedMarkdown);
      const currentTime = Timestamp.now();
      try {
        const docRef = doc(db, 'teamData', 'markdownContent');
        await setDoc(docRef, {
          title,
          content: editedMarkdown,
          lastEdited: currentTime,
        });
        setLastEdited(currentTime.toDate());
      } catch (error) {
        console.error(error);
      }
    }
    setIsEditing(!isEditing);
  };

  return (
    <Container>
      {isEditing ? (
        <>
          <TitleInput
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
          />
          <Editor
            placeholder="내용을 입력하세요"
            initialValue={markdown}
            previewStyle="vertical" // 미리보기 스타일 지정
            height="800px"
            initialEditType="markdown" // 초기 입력모드
            ref={editorRef}
            usageStatistics={false} // 통계 수집 거부
          />
        </>
      ) : (
        <div>
          <h1>{title}</h1>

          {lastEdited && <p>마지막 수정: {lastEdited.toLocaleString()}</p>}
          <hr />
          <Viewer key={markdown} initialValue={markdown} />
        </div>
      )}
      <hr />
      <div>
        <StyledButton onClick={handleEditClick}>{isEditing ? '저장' : '편집'}</StyledButton>
      </div>
    </Container>
  );
};

export default Team;
