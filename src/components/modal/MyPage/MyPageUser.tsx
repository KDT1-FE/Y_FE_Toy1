import React, { useEffect, useState } from 'react';
import { MyPageProfile, ProfileContent, ProfileEdit, ProfileImg, ProfileIntroduce } from './style';
import { readUser } from '../../../utils/firebase';
import { useRecoilState } from 'recoil';
import { UserId, UserName, UserEmail, UserInfo, UserImg } from '../../../utils/recoil';
import UserEditBtn from './UserEditBtn';

export default function MyPageUser() {
    const [userId, setUserId] = useRecoilState(UserId);
    const [userName, setUserName] = useRecoilState(UserName);
    const [userEmail, setUserEmail] = useRecoilState(UserEmail);
    const [userInfo, setUserInfo] = useRecoilState(UserInfo);
    const [userImg, setUserImg] = useRecoilState(UserImg);

    useEffect(() => {
        async function getUserData() {
            try {
                const user = await readUser('user', userId);
                if (user) {
                    setUserName(user['name']);
                    setUserEmail(user['email']);
                    setUserImg(user['imageURL']);
                    setUserInfo(user['info']);
                }
            } catch {
                console.log('error');
            }
        }
        getUserData();
    }, []);
    return (
        <MyPageProfile>
            <ProfileImg src={userImg}></ProfileImg>
            <ProfileContent>
                <span>{userName}</span>
                <UserEditBtn />
            </ProfileContent>
            <ProfileContent>{userEmail}</ProfileContent>
            <ProfileIntroduce>
                <p>{userInfo}</p>
            </ProfileIntroduce>
        </MyPageProfile>
    );
}
