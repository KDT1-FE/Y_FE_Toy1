/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ChangeEvent, useRef, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import {
  ButtonBox, CloseImg, ProfileInfoBox, ProfileModalCloseBtn, ProfileModalHeader, ProfileModalHeaderText,
  ProfileModalLayout, ProfileImg, ProfileInput, ProfileInputBtn, ProfileCameraImg, ProfileInfoText,
  ProfileInfoEmail, CorrectBtn, CancelBtn, PositionSelect, InputText
} from '../../../styled/MainPage/ProfileModal'
import ClostButton from "../../../assets/img/CloseButton.svg"
import userState from '../../../recoil/atoms/userState';
import { auth, db, storage } from '../../../firebaseSDK';
import DefaultProfile from '../../../assets/img/DefaultProfile.png'
import Camera from '../../../assets/img/Camera.svg'
import loginState from '../../../recoil/atoms/loginState';

interface ProfileProp {
  setActiveModalIdx: React.Dispatch<React.SetStateAction<number>>;
}

export default function ProfileModal({ setActiveModalIdx }: ProfileProp) {

  const navigate = useNavigate()

  const imgInputRef = useRef<HTMLInputElement>(null)

  const user = useRecoilValue(userState);
  const setUserState = useSetRecoilState(userState)
  const setLoginState = useSetRecoilState(loginState)

  const [showEdit, setShowEdit] = useState(false)
  const [initialValue, setInitialValue] = useState({ ...user.userData })
  const [imgState, setImgState] = useState("")
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  const handlePreviewImgChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target) setImgState(event.target.result as string)
      }
      reader.readAsDataURL(e.target.files[0])
      setUploadFile(e.target.files[0])
    }
  }

  const handleProfileEdit = async () => {

    const userId = user.userCredential.uid
    let imageUrl = ""

    // 이미지 파일 업로드
    if (uploadFile !== null) {
      const userProfileRef = ref(storage, `user/${userId}`)
      await uploadBytes(userProfileRef, uploadFile)
      imageUrl = await getDownloadURL(userProfileRef)
      initialValue.profile = imageUrl
    }

    if (imageUrl !== "") {
      await updateDoc(doc(db, 'user', userId), {
        profile: initialValue.profile,
        phone: initialValue.phone,
        position: initialValue.position
      });
    } else {
      await updateDoc(doc(db, 'user', userId), {
        phone: initialValue.phone,
        position: initialValue.position
      });
    }

    setUserState({
      ...user,
      userData: initialValue
    })
    setUploadFile(null)
    setShowEdit(false)
  }

  const handleLogout = async () => {

    signOut(auth).then(async () => {
      await setLoginState(false)
      navigate("/login")
      setUserState({
        isLogin: false,
        userInfo: {}
      })
    })
  }

  return (
    <ProfileModalLayout>
      <ProfileModalHeader>
        <ProfileModalHeaderText>My Profile</ProfileModalHeaderText>
        <ProfileModalCloseBtn onClick={() => setActiveModalIdx(-1)}>
          <CloseImg src={ClostButton} alt="" />
        </ProfileModalCloseBtn>
      </ProfileModalHeader>
      <ProfileInfoBox>
        {
          showEdit ?
            <>
              <ProfileInputBtn onClick={() => imgInputRef.current?.click()}>
                <ProfileCameraImg src={Camera} alt="" />
                <ProfileInput ref={imgInputRef} type='file' onChange={handlePreviewImgChange} />
              </ProfileInputBtn>
              <ProfileImg src={imgState === "" ? DefaultProfile : imgState} alt="" />
            </>
            :
            <ProfileImg src={user.userData.profile ? user.userData.profile : DefaultProfile} />
        }
      </ProfileInfoBox>

      <ProfileInfoBox>
        <ProfileInfoText>
          {user.userData.name}
        </ProfileInfoText>
        {
          showEdit ?
            <div>
              <PositionSelect value={initialValue.position} onChange={(e) => setInitialValue({ ...initialValue, 'position': e.target.value })}>
                <option value="이사">이사</option>
                <option value="과장">과장</option>
                <option value="사원">사원</option>
              </PositionSelect>
            </div>
            :
            <ProfileInfoText>
              {user.userData.position}
            </ProfileInfoText>
        }
      </ProfileInfoBox>
      <ProfileInfoBox>
        <ProfileInfoEmail>
          {user.userData.email}
        </ProfileInfoEmail>
      </ProfileInfoBox>
      <ProfileInfoBox>
        {
          showEdit ?
            <div>
              <InputText type="text" value={initialValue.phone} onChange={(e) => setInitialValue({ ...initialValue, 'phone': e.target.value })} />
            </div>
            :
            <div>
              {user.userData.phone}
            </div>
        }
      </ProfileInfoBox>
      {
        showEdit ?
          <ButtonBox>
            <CorrectBtn onClick={handleProfileEdit}>
              수정
            </CorrectBtn>
            <CancelBtn onClick={() => {
              setImgState("")
              setShowEdit(false)
            }}>
              취소
            </CancelBtn>
          </ButtonBox>
          :
          <ButtonBox>
            <CorrectBtn onClick={() => {
              if (user.userData.profile !== "") { setImgState(user.userData.profile) }
              setInitialValue({ ...user.userData })
              setShowEdit(true)
            }}>
              편집
            </CorrectBtn>
            <CancelBtn type="button" onClick={handleLogout}>로그아웃</CancelBtn>
          </ButtonBox>
      }
    </ProfileModalLayout>
  )
}
