import React, { useEffect, useState } from 'react';
import { OnBtn, OffBtn, BtnBox } from './style';
import { createTimelog } from '../../utils/firebase';
import { useRecoilState } from 'recoil';
import { TimeLog } from '../../utils/recoil';

interface OwnProps {
    timeHandler(): void;
}
const Btns: React.FC<OwnProps> = ({ timeHandler }) => {
    //버튼 사용 전 로그인 확인 로직
    const [userIn, setUserIn] = useState(0);
    const [timeCheck, setTimeCheck] = useState('');
    const [timeLog, setTimeLog] = useRecoilState(TimeLog);
    const local = localStorage.getItem('userId');

    let loggedIn: string;
    if (local) {
        loggedIn = JSON.parse(local).userId;
    }

    useEffect(() => {
        if (loggedIn) {
            setUserIn(1);
        } else {
            setUserIn(0);
        }
    }, []);

    //버튼 사용 로직
    const [timerOn, setTimerOn] = useState<boolean>(false);
    const timerSwitch = (set = 0) => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        const today = year + '.' + month + '.' + day;
        let Hours: number | string = new Date().getHours();
        let Min: number | string = new Date().getMinutes();
        let Sec: number | string = new Date().getSeconds();
        Hours = String(Hours).padStart(2, '0');
        Min = String(Min).padStart(2, '0');
        Sec = String(Sec).padStart(2, '0');
        const now = Hours + ':' + Min + ':' + Sec;
        if (!timerOn && set) {
            setTimerOn(true);
            setTimeCheck(`[${today}]` + ' ' + '입실' + ' ' + now);
        } else if (set === 0) {
            setTimerOn(false);
            setTimeLog(timeCheck + ' ' + '->' + ' ' + `[${today}]` + ' ' + '퇴실' + ' ' + now);
        }
        timeHandler();
    };
    // 실시간 시간을 정확하게 담기 위해서 useEffect 사용
    useEffect(() => {
        console.log(timeLog);
        createTimelog('user', 'asdasd', timeLog);
    }, [timeLog]);
    return (
        <BtnBox>
            <OnBtn
                value={timerOn}
                onClick={() => {
                    if (!timerOn && userIn) {
                        timerSwitch(1);
                    }
                }}
            >
                입실
            </OnBtn>
            <OffBtn
                value={timerOn}
                onClick={() => {
                    if (timerOn) {
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
