import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { GithubAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { useSetRecoilState } from "recoil"

import { auth } from "../../firebaseSDK"
import { ButtonBox, LoginBtn, LoginInput, LoginLayout, LoginTitle, P, SignUpBtn, StyledLink } from "../../styled/LoginPage/Login"
import userState from "../../recoil/atoms/userState"

function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const setUserState = useSetRecoilState(userState)

  const handleButtonClick = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in 
        const { user } = userCredential;
        await setUserState({
          isLogin: true,
          userInfo: user
        })
        navigate("/")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // eslint-disable-next-line no-console
        console.log(errorCode, errorMessage)
      });
  }

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

        await setUserState({
          isLogin: true,
          userInfo: {}
        })

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
    <LoginLayout>
      <LoginTitle>
        WIKINITY
      </LoginTitle>
      <div>
        <P>이메일</P>
        <LoginInput type="text" value={email} placeholder="이메일을 입력하세요" onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <P>비밀번호</P>
        <LoginInput type="text" value={password} placeholder="비밀번호를 입력하세요" onChange={(e) => setPassword(e.target.value)} />
      </div>
      <ButtonBox>
        <SignUpBtn type="button"><StyledLink to="/signup">SIGN UP</StyledLink></SignUpBtn>
        <LoginBtn onClick={handleButtonClick} type="button">LOGIN</LoginBtn>
        <LoginBtn onClick={handleClickGithub} type="button">GITHUB</LoginBtn>
      </ButtonBox>
    </LoginLayout>
  )
}

export default Login