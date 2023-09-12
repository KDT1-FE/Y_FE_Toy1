import { AuthContext } from 'authentication/authContext';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [nickname, setNickname] = useState("");
  const user = useContext(AuthContext)
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setEmail(e.target.value)
  }

  const handlePwd = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setPwd(e.target.value)
  }

  const handleNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setNickname(e.target.value)
  }

  const handleClickCreate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try{
      const userCredential = await createUserWithEmailAndPassword(auth, email, pwd)
      if(userCredential){
        console.log(userCredential)
        await updateProfile(userCredential.user, {
          displayName: nickname
        })
      }
      signOut(auth)
      alert('회원가입이 완료됐습니다.')
      // 로그인 페이지로 이동
      
    }catch(e){
      alert(e)
    }
  }


  return (
    <Container>
      <h1>회원 가입</h1>
      <form>
        <input type="email" name="email" onChange={handleEmail} value={email} />
        <input type="password" name="pwd" onChange={handlePwd} value={pwd} />
        <input type="text" name="nickname" onChange={handleNickname} value={nickname} />
        <button type="button" onClick={handleClickCreate}>
          회원가입
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

export default SignUp