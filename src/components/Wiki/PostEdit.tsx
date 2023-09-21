import React, { useState, useEffect } from 'react';
import { BoardNav } from './BoardNav';
import { readPostData, updatePostData } from 'data/wikiboard';
import { useNavigate, useParams } from 'react-router-dom';
import MdEditor from '@uiw/react-md-editor';

export function PostEdit(props: any) {
  const { boardState, id } = useParams();

  const readPrevData = async () => {
    const postData = await readPostData(boardState, id);
    setTitle(postData?.data()?.title);
    setContent(postData?.data()?.content);
    return postData?.data();
  };

  useEffect(() => {
    checkPermission();
    readPrevData();
  }, []);
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleChangeTitle = (event: any) => {
    setTitle(event.target.value);
  };
  const handleChangeContent = (event: any) => {
    setContent(event.target.value);
  };
  const updateNewPostData = async () => {
    const postData = await readPostData(boardState, id);
    let newPostData;
    try {
      const postData = await readPostData(boardState, id);

      if (postData) {
        newPostData = {
          title,
          content,
          time: postData.data()?.time,
          name: postData.data()?.name,
          id: postData.data()?.id,
        };
      }
    } catch (error) {
      console.error(error);
    }
    return newPostData;
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const newPostData = await updateNewPostData();

    await updatePostData(boardState, id, newPostData);
    navigate('/wiki');
  };

  const checkPermission = async () => {
    const prevData = await readPrevData();
    if (prevData?.uid !== sessionStorage.uid) {
      navigate('404');
    }
  };

  const [markdown, setMarkdown] = useState('');
  const handleChange = (value: any) => {
    setContent(value);
  };

  return (
    <div>
      <BoardNav />
      <form onSubmit={handleSubmit} id="form">
        <div className="mb-3">
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
        <MdEditor
          data-color-mode="light"
          value={content}
          onChange={handleChange}
          height={500}
        />
        <button type="submit" className="btn btn-primary">
          작성하기
        </button>
      </form>
    </div>
  );
}
