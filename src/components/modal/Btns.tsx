import React, { useEffect, useState } from 'react';
import { OnBtn, OffBtn, BtnBox } from './style';
import { createTimelog } from '../../utils/firebase';

interface OwnProps {
    timeHandler(): void;
}
const Btns: React.FC<OwnProps> = ({ timeHandler }) => {
    //버튼 사용 전 로그인 확인 로직
    const [userIn, setUserIn] = useState(0);
    const local = localStorage.getItem('recoil-persist');
    let loggedIn: string;
    if (local) {
        loggedIn = JSON.parse(local).userId;
    }
    useEffect(() => {
        if (loggedIn !== '') {
            setUserIn(1);
        }
    }, [userIn]);

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
        if (!timerOn) {
            console.log(today);
            console.log('입실: ' + Hours + ':' + Min + ':' + Sec);
            setTimerOn(true);
        } else {
            console.log('퇴실: ' + Hours + ':' + Min + ':' + Sec);
            setTimerOn(false);
        }
        timeHandler();
        console.log(set);

        if (set) {
            createTimelog('user', 'asdasd', '입실: ' + Hours + ':' + Min + ':' + Sec);
        } else {
            createTimelog('user', 'asdasd', '퇴실: ' + Hours + ':' + Min + ':' + Sec);
        }
    };

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
