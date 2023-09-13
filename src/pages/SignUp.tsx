import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import React, { useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import './Authentication.css'

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate()

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

  const handleClickCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      const userCredential = await createUserWithEmailAndPassword(auth, email, pwd)
      if(userCredential){
        await updateProfile(userCredential.user, {
          displayName: nickname
        })
      }
      signOut(auth)
      alert('회원가입이 완료됐습니다.')
      navigate("/login")
    }catch(e){
      alert(e)
    }
  }

  return (
    <Container>
      <h1> 회원 가입</h1>
      <form className="authentication__form" onSubmit={handleClickCreate}>
        <div className="authentication__form-el"><label htmlFor="id"> 이메일 </label> <input type="email" id="email" onChange={handleEmail} value={email} /></div>
        <div className="authentication__form-el"><label htmlFor="pwd"> 비밀번호 </label> <input type="password" id="pwd" onChange={handlePwd} value={pwd} /></div>
        <div className="authentication__form-el"><label htmlFor="nickname"> 닉네임 </label> <input type="text" id="nickname" onChange={handleNickname} value={nickname} /></div>
        <button className="btn" type="submit"> 회원 가입 </button>
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
  border: 1.5px solid var(--main-color);
  border-radius: 0.8rem;
  padding : 20px 5px;
  box-sizing: border-box;
  display: flex;
  flex-flow: column;
  align-items: center;
  h1{
    margin-bottom:5rem;
  }
`
export default SignUp