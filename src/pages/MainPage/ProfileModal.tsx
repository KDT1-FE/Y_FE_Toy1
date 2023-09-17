import React, { useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { doc, updateDoc } from 'firebase/firestore';
import { DuoButtonBox, CloseImg, ProfileInfoBox, ProfileModalCloseBtn, ProfileModalHeader, ProfileModalHeaderText, ProfileModalLayout, SingleButtonBox } from '../../styled/MainPage/ProfileModal'
import ClostButton from "../../assets/img/CloseButton.svg"
import userState from '../../recoil/atoms/userState';
import { db } from '../../firebaseSDK';

interface ProfileProp {
  setShowProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProfileModal({ setShowProfile }: ProfileProp) {

  const user = useRecoilValue(userState);
  const setUserState = useSetRecoilState(userState)

  const [showEdit, setShowEdit] = useState(false)

  const [initialValue, setInitialValue] = useState({ ...user.userData })

  const handleProfileEdit = async () => {
    const userId = user.userCredential.uid
    await updateDoc(doc(db, 'user', userId), {
      // name: form.name,
      // email: form.email,
      phone: initialValue.phone,
      position: initialValue.position
    });
    setUserState({
      ...user,
      userData: initialValue
    })
    setShowEdit(false)
  }

  return (
    <ProfileModalLayout>
      <ProfileModalHeader>
        <ProfileModalHeaderText>My Profile</ProfileModalHeaderText>
        <ProfileModalCloseBtn onClick={() => setShowProfile(false)}>
          <CloseImg src={ClostButton} alt="" />
        </ProfileModalCloseBtn>
      </ProfileModalHeader>
      <ProfileInfoBox>
        <div>
          {user.userData.name}
        </div>
        {
          showEdit ?
            <div>
              <select value={initialValue.position} onChange={(e) => setInitialValue({ ...initialValue, 'position': e.target.value })}>
                <option value="이사">이사</option>
                <option value="과장">과장</option>
                <option value="사원">사원</option>
              </select>
            </div>
            :
            <div>
              {user.userData.position}
            </div>
        }

      </ProfileInfoBox>
      <ProfileInfoBox>
        <div>
          {user.userData.email}
        </div>
      </ProfileInfoBox>
      <ProfileInfoBox>
        {
          showEdit ?
            <div>
              <input type="text" value={initialValue.phone} onChange={(e) => setInitialValue({ ...initialValue, 'phone': e.target.value })} />
            </div>
            :
            <div>
              {user.userData.phone}
            </div>
        }
      </ProfileInfoBox>

      {
        showEdit ?
          <DuoButtonBox>
            <button onClick={handleProfileEdit}>
              수정
            </button>
            <button onClick={() => setShowEdit(false)}>
              취소
            </button>
          </DuoButtonBox>
          :
          <SingleButtonBox>
            <button onClick={() => {
              setInitialValue({ ...user.userData })
              setShowEdit(true)
            }}>
              편집
            </button>
          </SingleButtonBox>
      }
    </ProfileModalLayout>
  )
}
