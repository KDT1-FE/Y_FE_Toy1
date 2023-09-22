import React, { useEffect, useState } from 'react';
import { ModalBtn, ModalBtnImg } from './style';
import MyPageModal from './MyPageModal';
import { useRecoilState } from 'recoil';
import { SlideOn, ThemeChange, UserEmail, UserId, UserImg, UserInfo, UserName } from '../../../utils/recoil';
import { readUser } from '../../../utils/firebase';
import Loading from '../../../common/profileImgloading.gif';

export default function MyPageBtn() {
    const [userId, setUserId] = useRecoilState(UserId);
    const [showMyPage, setShowMyPage] = useState(false);
    const [slideOn, setSlideOn] = useRecoilState(SlideOn);
    const [userName, setUserName] = useRecoilState(UserName);
    const [userEmail, setUserEmail] = useRecoilState(UserEmail);
    const [userInfo, setUserInfo] = useRecoilState(UserInfo);
    const [userImg, setUserImg] = useRecoilState(UserImg);

    const onErrorImg = (e: any) => {
        e.target.src = Loading;
    };

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
    }, [userId]);

    const handleMyPage = () => {
        if (showMyPage) {
            setSlideOn(false);
            setTimeout(() => {
                setShowMyPage(false);
            }, 900);
        } else {
            setShowMyPage(true);
            setTimeout(() => {
                setSlideOn(true);
            }, 10);
        }
    };
    return (
        <ModalBtn
            onClick={() => {
                if (userId.length > 0) {
                    handleMyPage();
                } else {
                    alert('로그인 후 사용이 가능합니다.');
                }
            }}
        >
            <ModalBtnImg src={userImg} onError={onErrorImg}></ModalBtnImg>
            {showMyPage && userId.length > 0 && <MyPageModal handleMyPage={handleMyPage} />}
        </ModalBtn>
    );
}
