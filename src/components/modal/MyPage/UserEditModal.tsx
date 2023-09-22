import React, { useEffect, useState } from 'react';
import { CloseBtn, Modal, ModalHeader, ModalWall } from '../Timer/style';
import { EditBox, EditInput, EditInputBox, FlexAroundBox, InputImg, InputLabel, SubmitBtn, UploadBtn } from './style';
import { updateUserEmail, updateUserImg, updateUserInfo, updateUserName, uploadStorage } from '../../../utils/firebase';
import { useRecoilState } from 'recoil';
import { UserEmail, UserId, UserImg, UserInfo, UserName } from '../../../utils/recoil';
import swal from 'sweetalert';

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
            const img = await image.target.files[0];
            const imgURL = await uploadStorage(userId, img);
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
            swal({
                title: '수정되었습니다!',
                icon: 'success',
            });
            handleEdit();
        }
    }
    return (
        <ModalWall onClick={handleEdit}>
            <Modal
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
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
                            style={{ display: 'none' }}
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
                                spellCheck={false}
                                maxLength={6}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setUserName(e.target.value);
                                }}
                            ></EditInput>
                        </InputLabel>
                        <InputLabel style={{ marginBottom: '15px' }}>
                            <label htmlFor="email">이메일</label>
                            <EditInput
                                id="email"
                                value={userEmail}
                                spellCheck={false}
                                disabled={true}
                                style={{ backgroundColor: '#dcdcdc' }}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setUserEmail(e.target.value);
                                }}
                            ></EditInput>
                        </InputLabel>
                        <FlexAroundBox>
                            <label htmlFor="img" style={{ display: 'flex', alignItems: 'center' }}>
                                <UploadBtn style={{ width: '70px', height: '60px' }}></UploadBtn>
                            </label>
                            <SubmitBtn onClick={updateProfile}>수정하기</SubmitBtn>
                        </FlexAroundBox>
                    </EditInputBox>
                </EditBox>
            </Modal>
        </ModalWall>
    );
};

export default UserEditModal;
