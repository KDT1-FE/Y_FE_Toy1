import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useSetRecoilState } from "recoil"

import { auth } from "../../firebaseSDK"
import { ButtonBox, LoginLayout } from "../../styled/LoginPage/Login"
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

  return (
    <LoginLayout>
      <h1>
        WIKINITY
      </h1>
      <div>
        <p>이메일</p>
        <input type="text" value={email} placeholder="이메일을 입력하세요" onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <p>비밀번호</p>
        <input type="text" value={password} placeholder="비밀번호를 입력하세요" onChange={(e) => setPassword(e.target.value)} />
      </div>
      <ButtonBox>
        <button type="button"><Link to="/signup">SIGN UP</Link></button>
        <button onClick={handleButtonClick} type="button">LOGIN</button>
      </ButtonBox>
    </LoginLayout>
  )
}

export default Login