import React, { ChangeEvent, useRef, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import {
  ButtonBox, CloseImg, ProfileInfoBox, ProfileModalCloseBtn, ProfileModalHeader, ProfileModalHeaderText,
  ProfileModalLayout, ProfileImg, ProfileInput, ProfileInputBtn, ProfileCameraImg
} from '../../styled/MainPage/ProfileModal'
import ClostButton from "../../assets/img/CloseButton.svg"
import userState from '../../recoil/atoms/userState';
import { auth, db, storage } from '../../firebaseSDK';
import DefaultProfile from '../../assets/img/DefaultProfile.png'
import Camera from '../../assets/img/Camera.svg'
import loginState from '../../recoil/atoms/loginState';

interface ProfileProp {
  setShowProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProfileModal({ setShowProfile }: ProfileProp) {

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
        <ProfileModalCloseBtn onClick={() => setShowProfile(false)}>
          <CloseImg src={ClostButton} alt="" />
        </ProfileModalCloseBtn>
      </ProfileModalHeader>
      <ProfileInfoBox>
        {
          showEdit ?
            <div style={{ position: 'relative' }}>
              <ProfileInputBtn onClick={() => imgInputRef.current?.click()}>
                <ProfileCameraImg src={Camera} alt="" />
                <ProfileInput ref={imgInputRef} type='file' onChange={handlePreviewImgChange} />
              </ProfileInputBtn>
              <ProfileImg src={imgState === "" ? DefaultProfile : imgState} alt="" />
            </div>
            :
            <ProfileImg src={user.userData.profile ? user.userData.profile : DefaultProfile} />
        }
      </ProfileInfoBox>

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
          <ButtonBox>
            <button onClick={handleProfileEdit}>
              수정
            </button>
            <button onClick={() => {
              setImgState("")
              setShowEdit(false)
            }}>
              취소
            </button>
          </ButtonBox>
          :
          <ButtonBox>
            <button onClick={() => {
              if (user.userData.profile !== "") { setImgState(user.userData.profile) }
              setInitialValue({ ...user.userData })
              setShowEdit(true)
            }}>
              편집
            </button>
            <button type="button" onClick={handleLogout}>로그아웃</button>
          </ButtonBox>
      }
    </ProfileModalLayout>
  )
}
