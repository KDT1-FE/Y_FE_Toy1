import { AuthContext } from 'authentication/authContext';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useContext, useState } from 'react'
import styled from 'styled-components'

const SignIn = () => {
  const userInfo = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [isCreate, setIsCreate] = useState(false);

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handlePwd = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPwd(e.target.value);
  };

  const handleClickCreate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsCreate(pre => !pre);
    
    createUserWithEmailAndPassword(auth, email, pwd)
      .then(() => {
        alert("회원가입 성공");
      })
      .catch(e => {
        alert(e);
      });
  
  };


  return (
    <Container>
      <h1>로그인</h1>
      <form>
        <input type="email" name="email" onChange={handleEmail} value={email} />
        <input type="password" name="pwd" onChange={handlePwd} value={pwd} />
        <button type="button" onClick={handleClickCreate}>
          "회원가입"
        </button>
      </form>
    </Container>
  )
}
const Container = styled.main`
  margin: 0 auto;
  margin-top: 60px;
  width: 90%;
  max-width: 800px;
  height: 500px;
  border: 2px solid black;
  padding : 20px 5px;
  box-sizing: border-box;
`

export default SignIn