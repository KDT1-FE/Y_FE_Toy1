import React, { ChangeEvent, useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import { auth, db } from '../../firebaseSDK'
import CreateAccountLayout from '../../styled/LoginPage/CreateAccount'

function CreateAccount() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    position: "이사",
    approve: false
  })

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
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password)
      const userId = userCredential.user.uid
      await setDoc(doc(db, 'user', userId), {
        name: form.name,
        email: form.email,
        phone: form.phone,
        position: form.position
      });
      navigate('/login')
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }

  return (
    <CreateAccountLayout>
      <h2>회원가입</h2>
      <div>
        <p>이름</p>
        <input onChange={handleFormChange} name='name' type="text" value={form.name} />
      </div>
      <div>
        <p>이메일</p>
        <input onChange={handleFormChange} name='email' type="text" value={form.email} />
      </div>
      <div>
        <p>비밀번호</p>
        <input onChange={handleFormChange} name='password' type="text" value={form.password} />
      </div>
      <div>
        <p>전화번호</p>
        <input onChange={handleFormChange} name='phone' type="text" value={form.phone} />
      </div>
      <div>
        <p>직급</p>
        <select onChange={handleFormChange} name="position" id="1" value={form.position}>
          <option value="이사">이사</option>
          <option value="과장">과장</option>
          <option value="사원">사원</option>
        </select>
      </div>
      <div>
        <input onChange={handleCheckboxChange} type="checkbox" name='approve' checked={form.approve} />
        <span>이용약관 개인정보 수집 및 정보이용에 동의합니다.</span>
      </div>
      <button onClick={handleButtonClick} type='button' >가입하기</button>
    </CreateAccountLayout>
  )
}

export default CreateAccount