import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import {
    CommuteModalContainer, CommuteHeader,
    TimerContainer,
    TimerText
    , DateText
    , BtnContainer
    , TimerBtn
    , CommuteBtn
    , ExitBtn
} from '../../../styled/MainPage/CommuteModal';
import { isCommuteState, startTimeState } from '../../../recoil/atoms/main/CommuteAtom';
import { CloseImg, TitleText } from '../../../styled/Common/Modal';
import ClostButton from "../../../assets/img/CloseButton.svg"

interface CommuteProps {
    setActiveModalIdx: React.Dispatch<React.SetStateAction<number>>;
};


export default function CommuteModal({ setActiveModalIdx }: CommuteProps) {
    const [time, setTime] = useState(new Date());
    const [date, setDate] = useState('');
    const [isCommute, setIsCommute] = useRecoilState(isCommuteState);
    const [startTime, setStartTime] = useRecoilState(startTimeState);


    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()} - ${currentDate.getMonth() + 1} - ${currentDate.getDate()}`;
        setDate(formattedDate);
    }, []);

    const formattedTime = time.toLocaleTimeString();


    useEffect(() => {
        if (isCommute && !startTime) {
            const currentTime = new Date();
            setStartTime(currentTime);
        }
        else if (!isCommute && startTime) {
            setStartTime(null);
        }
    }, [isCommute]);


    const handleCommuteBtnClick = (): void => {
        setIsCommute(!isCommute);

    }

    const calculatElapsedTime = () => {
        if (startTime) {
            const endTime = new Date();
            const elapsedTimeInSeconds = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);

            const hours = Math.floor(elapsedTimeInSeconds / 3600);
            const minutes = Math.floor((elapsedTimeInSeconds % 3600) / 60);
            const seconds = elapsedTimeInSeconds % 60;

            return `${hours} : ${minutes} : ${seconds}`
        }
        return '0 : 0 : 0';
    }
    return (
        <CommuteModalContainer>
            <ExitBtn onClick={() => setActiveModalIdx(-1)}>
                <CloseImg src={ClostButton} alt="" />
            </ExitBtn>
            <CommuteHeader>
                <TitleText>COMMUTE</TitleText>
                <DateText>{date}</DateText>
            </CommuteHeader>
            <TimerContainer>
                <TimerText>{formattedTime}</TimerText>
            </TimerContainer>
            <BtnContainer>
                <TimerBtn>Time  {calculatElapsedTime()}</TimerBtn>
                <CommuteBtn
                    commute={isCommute ? 'true' : 'false'}
                    onClick={handleCommuteBtnClick}>
                    {isCommute ? '퇴근' : '출근'}
                </CommuteBtn>
            </BtnContainer>
        </CommuteModalContainer>
    )
}
