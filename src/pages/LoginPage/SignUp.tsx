import React from "react";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div>
      <h2>WIKINITY에 오신 것을 환영합니다.</h2>
      <div>Github(으)로 계속하기</div>
      <div>또는</div>
      <div>WIKINITY 아이디 만들기</div>
      <div>
        <span>이미 계정이 있으신가요?</span>
        <Link to="/login">로그인</Link>
      </div>
    </div>
  )
}

export default SignUp