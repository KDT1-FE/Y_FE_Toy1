import React from 'react';
import { OnBtn, OffBtn, BtnBox } from './style';
import { useRecoilState } from 'recoil';
import { TimeLog, TimerOn, UserId } from '../../utils/recoil';
import { CreateTime, CreateDay } from './Hooks/WhatTime';

const Btns: React.FC = () => {
    // 입실버튼을 눌렀을 때 입실 시간을 기록, 퇴실버튼을 눌렀을 때 퇴실시간 기록
    const [userId, setUserId] = useRecoilState(UserId);

    const [timerOn, setTimerOn] = useRecoilState(TimerOn);
    const [timeLog, setTimeLog] = useRecoilState(TimeLog);

    const timerSwitch = (set = 0) => {
        if (!timerOn && set) {
            setTimeLog(`[${CreateDay()}]` + ' ' + '입실' + ' ' + CreateTime());
            setTimerOn(true);
        } else if (set === 0) {
            setTimerOn(false);
            setTimeLog(timeLog + ' ' + '->' + ' ' + `[${CreateDay()}]` + ' ' + '퇴실' + ' ' + CreateTime());
        }
    };

    return (
        <BtnBox>
            <OnBtn
                value={timerOn}
                onClick={() => {
                    if (
                        userId.length > 0 &&
                        !timerOn &&
                        confirm('기록을 시작하시겠습니까?\n*퇴실 하지않고 페이지 종료 시 입실기록이 삭제됩니다.')
                    ) {
                        timerSwitch(1);
                    } else {
                        alert('로그인 후 사용이 가능합니다.');
                    }
                }}
            >
                입실
            </OnBtn>
            <OffBtn
                value={timerOn}
                onClick={() => {
                    if (timerOn && confirm('기록을 종료하시겠습니까?')) {
                        timerSwitch();
                    }
                }}
            >
                퇴실
            </OffBtn>
        </BtnBox>
    );
};

export default Btns;
