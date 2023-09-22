import React, { ChangeEvent, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import { auth, db } from '../../firebaseSDK'
import { CreateAccountApproveBox, CreateAccountApproveCheck, CreateAccountBtn, CreateAccountInput, CreateAccountInputTitle, CreateAccountLayout, CreateAccountSelect, CreateAccountSelectBox, CreateAccountTitle } from '../../styled/LoginPage/CreateAccount'
import sleep from '../../utils/sleep';

function CreateAccount() {
  const navigate = useNavigate()

  const [isNameCorrect, setIsNameCorrect] = useState(false)
  const [nameFalse, setNameFalse] = useState(false)

  const [isFormCorrect, setIsFormCorrect] = useState(false)

  const [isEmailCorrect, setIsEmailCorrect] = useState(false)
  const [emailFalse, setEmailFalse] = useState(false)

  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false)
  const [passwordFalse, setPasswordFalse] = useState(false)

  const [isPasswordDoubleCorrect, setIsPasswordDoubleCorrect] = useState(false)
  const [passwordDoubleFalse, setPasswordDoubleFalse] = useState(false)

  const [isPhoneCorrect, setIsPhoneCorrect] = useState(false)
  const [phoneFalse, setPhoneFalse] = useState(false)

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    profile: "",
    position: "이사",
    approve: false
  })

  useEffect(() => {
    if (isNameCorrect && isEmailCorrect && isPasswordCorrect && isPasswordDoubleCorrect && isPhoneCorrect && form.approve) { setIsFormCorrect(true) } else { setIsFormCorrect(false) }
  }, [isNameCorrect, isEmailCorrect, isPasswordCorrect, isPasswordDoubleCorrect, isPhoneCorrect, form.approve])

  const handleFormChange = (event: ChangeEvent<HTMLInputElement> & ChangeEvent<HTMLSelectElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.checked
    })
  }

  const handleButtonClick = async () => {
    if (!isFormCorrect) {
      alert("정보를 입력해 주세요")
      return
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password)
      const userId = userCredential.user.uid
      await setDoc(doc(db, 'user', userId), {
        name: form.name,
        email: form.email,
        phone: form.phone,
        position: form.position,
        profile: ""
      });
      navigate('/login')
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }

  const handleCheckName = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      alert("이름을 입력해 주세요.")
      setIsNameCorrect(false)
      setNameFalse(true)
      sleep(1000).then(() => setNameFalse(false))
    } else {
      setIsNameCorrect(true)
    }
  }

  const handleCheckEmail = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!e.target.value.includes('@')) {
      alert("올바른 이메일 양식이 아닙니다.")
      setIsEmailCorrect(false)
      setEmailFalse(true)
      sleep(1000).then(() => setEmailFalse(false))
    } else {
      setIsEmailCorrect(true)
    }
  }

  const handleCheckPassword = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value.length < 6) {
      alert("비밀번호는 6자 이상이여야 합니다.")
      setIsPasswordCorrect(false)
      setPasswordFalse(true)
      sleep(1000).then(() => setPasswordFalse(false))
    } else {
      setIsPasswordCorrect(true)
    }
  }

  const handleDoubleCheckPassword = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value !== form.password) {
      alert("비밀번호가 일치하지 않습니다.")
      setIsPasswordDoubleCorrect(false)
      setPasswordDoubleFalse(true)
      sleep(1000).then(() => setPasswordDoubleFalse(false))
    } else {
      setIsPasswordDoubleCorrect(true)
    }
  }

  const handleCheckPhone = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      alert('전화번호를 입력해 주세요.')
      setIsPhoneCorrect(false)
      setPhoneFalse(true)
      sleep(1000).then(() => setPhoneFalse(false))
    } else {
      setIsPhoneCorrect(true)
    }
  }

  return (
    <CreateAccountLayout>
      <CreateAccountTitle>회원가입</CreateAccountTitle>
      <div>
        <CreateAccountInputTitle>이름</CreateAccountInputTitle>
        <CreateAccountInput $isFalse={nameFalse} onBlur={handleCheckName} onChange={handleFormChange} name='name' type="text" value={form.name} />
      </div>
      <div>
        <CreateAccountInputTitle>이메일</CreateAccountInputTitle>
        <CreateAccountInput $isFalse={emailFalse} onChange={handleFormChange} onBlur={handleCheckEmail} name='email' type="text" value={form.email} />
      </div>
      <div>
        <CreateAccountInputTitle>비밀번호</CreateAccountInputTitle>
        <CreateAccountInput $isFalse={passwordFalse} onBlur={handleCheckPassword} onChange={handleFormChange} name='password' type="password" value={form.password} />
      </div>
      <div>
        <CreateAccountInputTitle>비밀번호 확인</CreateAccountInputTitle>
        <CreateAccountInput $isFalse={passwordDoubleFalse} onBlur={handleDoubleCheckPassword} name='passwordcheck' type="password" />
      </div>
      <div>
        <CreateAccountInputTitle>전화번호</CreateAccountInputTitle>
        <CreateAccountInput $isFalse={phoneFalse} onBlur={handleCheckPhone} onChange={handleFormChange} name='phone' type="number" value={form.phone} />
      </div>
      <CreateAccountSelectBox>
        <p>직급</p>
        <CreateAccountSelect onChange={handleFormChange} name="position" id="1" value={form.position}>
          <option value="이사">이사</option>
          <option value="과장">과장</option>
          <option value="사원">사원</option>
        </CreateAccountSelect>
      </CreateAccountSelectBox>
      <CreateAccountApproveBox>
        <CreateAccountApproveCheck onChange={handleCheckboxChange} type="checkbox" name='approve' checked={form.approve} />
        <span>이용약관 개인정보 수집 및 정보이용에 동의합니다.</span>
      </CreateAccountApproveBox>

      <CreateAccountBtn $isFormCorrect={isFormCorrect} onClick={handleButtonClick} type='button' >가입하기</CreateAccountBtn>

    </CreateAccountLayout>
  )
}

export default CreateAccount