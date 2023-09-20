import React, { useState } from "react";
import styled from "styled-components";
import { auth, db } from "../../firebase";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "style/Authentication.css";
import Swal from "sweetalert2";
import { specificErrorContent } from "../../utils/authentication";
import { SynchroClassAndAlert } from "../../utils/class";
import { FirebaseError } from "firebase/app";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const navigate = useNavigate();

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handlePwd = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPwd(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      await signInWithEmailAndPassword(auth, email, pwd)
      await SynchroClassAndAlert(auth.currentUser!)

      Swal.fire({
        icon:"success",
        title: "로그인에 성공하였습니다."
      })
      navigate(-1)

    }catch(e) {
      if(e instanceof FirebaseError){
        Swal.fire({
          icon: "error",
          title: e.code,
          text : specificErrorContent(e.code.split('/')[1]),
        })
      }
    }
  };

  return (
    <Container>
      <h1> 로그인</h1>
      <form className="authentication__form" onSubmit={handleSubmit}>
        <div className="authentication__form-el">
          <label htmlFor="id"> 이메일 </label>{" "}
          <input type="email" id="email" onChange={handleEmail} value={email} />
        </div>
        <div className="authentication__form-el">
          <label htmlFor="pwd"> 비밀번호 </label>{" "}
          <input type="password" id="pwd" onChange={handlePwd} value={pwd} />
        </div>
        <button className="btn" type="submit">
          {" "}
          로그인{" "}
        </button>
      </form>
      <Link to={`/signup`} replace={true}>
        {" "}
        <b>회원가입</b>{" "}
      </Link>
    </Container>
  );
};

const Container = styled.main`
  margin: 0 auto;
  margin-top: 60px;
  width: 90%;
  max-width: 800px;
  height: 500px;
  border: 1.5px solid var(--main-color);
  border-radius: 0.8rem;
  padding: 20px 5px;
  box-sizing: border-box;
  display: flex;
  flex-flow: column;
  align-items: center;
  h1 {
    margin-bottom: 5rem;
  }
  b {
    text-decoration: underline solid 1.5px;
    color: ${(props) => props.theme.text};
  }
`;

export default Login;

