import React from 'react';
import { useRecoilState } from 'recoil';
import { TimeLog, TimerOn, UserId } from '../../../utils/recoil';
import { CreateTime, CreateDay } from '../Hooks/WhatTime';
import { TimerBtnBox, TimerOffBtn, TimerOnBtn } from '../MyPage/commuteStyle';
import swal from 'sweetalert';

const Btns: React.FC = () => {
    // 입실버튼을 눌렀을 때 입실 시간을 기록, 퇴실버튼을 눌렀을 때 퇴실시간 기록
    const [userId, setUserId] = useRecoilState(UserId);

    const [timerOn, setTimerOn] = useRecoilState(TimerOn);
    const [timeLog, setTimeLog] = useRecoilState(TimeLog);

    const timerSwitch = (set = 0) => {
        if (!timerOn && set) {
            setTimeLog(`[${CreateDay()}]` + ' ' + '|' + '입실' + ' ' + ' ' + CreateTime());
            setTimerOn(true);
        } else if (set === 0) {
            setTimerOn(false);
            setTimeLog(timeLog + ' ' + ' ' + '-' + ' ' + ' ' + '퇴실' + ' ' + ' ' + CreateTime());
        }
    };

    return (
        <TimerBtnBox>
            <TimerOnBtn
                value={timerOn}
                onClick={(e) => {
                    swal({
                        title: '기록을 시작하시겠습니까?',
                        text: '*퇴실 하지않고 페이지 종료 시 입실기록이 삭제됩니다.',
                        icon: 'info',
                        buttons: ['취소', '시작'],
                    }).then((willDelete) => {
                        if (willDelete) {
                            if (userId.length > 0 && !timerOn) {
                                timerSwitch(1);
                            }
                        }
                    });

                    e.stopPropagation();
                }}
            >
                입실
            </TimerOnBtn>
            <TimerOffBtn
                value={timerOn}
                onClick={(e) => {
                    if (timerOn) {
                        swal({
                            title: '현재 시간까지 기록됩니다!',
                            icon: 'info',
                            buttons: ['취소', '기록'],
                        }).then((willDelete) => {
                            if (willDelete) {
                                timerSwitch();
                            }
                        });
                    }
                    e.stopPropagation();
                }}
            >
                퇴실
            </TimerOffBtn>
        </TimerBtnBox>
    );
};

export default Btns;
