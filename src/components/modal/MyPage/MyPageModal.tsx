import React, { useState } from 'react';
import { MarginLeft, MyPage, MyPageHeader, MyPageFooter, MyPageExitBtn } from './style';
import Logo from '../../../common/fastcampusIcon.png';
import CloseIcon from '@mui/icons-material/Close';
import MyPageUser from './MyPageUser';
import MyPageTimelog from './MyPageTimelog';
import MyPageAuthor from './MyPageAuthor';
import { useRecoilState } from 'recoil';
import { SlideOn } from '../../../utils/recoil';
import TimelogModal from './TimelogModal';

interface OwnProps {
    handleMyPage(): void;
}

const MyPageModal: React.FC<OwnProps> = ({ handleMyPage }) => {
    const [slideOn, setSlideOn] = useRecoilState(SlideOn);
    return (
        <MyPage
            onClick={(e) => {
                e.stopPropagation();
            }}
            value={slideOn}
        >
            <MyPageHeader>
                <MarginLeft>프로필</MarginLeft>
                <MyPageExitBtn onClick={handleMyPage}>
                    <CloseIcon />
                </MyPageExitBtn>
            </MyPageHeader>
            <MyPageUser />
            <MyPageTimelog />
            <MyPageAuthor />
            <MyPageFooter>
                <img src={Logo} alt="패스트캠퍼스 아이콘" />
                <p>Fast Campus</p>
            </MyPageFooter>
        </MyPage>
    );
};

export default MyPageModal;
