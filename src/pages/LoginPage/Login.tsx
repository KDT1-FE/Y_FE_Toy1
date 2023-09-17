import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useSetRecoilState } from "recoil"

import { doc, getDoc } from "firebase/firestore"
import { auth, db } from "../../firebaseSDK"
import { ButtonBox, LoginBtn, LoginInput, LoginInputBox, LoginLayout, LoginTitle, P, SignUpBtn, SignUpText, StyledLink } from "../../styled/LoginPage/Login"
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
        const userId = userCredential.user.uid
        const docRef = doc(db, "user", userId);
        const docSnap = (await getDoc(docRef));
        await setUserState({
          isLogin: true,
          userCredential: user,
          userData: docSnap.data()
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

  return (
    <LoginLayout>
      <LoginTitle>
        WIKINITY
      </LoginTitle>
      <LoginInputBox>
        <P>이메일</P>
        <LoginInput type="text" value={email} placeholder="이메일을 입력하세요" onChange={(e) => setEmail(e.target.value)} />
      </LoginInputBox>
      <LoginInputBox>
        <P>비밀번호</P>
        <LoginInput type="text" value={password} placeholder="비밀번호를 입력하세요" onChange={(e) => setPassword(e.target.value)} />
      </LoginInputBox>
      <ButtonBox>
        <SignUpBtn type="button">
          <SignUpText>신입사원이신가요?</SignUpText>
          <StyledLink to="/signup">SIGN UP</StyledLink>
        </SignUpBtn>
        <LoginBtn onClick={handleButtonClick} type="button">LOGIN</LoginBtn>
      </ButtonBox>
    </LoginLayout>
  )
}

export default Login