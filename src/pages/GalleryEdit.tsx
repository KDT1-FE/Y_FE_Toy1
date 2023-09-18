import React, { useRef, useState, useEffect, useContext } from "react"
import styled from "styled-components"
import Editor from "../components/Editor"
import { storage, db } from "../firebase"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { collection, doc, addDoc, updateDoc, getDoc } from "firebase/firestore"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "authentication/authContext";

// 함수 인자 타입 선언
interface GalleryDetailProps {
  onEdit: boolean;
  setOnEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const GalleryEdit: React.FC<GalleryDetailProps> = ({ onEdit, setOnEdit }) => {

  // 에디터 컴포넌트에 사용될 ref
  const quillRef = useRef();

  // 현재 로그인 유저정보 가져오기
  const user = useContext(AuthContext);

  // user 컬렉션 가져오기
  const usersCollectionRef = collection(db, "gallery");

  // addDoc할 상태관리
  const [originData, setOriginData] = useState({
    category: '',
    title: '',
    desc: ''
  })

  // 이미지 상태관리
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [imageEdit, setImageEdit] = useState<File | null>(null);

  // 현재 url의 id 값
  const { id } = useParams<string>();
  const navigate = useNavigate();

  const createUser = async (e: React.FormEvent) => {
    // 새로고침방지
    e.preventDefault();

    // 글 작성한 날짜 구하기
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${today}`; // 타임스탬프 = new Date()
    const printedData = `${year}-${month}-${day}`;

    // 등록할 썸네일 변수선언
    let thumbnailUrl = null;

    // 썸네일 이미지 업로드
    if (imageUpload) {
      const imageRef = ref(storage, `image/${imageUpload.name}`);
      try {
        // 등록된 썸네일 url 구하기
        const snapshot = await uploadBytes(imageRef, imageUpload);
        const url = await getDownloadURL(snapshot.ref);
        thumbnailUrl = url;
        alert('등록 성공했습니다')
      } catch (error) {
        // 이미지 업로드 실패 처리
        console.error("Error uploading image:", error);
      }
    } 
    // 이미지 미지정시, 디폴트 이미지 삽입
    else {
        const imageRef = ref(storage, 'image/default-image.jpg'); 
      try{
        const defaultUrl = await getDownloadURL(imageRef);
        thumbnailUrl = defaultUrl;
      }
      catch(error) {
        console.error("이미지 URL을 가져오는 데 실패했습니다.", error);
      }
    }

    // fire DB에 데이터 올리기
    await addDoc(usersCollectionRef, {
       category: originData.category, 
       title: originData.title, 
       desc: originData.desc, 
       timestamp: formattedDate,
       date: printedData, 
       writer: user?.displayName,
       thumbnail: thumbnailUrl
      });

      // 리스트 경로로 이동
      navigate("/Gallery"); 
  }

  // 에디터 업로드
  const onEditorChange = (value: string) => {
    setOriginData({
      ...originData,
      desc: value
    })
  }

  const onEditorEdit = (value: string) => {
    setFormData({
      ...formData,
      desc: value
    })
  }

  // 데이터 수정
  const updateUser = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // 글 작성한 날짜 구하기
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${today}`; // new Date()
    const printedData = `${year}-${month}-${day}`;

    // 해당 문서의 참조 얻기
    const usersCollectionRef = collection(db, "gallery");
    const userRef = doc(usersCollectionRef, id);
  
    // 썸네일 url
    let editUrl= null;

    // 이미지 업로드 후 url 받아오기
    if (imageEdit) {
      const imageRef = ref(storage, `image/${imageEdit.name}`);
      try {
        const snapshot = await uploadBytes(imageRef, imageEdit);
        editUrl = await getDownloadURL(snapshot.ref);
        alert('수정 완료했습니다')
      } catch (error) {
        console.error("Error uploading image:", error);
        // 이미지 업로드 실패 처리
      }
    } else {
      editUrl = formData.thumbnail
    }

    try {
      // fire DB에 데이터 업데이트
      await updateDoc(userRef, {
        date: printedData,
        timestamp: formattedDate,
        category: formData.category,
        title: formData.title,
        desc: formData.desc,
        thumbnail: editUrl,
      });
      alert('수정 완료했습니다')
      setOnEdit(false);
      navigate(-1)
    } catch (error) {
      console.error("문서 업데이트 실패:", error);
    }
  }

  // 수정된 데이터 상태관리
  const [formData, setFormData] = useState({
    date: '',
    category: '',
    title: '',
    desc: '',
    thumbnail: '',
  })

  // 해당 id의 데이터 불러오기
  useEffect(() => {
    const fetchUser = async (id: string|undefined) => {
      // ... try, catch 생략
      const usersCollectionRef = collection(db, "gallery");
      const userRef = doc(usersCollectionRef, id);
      
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()){
        const {category, title, desc, thumbnail, date} = userSnap.data()
        setFormData({
          category, title, desc, thumbnail, date
        })
      }
  }
  if(onEdit){
    fetchUser(id)
    console.log('수정할 데이터 가져오기 성공')
  }
  }, [onEdit, id]);

  return (
    <FormSection>
    {onEdit ? (
      // onEdit 이 true일 경우
      <form onSubmit={updateUser}>
        <FormList>
          <select name="category" id="category" value={formData.category} onChange={(event) => setFormData({...formData, category: event.target.value})}>
            <option value="">카테고리 선택</option>
            <option value="notice">모집공고</option>
            <option value="news">패캠소식</option>
            <option value="random">랜덤토크</option>
          </select>
        </FormList>
        <FormList>
          <input id="title" type="text" placeholder="제목을 입력해주세요" value={formData.title} onChange={(event) => setFormData({ ...formData, title: event.target.value})} />
        </FormList>
        <FormList>
        <Editor value={formData.desc} onChange={onEditorEdit} quillRef={quillRef} />
        </FormList>
        <FormList>
        <label htmlFor="thumbnail">썸네일 : </label>
        <input type="file" id="thumbnail" onChange={(event) => {
            const uploadedFile = event.target.files?.[0];
            if (uploadedFile) {
              setImageEdit(uploadedFile)
              console.log('이미지 업로드')
            }
        }}
        />
        </FormList>
        <GalleryBtn>
          <button type="submit">제출</button>
        </GalleryBtn>
      </form>
    ) : (
      // onEdit 이 false일 경우
      <form action="" onSubmit={createUser}>
      <FormList>
        <select name="category" id="category" onChange={(event) => setOriginData({...originData, category: event.target.value})}>
          <option value="">카테고리 선택</option>
          <option value="notice">모집공고</option>
          <option value="news">패캠소식</option>
          <option value="random">랜덤토크</option>
        </select>
      </FormList>
      <FormList>
        <input id="title" type="text" placeholder="제목을 입력해주세요" onChange={(event) => setOriginData({...originData, title: event.target.value})} />
      </FormList>
      <FormList>
      <Editor value={originData.desc} onChange={onEditorChange} quillRef={quillRef} />
      </FormList>
      <FormList>
      <label htmlFor="thumbnail">썸네일 : </label>
      <input type="file" id="thumbnail" onChange={(event) => {
          const uploadedFile = event.target.files?.[0];
          if (uploadedFile) {
            setImageUpload(uploadedFile);
          }
      }} />
      </FormList>
        <GalleryBtn>
          <button type="submit">제출</button>
        </GalleryBtn>
      </form>
    )}
    </FormSection>
  )
}

// 스타일
const FormSection = styled.div`
  margin: 30px;
  margin-top:40px;
`

const FormList = styled.div`
  padding: 10px 0;
  input[type="text"]{
    width:100%;
    border: 1px solid #ccc;
    height:30px;
  }

`

const GalleryBtn = styled.div`
margin-top: 20px;
text-align:center;
  button{
    background-color: var(--main-color);
    width: 95px;
    height: 35px;
    color: white;
    border-radius: 4px;
    border: none;
    outline: none;
    cursor: pointer;
  }
`

export default GalleryEdit
