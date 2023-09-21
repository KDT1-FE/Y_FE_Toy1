import { Editor } from "@toast-ui/react-editor";
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import { useEffect, useRef, useState } from "react";
import {  serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useFirestoreCollectionMutation } from '@react-query-firebase/firestore';
import { projectCollection } from "../firebase";
import '@toast-ui/editor/dist/i18n/ko-kr';
import '../scss/projectWrite.scss';

export interface writeType {
  status:string,
  title:string,
  content?:string
}

const ProjectWirte = ():JSX.Element => {
  const mutation = useFirestoreCollectionMutation(projectCollection);
  const navigate = useNavigate();
  const editorRef = useRef<Editor>(null);
  const [writeData, setWriteData] = useState<writeType>({
    status:'',
    title:'',
    content:''
  })
  const [btnStatus , setBtnState] = useState(true);
  const changeHandle = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {name ,value} = e.target;
    setWriteData({
        ...writeData,
        [name]:value
    })
  }

  const changeEditHandler = () => {
    const editorValue = editorRef.current?.getInstance().getHTML();
    setWriteData({
        ...writeData,
        content:editorValue
    })
    setBtnState(false); 
  }

  const cancelHandle = () => {
    navigate('/project');
  }

  useEffect(()=>{
    writeData.status && writeData.title && writeData.content ? setBtnState(false) : setBtnState(true)
  },[writeData])
    const submitHandle = (e:React.FormEvent) => {
        e.preventDefault();
        if(writeData.title && writeData.content && writeData.status){
            mutation.mutate({
                ...writeData,
                writeDate:serverTimestamp()
            });
          }
          navigate('/project');
    }
  return (
    <form className="write container">
      <div className="write__btns-box">
        <input type='button' className={btnStatus ? '' : 'write__add-btn btn'} onClick={submitHandle} disabled={btnStatus} value='등록' />
        <button onClick={cancelHandle} className="write__cancel-btn btn">취소</button>
      </div>
      <div className="write__radios-box">
        <div className="write__radio-box">
            <input type='radio' id='expected' defaultValue={'expected'} name='status' onChange={changeHandle}  />
            <label htmlFor='expected'>예정</label>
        </div>
        <div className="write__radio-box">
            <input type='radio' id='progress' defaultValue={'proceeding'} name='status' onChange={changeHandle} />
            <label htmlFor='progress'>진행중</label>
        </div>
        <div className="write__radio-box">
            <input type='radio' id='complete' defaultValue={'complete'} name='status' onChange={changeHandle} />
            <label htmlFor='complete'>완료</label>
        </div>
        </div>
        <input className="write__input-title" name='title' placeholder="제목을 입력해주세요" value={writeData.title} onChange={changeHandle} />
        <Editor
          className='write__editor'
          ref={editorRef}
          initialValue={' '}
          previewStyle={window.innerWidth > 1000 ? 'vertical' : 'tab'}
          height={"75vh"}
          initialEditType="markdown"
          useCommandShortcut={false}
          hideModeSwitch = {true}
          plugins={[colorSyntax]}
          language="ko-KR"
          onChange={changeEditHandler}
          toolbarItems={[
            // 툴바 옵션 설정
            ['heading', 'bold', 'italic', 'strike'],
            ['hr', 'quote'],
            ['ul', 'ol', 'task', 'indent', 'outdent'],
            ['table', 'link'],
            ['code', 'codeblock']
          ]}
          />
    </form>
  )
}

export default ProjectWirte