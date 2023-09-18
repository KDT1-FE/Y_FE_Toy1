import React, { useState } from 'react';
import { MarginLeftContents, MyPageContents, RedCircle } from './style';
import TimelogModal from './TimelogModal';

export default function MyPageTimelog() {
    const [timelogModal, setTimelogModal] = useState(false);
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
            <RedCircle>·</RedCircle>
            {timelogModal && <TimelogModal handleTimelog={handleTimelog} />}
        </MyPageContents>
    );
}
