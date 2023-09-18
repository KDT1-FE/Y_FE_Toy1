import React, { useState } from 'react';
import { ModalBtn, ModalBtnImg } from './style';
import MyPageModal from './MyPageModal';
import { useRecoilState } from 'recoil';
import { SlideOn, UserId } from '../../../utils/recoil';

export default function MyPageBtn() {
    const [userId, setUserId] = useRecoilState(UserId);
    const [showMyPage, setShowMyPage] = useState(false);
    const [slideOn, setSlideOn] = useRecoilState(SlideOn);

    const imgSrc =
        'https://firebasestorage.googleapis.com/v0/b/wiki-for-fastcampus.appspot.com/o/images%2Fson.jpeg?alt=media&token=f343cb1b-a335-40a9-8f68-f25662f68a40';

    const handleMyPage = () => {
        if (showMyPage) {
            setShowMyPage(false);

            setSlideOn(false);
        } else {
            setShowMyPage(true);
            setTimeout(() => {
                setSlideOn(true);
            }, 100);
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
            <ModalBtnImg src={imgSrc}></ModalBtnImg>;
            {showMyPage && userId.length > 0 && <MyPageModal handleMyPage={handleMyPage} />}
        </ModalBtn>
    );
}
