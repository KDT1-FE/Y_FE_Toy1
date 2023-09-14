import React, { useState } from 'react'
import styled from 'styled-components'
import { User } from "@firebase/auth";

const UserInfo:React.FC<Props> = ({handlerLogout, user}) => {
  const [isLogout, setIsLogout] = useState(true) // Logout 모드(true) 또는 사진 추가 모드(false)가 가능합니다.
  const userPhotoURL = user?.photoURL

  const handlerConfirmImage = () => {
  
    setIsLogout(true)
  }

  return (
    <Container>
      <img className="userInfo__user-img" src={userPhotoURL!} alt="유저 이미지" />
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
  .userInfo__user-img{
    border-radius: 50%;
    height: 100px;
    width: 100px;
    box-sizing: border-box;
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