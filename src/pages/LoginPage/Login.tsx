import React, { useState } from "react"
import { Link } from "react-router-dom"
import { ButtonBox, LoginLayout, LoginRoot } from "../../styled/Login"

function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <LoginRoot>
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
          <button type="button">SIGN UP</button>
          <button type="button"><Link to="/signup">LOGIN</Link></button>
        </ButtonBox>
      </LoginLayout>
    </LoginRoot>
  )
}

export default Login