import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { auth } from '../firebase'
import { AuthContext } from 'authentication/authContext';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const user = useContext(AuthContext);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, pwd)
      .then(() => {
        alert("로그인 성공");

        console.log(user)
        // 메인 홈으로 이동
      })
      .catch(e => {
        alert(e);
      });
  };

  return (
    <Container>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" onChange={handleEmail} value={email} />
        <input type="password" name="pwd" onChange={handlePwd} value={pwd} />
        <button type="submit"> 로그인 </button>
  
      </form>
      <Link to={`/signup`}> 회원가입 </Link>
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

export default Login