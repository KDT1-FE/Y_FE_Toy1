import React, { useState } from 'react'
import styled from 'styled-components'
import { auth } from '../firebase'
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Authentication.css'

const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const navigate = useNavigate()

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handlePwd = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPwd(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, pwd)
      .then(() => {
        alert("로그인 성공");
        navigate("/")
      })
      .catch(e => {
        alert(e);
      });
  };

  return (
    <Container>
      <h1> 로그인</h1>
      <form className="authentication__form" onSubmit={handleSubmit}>
        <div className="authentication__form-el"><label htmlFor="id"> 이메일 </label> <input type="email" id="email" onChange={handleEmail} value={email} /></div>
        <div className="authentication__form-el"><label htmlFor="pwd"> 비밀번호 </label> <input type="password" id="pwd" onChange={handlePwd} value={pwd} /></div>
        
        <button className="btn" type="submit"> 로그인 </button>
      </form>
      <Link to={`/signup`}> <b>회원가입</b> </Link>
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
  display: flex;
  flex-flow: column;
  align-items: center;
  h1{
    margin-bottom:5rem;
  }
  b{
    text-decoration: underline solid black 1.5px ;
  }
`

export default Login