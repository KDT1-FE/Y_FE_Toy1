import React from "react";
import {
  DivideBox, DivideLine, DivideSpan, SignUpBox, GitHubSignUpBoxSpan, SignUpBtnBox,
  SignUpLayout, SignUpTitle, SignUpTitleETC, TitleBox, ToLoginLink, ToCreateLink
} from "../../styled/LoginPage/SignUp";

function SignUp() {
  return (
    <SignUpLayout>
      <TitleBox>
        <SignUpTitle>WIKINITY <SignUpTitleETC>에 오신 것을 환영합니다.</SignUpTitleETC></SignUpTitle>
      </TitleBox>
      <SignUpBtnBox>
        <SignUpBox>
          <GitHubSignUpBoxSpan>Github(으)로 계속하기</GitHubSignUpBoxSpan>
        </SignUpBox>
        <DivideBox>
          <DivideLine />
          <DivideSpan>또는</DivideSpan>
          <DivideLine />
        </DivideBox>
        <SignUpBox>
          <ToCreateLink to="/createaccount">WIKINITY 아이디 만들기</ToCreateLink>
        </SignUpBox>
      </SignUpBtnBox>
      <div>
        <span>이미 계정이 있으신가요?</span>
        <ToLoginLink to="/login">로그인</ToLoginLink>
      </div>
    </SignUpLayout>
  )
}

export default SignUp