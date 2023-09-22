import { useState, useEffect, useRef } from 'react';
import { Editor, Viewer } from '@toast-ui/react-editor';
import { db } from '../../common/config';
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import '@toast-ui/editor/dist/toastui-editor.css';
import styled from 'styled-components';
import { useUser } from '../../common/UserContext';
import { CategoryTitleSection, CategoryTitle, BreadCrumb } from '../../utils/CategoryTitleSection';
import { SubPageContainer } from '../../utils/CommonDesign';
import { SmallButtonDarkGray } from '../../utils/CommonDesign';

export const StyledTitle = styled.input`
  display: block;
  margin-bottom: 10px;
  width: 100%;
  padding: 8px;
  font-size: 16px;
`;

export const StyledTime = styled.div`
  line-height: 28px;
  font-size: 14px;
  color: gray;
  @media screen and (max-width: 700px) {
    line-height: 20px;
    text-align: center;
    word-break: keep-all;
    padding: 0 10px;
  }
`;

export const MarkdownContainer = styled.div`
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 5px 20px 10px 20px;
  margin-bottom: 15px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 10px;
  @media screen and (max-width: 700px) {
    flex-direction: column;
    gap: 5px;
  }
`;

const Info = () => {
  const [title, setTitle] = useState<string>('');
  const [markdown, setMarkdown] = useState<string>('');
  const [editor, setEditor] = useState<string>(''); //작성자 추가
  const editorRef = useRef<Editor | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [lastEdited, setLastEdited] = useState<null | Date>(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'wiki', 'info');
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setMarkdown(data.content);
          setTitle(data.title || '');
          setEditor(data.editor || '');
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
          const docRef = doc(db, 'wiki', 'info');
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
    <SubPageContainer>
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
            <CategoryTitle>{title}</CategoryTitle>
            <BreadCrumb>위키 &gt; 소개 &gt; 기본 정보</BreadCrumb>
          </CategoryTitleSection>

          <MarkdownContainer>
            <Viewer key={markdown} initialValue={markdown} />
          </MarkdownContainer>
        </>
      )}
      <ButtonContainer>
        {lastEdited && (
          <StyledTime>
            마지막 수정: {lastEdited.toLocaleString()} / 최근 편집자: {editor}
          </StyledTime>
        )}
        <SmallButtonDarkGray onClick={handleEditClick}>
          {isEditing ? '저장' : '편집'}
        </SmallButtonDarkGray>
      </ButtonContainer>
    </SubPageContainer>
  );
};

export default Info;
