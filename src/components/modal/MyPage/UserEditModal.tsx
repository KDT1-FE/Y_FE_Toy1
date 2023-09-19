import React, { useEffect, useState } from 'react';
import { CloseBtn, Modal, ModalHeader } from '../Timer/style';
import { EditBox, EditInput, EditInputBox, FlexBox, InputImg, InputLabel, SubmitBtn } from './style';
import {
    downloadStorage,
    updateUserEmail,
    updateUserImg,
    updateUserInfo,
    updateUserName,
    uploadStorage,
} from '../../../utils/firebase';
import { useRecoilState } from 'recoil';
import { UserEmail, UserId, UserImg, UserInfo, UserName } from '../../../utils/recoil';

interface ownProps {
    handleEdit(): void;
}

const UserEditModal: React.FC<ownProps> = ({ handleEdit }) => {
    const [userName, setUserName] = useRecoilState(UserName);
    const [userEmail, setUserEmail] = useRecoilState(UserEmail);
    const [userInfo, setUserInfo] = useRecoilState(UserInfo);
    const [userImg, setUserImg] = useRecoilState(UserImg);
    const [userId, setUserId] = useRecoilState(UserId);
    const [userImgPre, setUserImgPre] = useState('');

    useEffect(() => {
        setUserImgPre(userImg);
    }, []);
    async function updateImg(image: React.ChangeEvent<HTMLInputElement>) {
        if (image.target.files) {
            console.log(image.target.files[0]);
            const img = await image.target.files[0];
            await uploadStorage(userId, img);
            const imgURL = await downloadStorage(userId);
            console.log(imgURL);

            setUserImgPre(imgURL);
            await window.URL.revokeObjectURL(imgURL);
        }
    }
    async function updateProfile() {
        try {
            await updateUserName('user', userId, userName);
            await updateUserEmail('user', userId, userEmail);
            await updateUserInfo('user', userId, userInfo);
            await updateUserImg('user', userId, userImgPre);
            setUserImg(userImgPre);
        } catch (error) {
            console.log(error);
        } finally {
            alert('수정되었습니다!');
        }
    }
    return (
        <Modal>
            <ModalHeader>
                <span>프로필 수정</span>
                <CloseBtn onClick={handleEdit}>X</CloseBtn>
            </ModalHeader>
            <EditBox>
                <InputLabel>
                    <label htmlFor="img">프로필사진</label>
                    <InputImg src={userImgPre}></InputImg>
                    <input
                        type="file"
                        id="img"
                        accept="image/*"
                        onChange={(e) => {
                            updateImg(e);
                        }}
                    />
                </InputLabel>
                <EditInputBox>
                    <InputLabel>
                        <label htmlFor="name">이름</label>
                        <EditInput
                            id="name"
                            value={userName}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setUserName(e.target.value);
                            }}
                        ></EditInput>
                    </InputLabel>
                    <InputLabel>
                        <label htmlFor="email">이메일</label>
                        <EditInput
                            id="email"
                            value={userEmail}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setUserEmail(e.target.value);
                            }}
                        ></EditInput>
                    </InputLabel>
                    <InputLabel>
                        <label htmlFor="info">자기소개</label>
                        <EditInput
                            id="info"
                            value={userInfo}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setUserInfo(e.target.value);
                            }}
                        ></EditInput>
                    </InputLabel>
                </EditInputBox>
            </EditBox>
            <FlexBox>
                <SubmitBtn onClick={updateProfile}>수정하기</SubmitBtn>
            </FlexBox>
        </Modal>
    );
};

export default UserEditModal;
