import { useState, useEffect, useRef } from 'react';
import { Editor, Viewer } from '@toast-ui/react-editor';
import { db } from '../../common/config';
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import '@toast-ui/editor/dist/toastui-editor.css';
import { StyledContainer, StyledTitle, StyledButton, StyledTime } from './Info';
import { useUser } from '../../common/UserContext';
import { CategoryTitleSection, BreadCrumb } from '../Gallery/Project';

const Rule = () => {
  const [title, setTitle] = useState<string>('');
  const [markdown, setMarkdown] = useState<string>('');
  const [editor, setEditor] = useState<string>('');
  const editorRef = useRef<Editor | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [lastEdited, setLastEdited] = useState<null | Date>(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'wiki', 'rule');
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setMarkdown(data.content);
          setTitle(data.title || '');
          setEditor(data.editor);
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
    if (user) {
      if (isEditing && editorRef.current) {
        const editedMarkdown = editorRef.current.getInstance().getMarkdown();
        setMarkdown(editedMarkdown);
        const currentTime = Timestamp.now();
        try {
          const docRef = doc(db, 'wiki', 'rule');
          await setDoc(docRef, {
            title,
            content: editedMarkdown,
            lastEdited: currentTime,
            editor: user.name,
          });
          setLastEdited(currentTime.toDate());
          setEditor(user.name);
        } catch (error) {
          console.error(error);
        }
      }
      setIsEditing(!isEditing);
    } else {
      alert('로그인을 해주세요');
    }
  };

  return (
    <StyledContainer>
      {isEditing ? (
        <>
          <StyledTitle
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
        <>
          <CategoryTitleSection>
            <h1>{title}</h1>
            <BreadCrumb>위키 &gt; 규칙 &gt; 기본 규칙</BreadCrumb>
          </CategoryTitleSection>

          {lastEdited && (
            <StyledTime>
              마지막 수정: {lastEdited.toLocaleString()} / 최근 편집자: {editor}
            </StyledTime>
          )}
          <Viewer key={markdown} initialValue={markdown} />
        </>
      )}
      <hr />

      <StyledButton onClick={handleEditClick}>{isEditing ? '저장' : '편집'}</StyledButton>
    </StyledContainer>
  );
};

export default Rule;
