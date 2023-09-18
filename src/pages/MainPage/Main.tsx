import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import userState from '../../recoil/atoms/userState'
import loginState from '../../recoil/atoms/loginState'

export default function Main() {

  const navigate = useNavigate()
  const setUserState = useSetRecoilState(userState)
  const setLoginState = useSetRecoilState(loginState)

  const handleLogout = async () => {
    await setUserState({
      isLogin: false,
      userInfo: {}
    })
    await setLoginState(false)
    navigate("/login")
  }

  return (
    <div>
      <button type="button" onClick={handleLogout}>로그아웃</button>
    </div>
  )
}
