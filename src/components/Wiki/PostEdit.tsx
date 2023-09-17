import * as React from 'react';
import { BoardNav } from './BoardNav';
import {useState} from 'react'
import {  readPostData, updatePostData } from 'data/wikiboard';
import { useNavigate, useParams } from 'react-router-dom';

type Post = {
    title:string|undefined,
    content:string|undefined,
    time:string,
    name:string,
    id:any,
}
export function PostEdit (props: any) {

    
    const {boardState,id} = useParams()
    
    const readPrevData = async ()=>{
        const postData = await readPostData(boardState,id)
        setTitle(postData?.data()?.title)
        setContent(postData?.data()?.content)
        return postData?.data()
        
        
    }
    
    React.useEffect(()=>{
        checkPermission()
        readPrevData()
    },[])
    const navigate = useNavigate()
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    

    const handleChangeTitle = (event:any)=>{
        setTitle(event.target.value)
    }
    const handleChangeContent = (event:any)=>{
        setContent(event.target.value)
    }
    const updateNewPostData = async ()=>{
        const postData = await readPostData(boardState,id)
        let newPostData;
        try {
            const postData = await readPostData(boardState,id)
            
            if (postData){
                newPostData = {
                    title,
                    content,
                    time:postData.data()?.time,
                    name:postData.data()?.name,
                    id: postData.data()?.id,
                }
                
            }
        }
        catch (error){
            console.error('error')
        }
        return newPostData;
    }

    const handleSubmit = async (event:any)=>{
        event.preventDefault();
        const newPostData = await updateNewPostData()
        
        await updatePostData(boardState,id,newPostData);
        navigate('/wiki')
    }

    const checkPermission = async ()=>{
        const prevData = await readPrevData()
        if (prevData?.uid !== sessionStorage.user){
            navigate('404')
        }
    }
    
    
  return (
    <div>
      <BoardNav />
      <h1>게시글 수정하기</h1>
      <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="">제목 : </label>
            <input type="text" onChange={handleChangeTitle} value={title} />
        </div>
        <div>
            <label htmlFor="">본문 : </label>
            <input type="text" onChange={handleChangeContent} value={content}/>
        </div>
        <button type='submit'>작성하기</button>
      </form>
    </div>
  );
}
