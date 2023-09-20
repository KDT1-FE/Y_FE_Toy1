import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useSetRecoilState } from "recoil"

import { doc, getDoc } from "firebase/firestore"
import { auth, db } from "../../firebaseSDK"
import { ButtonBox, LoginBtn, LoginInput, LoginInputBox, LoginLayout, LoginTitle, P, SignUpBtn, SignUpText, StyledLink } from "../../styled/LoginPage/Login"
import userState from "../../recoil/atoms/userState"
import loginState from "../../recoil/atoms/loginState"
import sleep from "../../utils/sleep"

function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isFalse, setIsFalse] = useState(false)

  const setUserState = useSetRecoilState(userState)
  const setLoginState = useSetRecoilState(loginState)

  const handleButtonClick = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in 
        const { user } = userCredential;
        const userId = userCredential.user.uid
        const docRef = doc(db, "user", userId);
        const docSnap = (await getDoc(docRef));
        const userCopy = JSON.parse(JSON.stringify(user));
        await setUserState({
          userCredential: userCopy,
          userData: docSnap.data()
        })
        await setLoginState(true)
        navigate("/")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // eslint-disable-next-line no-console
        console.log(errorCode, errorMessage)
        setIsFalse(true)
        sleep(700).then(() => setIsFalse(false))
      });
  }

  const handleLoginKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleButtonClick()
  }

  return (
    <LoginLayout onKeyUp={handleLoginKeyUp}>
      <LoginTitle>
        WIKINITY
      </LoginTitle>
      <LoginInputBox>
        <P>이메일</P>
        <LoginInput $isFalse={isFalse} type="text" value={email} placeholder="이메일을 입력하세요" onChange={(e) => setEmail(e.target.value)} />
      </LoginInputBox>
      <LoginInputBox>
        <P>비밀번호</P>
        <LoginInput $isFalse={isFalse} type="password" value={password} placeholder="비밀번호를 입력하세요" onChange={(e) => setPassword(e.target.value)} />
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