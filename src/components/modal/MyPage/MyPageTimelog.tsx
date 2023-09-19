import React, { useState } from 'react';
import { MarginLeftContents, MyPageContents, RedCircle } from './style';
import TimelogModal from './TimelogModal';
import { useRecoilState } from 'recoil';
import { TimerOn } from '../../../utils/recoil';

export default function MyPageTimelog() {
    const [timelogModal, setTimelogModal] = useState(false);
    const [timerOn, setTimerOn] = useRecoilState(TimerOn);
    function handleTimelog() {
        if (timelogModal) {
            setTimelogModal(false);
        } else {
            setTimelogModal(true);
        }
    }
    return (
        <MyPageContents>
            <MarginLeftContents onClick={handleTimelog}>입/퇴실 기록</MarginLeftContents>
            <RedCircle value={timerOn}>·</RedCircle>
            {timelogModal && <TimelogModal handleTimelog={handleTimelog} />}
        </MyPageContents>
    );
}
