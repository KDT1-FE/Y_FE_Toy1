import React, { useState } from 'react'
import { useRecoilValue } from 'recoil';

import { DuoButtonBox, CloseImg, ProfileInfoBox, ProfileModalCloseBtn, ProfileModalHeader, ProfileModalHeaderText, ProfileModalLayout, SingleButtonBox } from '../../styled/MainPage/ProfileModal'
import ClostButton from "../../assets/img/CloseButton.svg"
import userState from '../../recoil/atoms/userState';

interface ProfileProp {
  setShowProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProfileModal({ setShowProfile }: ProfileProp) {

  const user = useRecoilValue(userState);

  const [showEdit, setShowEdit] = useState(false)

  const handleProfileEdit = () => {
    console.log(user)
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
        <div>
          {user.userData.position}
        </div>
      </ProfileInfoBox>
      <ProfileInfoBox>
        <div>
          {user.userData.email}
        </div>
      </ProfileInfoBox>
      <ProfileInfoBox>
        <div>
          {user.userData.phone}
        </div>
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
            <button onClick={() => setShowEdit(true)}>
              수정
            </button>
          </SingleButtonBox>
      }
    </ProfileModalLayout>
  )
}
