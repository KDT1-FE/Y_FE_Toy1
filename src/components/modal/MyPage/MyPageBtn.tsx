import React, { useState } from 'react';
import { ModalBtn, ModalBtnImg } from './style';
import MyPageModal from './MyPageModal';
import { useRecoilState } from 'recoil';
import { SlideOn, UserId, UserImg } from '../../../utils/recoil';

export default function MyPageBtn() {
    const [userId, setUserId] = useRecoilState(UserId);
    const [showMyPage, setShowMyPage] = useState(false);
    const [slideOn, setSlideOn] = useRecoilState(SlideOn);
    const [userImg, setUserImg] = useRecoilState(UserImg);

    const handleMyPage = () => {
        if (showMyPage) {
            setSlideOn(false);
            setTimeout(() => {
                setShowMyPage(false);
            }, 1000);
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
            <ModalBtnImg src={userImg}></ModalBtnImg>;
            {showMyPage && userId.length > 0 && <MyPageModal handleMyPage={handleMyPage} />}
        </ModalBtn>
    );
}
