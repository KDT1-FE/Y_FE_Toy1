import React, { useEffect, useState } from 'react';
import { MarginLeft, MyPage, MyPageHeader, MyPageFooter, MyPageExitBtn } from './style';
import CloseIcon from '@mui/icons-material/Close';
import MyPageUser from './MyPageUser';
import MyPageTimelog from './MyPageTimelog';
import { useRecoilState } from 'recoil';
import { ReadTimelog, SlideOn, TimeLog, UserId } from '../../../utils/recoil';
import MyPageCommute from './MyPageCommute';
import FastcampusDday from '../Timer/FastcampusDday';
import MyPageReadLog from './MyPageReadLog';
import { readUser } from '../../../utils/firebase';

interface OwnProps {
    handleMyPage(): void;
}

const MyPageModal: React.FC<OwnProps> = ({ handleMyPage }) => {
    const [userId, setUserId] = useRecoilState(UserId);
    const [slideOn, setSlideOn] = useRecoilState(SlideOn);
    const [showTimerModal, setShowTimerModal] = useState(false);
    const [showReadModal, setShowReadModal] = useState(false);
    const [timeRenewal, setTimeRenewal] = useState<string | void>();
    const [readTimelog, setReadTimelog] = useRecoilState(ReadTimelog);
    const [timelog, setTimelog] = useRecoilState(TimeLog);

    useEffect(() => {
        async function getTimelog() {
            try {
                const userData = await readUser('user', userId);
                if (userData) {
                    const timelog = userData['timelog'].reverse();
                    setReadTimelog(timelog);
                }
            } catch {
                console.log('error');
            }
        }
        getTimelog();
    }, [timelog]);

    const handleTimerModal = () => {
        if (showTimerModal) {
            setShowTimerModal(false);
        } else {
            setShowTimerModal(true);
            setShowReadModal(false);
        }
    };
    const handleReadModal = () => {
        if (showReadModal) {
            setShowReadModal(false);
        } else {
            setShowReadModal(true);
            setShowTimerModal(false);
        }
    };

    return (
        <MyPage
            onClick={(e) => {
                e.stopPropagation();
            }}
            value={slideOn}
        >
            <MyPageHeader>
                <MarginLeft>Profile</MarginLeft>
                <MyPageExitBtn onClick={handleMyPage}>
                    <CloseIcon />
                </MyPageExitBtn>
            </MyPageHeader>
            <MyPageUser />
            <MyPageTimelog handleTimerModal={handleTimerModal} handleReadModal={handleReadModal} />
            {showTimerModal && <MyPageCommute setTimeRenewal={setTimeRenewal} />}
            {showReadModal && <MyPageReadLog />}
            <MyPageFooter>
                <FastcampusDday timeRenewal={timeRenewal} />
            </MyPageFooter>
        </MyPage>
    );
};

export default MyPageModal;
