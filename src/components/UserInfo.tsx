import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { User } from "@firebase/auth";
import { storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { updateProfile } from "firebase/auth"

const UserInfo:React.FC<Props> = ({handlerLogout, user}) => {
  const [isLogout, setIsLogout] = useState(true) // Logout 모드(true) 또는 사진 추가 모드(false)가 가능합니다.
  const [userPhotoURL, setUserPhotoURL] = useState(user?.photoURL)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const reader = new FileReader()
  let isPending = false

  const handlerConfirmImage = async () => {
    if(!isPending){
      if(fileInputRef?.current){
        const file = fileInputRef.current.files![0]
        const filename = user.uid + Date.now()
        const imageRef = ref(storage, `userImage/${filename}`)
        try {
          isPending = true
          const snapshot = await uploadBytes(imageRef, file);
          const url = await getDownloadURL(snapshot.ref);
          setUserPhotoURL(url)
          await updateProfile  (user, {
            photoURL: url
          })
          alert('등록 성공했습니다')
        } catch (error) {
          console.error("Error uploading image:", error);
          // 이미지 업로드 실패 처리
        } finally{
          isPending = false
          setIsLogout(true)
        }
      }  
    }
  }

  const handleEditImage = () => {
    if(fileInputRef?.current){
      fileInputRef.current.click()
      setIsLogout(false)
    }
  }

  // 파일을 받을 경우
  const handleFileChange = () => {
    let file = null
    if(fileInputRef?.current){
      // 미리보기로 img src를 변경해줌
      file = fileInputRef.current.files![0]
      reader.onload = (e) => {
        const base64DataUrl = e.target!.result as string
        setUserPhotoURL(base64DataUrl)
      }
      if(file){
        reader.readAsDataURL(file) 
      }else{
        setIsLogout(true)
      }
    }
  }

  return (
    <Container>
      <div className="userInfo__img-container">
        <img className="userInfo__user-img" src={userPhotoURL!} alt="유저 이미지" />
        <div className="userInfo__img-edit" onClick={handleEditImage}>
          
          <img src="svg/icon-edit.svg" alt="수정버튼" />
        </div>
        <FileInput
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          />
      </div>
      
      <h1>{user.displayName+'님'}</h1>
      <h2>{user.email}</h2>
      
      <StyledButton onClick={isLogout? handlerLogout : handlerConfirmImage}> 
        <h3>{isLogout?`로그아웃` : `사진저장`}</h3>
      </StyledButton>
    </Container>
  )
}

interface Props {
  handlerLogout: () => void
  user: User
}

const FileInput = styled.input`
  display: none;
`;

const Container = styled.section`
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 300px;
  height: 330px;
  border-radius: 1rem;
  background-color: #f5f5f5;
  box-sizing: border-box;
  padding: 35px 0;
  gap: 20px;
  .userInfo__img-container{
    position:relative;
  }
  .userInfo__user-img{
    border-radius: 50%;
    height: 100px;
    width: 100px;
    box-sizing: border-box;
    object-fit: cover;
  }
  .userInfo__img-edit{
    position: absolute;
    border-radius: 50%;
    background-color: white;
    padding: 5px;
    bottom:0;
    right: 0;
    cursor: pointer;
  }
  h1{
    margin: 0;
    font-size: 24px;
    font-weight: normal;
  }
  h2{
    font-size: 14px;
    margin: 0;
    margin-bottom: 16px;
    font-weight: 300;
  }
  h3{
    margin :0;  
  }
`
const StyledButton = styled.button`
  color: #ffffff;
  border: 0.8px solid var(--main-color);
  border-radius: 5px;
  width: 100px;
  height: 35px;
  background-color: var(--main-color);
  cursor: pointer;
  p {
    margin: 0 auto;
  }
`;


export default UserInfo