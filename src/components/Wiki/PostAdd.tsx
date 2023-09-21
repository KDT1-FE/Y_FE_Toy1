import * as React from 'react';
import { BoardNav } from './BoardNav';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { addNewPostDB, readLastPostId } from 'data/wikiboard';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import './PostAdd.scss';
import MdEditor from '@uiw/react-md-editor';

type Post = {
  title: string | undefined;
  content: string | undefined;
  time: string;
  name: string;
  id: any;
};
export function PostAdd(props: any) {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const boardState = useSelector((state: any) => state.boardState.value);

  const handleChangeTitle = (event: any) => {
    setTitle(event.target.value);
  };
  const handleChangeContent = (event: any) => {
    setContent(event.target.value);
  };
  const AddnewPostData = async () => {
    const now = moment();
    const formattedDate = now.format('YY-MM-DD HH:mm');
    let newPostData;
    try {
      const lastPostId = await readLastPostId(boardState);
      if (lastPostId) {
        newPostData = {
          title,
          content: markdown,
          time: formattedDate,
          name: sessionStorage.nickname,
          id: lastPostId.data()?.LASTPOSTID + 1,
          uid: sessionStorage.uid,
          comment: [],
        };
      }
    } catch (error) {
      console.error('error');
    }
    return newPostData;
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const newPostData = await AddnewPostData();
    await addNewPostDB(boardState, newPostData);
    navigate('/wiki');
  };
  const [markdown, setMarkdown] = useState('');

  const handleChange = (value: any) => {
    setMarkdown(value);
  };

  React.useEffect(()=>{
    if (sessionStorage.uid){
        return
    }
    else {
        navigate('error')
    }
  })

  return (
    <div className="post__page--add">
      <BoardNav />

      <form onSubmit={handleSubmit} id="form">
        <div className="mb-3" >
          <label htmlFor="exampleFormControlInput1" className="form-label">
            제목
          </label>
          <input
            type="text"
            onChange={handleChangeTitle}
            value={title}
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="제목을 입력하세요"
          />
        </div>
        <div>
          <MdEditor
            data-color-mode="light"
            value={markdown}
            onChange={handleChange}
            height={500}
          />
        </div>
        <button type="submit" className='btn btn-primary'>수정하기</button>
      </form>
    </div>
  );
}
