import { Editor } from '@toast-ui/react-editor';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import { useNavigate, useParams } from 'react-router-dom';
import { db, projectCollection } from '../../firebase';
import '@toast-ui/editor/dist/i18n/ko-kr';
import { doc, onSnapshot, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { WriteType } from './ProjectWirtePage';

import '@scss/projectWritePage.scss';

const ProjectUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const ref = doc(projectCollection, id);
  const [isLoading, setIsLoading] = useState(true);
  const editorRef = useRef<Editor>(null);
  const [edit, setEdit] = useState<string>();
  const [updateData, setUpdateData] = useState<UpdateType>({
    status: '',
    title: '',
    content: '',
    writeDate: '',
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(ref, snapshot => {
      const data = snapshot.data();
      setIsLoading(false);
      if (data) {
        setUpdateData({
          status: data.status,
          title: data.title,
          content: data.content,
          writeDate: data.writeDate ? data.writeDate.toDate().toLocaleString() : '',
        });
      }
    });
    return () => {
      unsubscribe();
    };
  }, [id]);

  const cancelHandle = () => {
    navigate('/project');
  };

  const changeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdateData({
      ...updateData,
      [name]: value,
    });
  };

  const changeRadioHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUpdateData({ ...updateData, status: value });
  };

  const changeEditHandler = () => {
    if (editorRef.current) {
      const editorValue = editorRef.current.getInstance().getMarkdown();
      setEdit(editorValue);
      setUpdateData({ ...updateData, content: edit });
    }
  };

  const projectUpdate = async (id: string) => {
    try {
      const projectDoc = doc(db, 'project', id);
      await updateDoc(projectDoc, { ...updateData, writeDate: serverTimestamp() });
      return navigate('/project');
    } catch (error) {
      console.error('Error', error);
    }
  };

  const submitHandle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      await projectUpdate(id);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoading) {
    return (
      <form className="write container">
        <div className="write__btns-box">
          <input type="button" className="write__add-btn btn" onClick={submitHandle} value="수정" />
          <button onClick={cancelHandle} className="write__cancel-btn btn">
            취소
          </button>
        </div>
        <div>{updateData.writeDate}</div>
        <div className="write__radios-box">
          <div className="write__radio-box">
            <input
              type="radio"
              id="expected"
              value={'expected'}
              name="status"
              onChange={changeRadioHandle}
              checked={updateData.status === 'expected'}
            />
            <label htmlFor="expected">예정</label>
          </div>
          <div className="write__radio-box">
            <input
              type="radio"
              id="progress"
              value={'proceeding'}
              name="status"
              onChange={changeRadioHandle}
              checked={updateData.status === 'proceeding'}
            />
            <label htmlFor="progress">진행중</label>
          </div>
          <div className="write__radio-box">
            <input
              type="radio"
              id="complete"
              value={'complete'}
              name="status"
              onChange={changeRadioHandle}
              checked={updateData.status === 'complete'}
            />
            <label htmlFor="complete">완료</label>
          </div>
        </div>
        <input
          className="write__input-title"
          name="title"
          placeholder="제목을 입력해주세요"
          value={updateData.title}
          onChange={changeHandle}
        />
        <Editor
          ref={editorRef}
          previewStyle={window.innerWidth > 1000 ? 'vertical' : 'tab'}
          height={'75vh'}
          initialValue={updateData.content || ''}
          name="content"
          initialEditType="markdown"
          useCommandShortcut={false}
          hideModeSwitch={true}
          plugins={[colorSyntax]}
          language="ko-KR"
          onChange={changeEditHandler}
          toolbarItems={[
            // 툴바 옵션 설정
            ['heading', 'bold', 'italic', 'strike'],
            ['hr', 'quote'],
            ['ul', 'ol', 'task', 'indent', 'outdent'],
            ['table', 'link'],
            ['code', 'codeblock'],
          ]}
        />
      </form>
    );
  }

  return <></>;
};

export default ProjectUpdate;

export interface UpdateType extends WriteType {
  writeDate: string | null;
}
