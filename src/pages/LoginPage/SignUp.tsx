import React from "react";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import {
  DivideBox, DivideLine, DivideSpan, SignUpBox, SignUpBtnBox,
  SignUpLayout, SignUpTitle, SignUpTitleETC, TitleBox, ToLoginLink, ToCreateLink, GitHubSignUpBoxSpan
} from "../../styled/LoginPage/SignUp";
import { auth } from "../../firebaseSDK";

function SignUp() {

  const navigate = useNavigate()

  const handleClickGithub = () => {
    const provider = new GithubAuthProvider();

    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = await GithubAuthProvider.credentialFromResult(result);
        console.log(credential)
        // The signed-in user info.
        // DB에서 uid를 이용해 데이터 조회하기
        // const { user } = result;
        // const userId = user.uid

        navigate("/")
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
        // The email of the user's account used.
        // const email = error.customData.email;
        // The AuthCredential type that was used.
        // const credential = GithubAuthProvider.credentialFromError(error);
        // ...
      });
  }

  return (
    <SignUpLayout>
      <TitleBox>
        <SignUpTitle>WIKINITY <SignUpTitleETC>에 오신 것을 환영합니다.</SignUpTitleETC></SignUpTitle>
      </TitleBox>
      <SignUpBtnBox>
        <SignUpBox>
          <GitHubSignUpBoxSpan onClick={handleClickGithub}>Github(으)로 계속하기</GitHubSignUpBoxSpan>
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