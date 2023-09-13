import Sidebar from 'components/Sidebar'
import React, { useRef, useState } from "react"
import styled from "styled-components"
import Editor from "../components/Editor"
import { storage, db } from "../firebase"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { collection, addDoc } from "firebase/firestore"
import { v4 } from "uuid" 
import { useNavigate } from "react-router-dom"

const FormList = styled.div`
  padding: 10px 0;
  input[type="text"]{
    width:100%;
    border: 1px solid #ddd;
    height:30px;
  }

`
const GalleryBtn = styled.button`
  border: 0;
  display:block;
  margin: 0 auto;
  margin-top: 20px;
  background-color: #ED234B;
  color:white;
  padding: 10px 20px;
  border-radius:10px;
`

const GalleryEdit = () => {

  // 에디터 컴포넌트에 사용될 ref
  const quillRef = useRef();

  // user 컬렉션 가져오기
  const usersCollectionRef = collection(db, "user");

  const [newCategory, setNewCategory] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [desc, setDesc] = useState('');
  // 추후에 로그인한 회원의 닉네임 들어갈 것
  // const [newWriter, setNewWriter] = useState("나글쓴이");
  const [imageUpload, setImageUpload] = useState<File | null>(null);

  const navigate = useNavigate();

  const createUser = async (e: React.FormEvent) => {
    // 새로고침방지
    e.preventDefault();

    // 글 작성한 날짜 구하기
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    // 등록할 썸네일 변수선언
    let thumbnailUrl = null;

    // 썸네일 이미지 업로드
    if (imageUpload) {
      const imageRef = ref(storage, `image/${imageUpload.name + v4()}`);
      try {
        // 등록된 썸네일 url 구하기
        const snapshot = await uploadBytes(imageRef, imageUpload);
        const url = await getDownloadURL(snapshot.ref);
        thumbnailUrl = url;
        alert('이미지 업데이트되었습니다')
      } catch (error) {
        console.error("Error uploading image:", error);
        // 이미지 업로드 실패 처리
      }
    }

    // fire DB에 데이터 올리기
    await addDoc(usersCollectionRef, {
       category: newCategory, 
       title: newTitle, 
       desc: desc, 
       date: formattedDate, 
       writer: "글쓴이",
       thumbnail: thumbnailUrl
      });


      navigate("/"); // "/" 경로로 이동

  }

  // 에디터 업로드
  const onEditorChange = (value: string) => {
    setDesc(value)
  }

  return (
    <>
      <form action="" onSubmit={createUser}>
        <FormList>
          <select name="category" id="category" onChange={(event) => setNewCategory(event.target.value)}>
            <option value="">카테고리 선택</option>
            <option value="notice">모집공고</option>
            <option value="news">패캠소식</option>
            <option value="random">랜덤토크</option>
          </select>
        </FormList>
        <FormList>
          <input id="title" type="text" placeholder="제목을 입력해주세요" onChange={(event) => setNewTitle(event.target.value)} />
        </FormList>
        <FormList>
        <Editor value={desc} onChange={onEditorChange} quillRef={quillRef} />
        </FormList>
        <FormList>
        <input type="file" id="thumbnail" onChange={(event) => {
            const uploadedFile = event.target.files?.[0];
            if (uploadedFile) {
              setImageUpload(uploadedFile);
            }
        }} />
        </FormList>
        <GalleryBtn type="submit">제출</GalleryBtn>
      </form>
    </>
  )
}

export default GalleryEdit
