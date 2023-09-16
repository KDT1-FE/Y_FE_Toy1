import React, { useEffect } from 'react';
import { HeaderComponent, TitleAnchor, AnchorContainer, ListAnchor, RightAnchorContainer, ModalButton } from './style';
import { useRecoilState } from 'recoil';
import { UserId, TimeLog, TimerOn } from '../../utils/recoil';
import { useNavigate, useLocation } from 'react-router-dom';
import CommuteBtn from '../../components/modal/CommuteBtn';
import { createTimelog } from '../../utils/firebase';
import { CreateDay, CreateTime } from '../../components/modal/Hooks/WhatTime';

const Header: React.FC = () => {
    const [userId, setUserId] = useRecoilState(UserId);

    const navigate = useNavigate();
    const { pathname } = useLocation();

    const logOutHandler = () => {
        setUserId('');
        navigate('/', { state: pathname });
    };

    const [timerOn, setTimerOn] = useRecoilState<boolean>(TimerOn);
    const [timeLog, setTimeLog] = useRecoilState(TimeLog);
    // 페이지 전환 시 세션 스토리지에서 타임로그 현재 상태 받아오기

    useEffect(() => {
        if (sessionStorage.getItem('timerOn')) {
            const sessionTimerOn = sessionStorage.getItem('timerOn');
            setTimerOn(sessionTimerOn === '1' ? true : false);
            const sessionTimelog = sessionStorage.getItem('timelog');
            setTimeLog(sessionTimelog ? sessionTimelog : '');
        }
    }, [pathname]);
    // 퇴실버튼을 누르거나 로그아웃 시 firestore에 데이터 전송
    useEffect(() => {
        if (!timerOn) {
            if (timeLog.length > 0) {
                createTimelog('user', 'asdasd', timeLog);
                setTimeLog('');
                sessionStorage.setItem('timerOn', '0');
                sessionStorage.setItem('timelog', '');
                return;
            }
        } else if (timerOn) {
            sessionStorage.setItem('timerOn', '1');
            sessionStorage.setItem('timelog', timeLog);
        }
    }, [timeLog]);

    return (
        <HeaderComponent>
            <TitleAnchor href="/">wiki for fastcampus</TitleAnchor>
            <AnchorContainer>
                <RightAnchorContainer>
                    <ListAnchor href="/wiki">wiki</ListAnchor>
                    <ListAnchor href="/gallery">gallery</ListAnchor>
                    {userId.length > 0 ? (
                        <button
                            onClick={() => {
                                if (timerOn && timeLog !== '') {
                                    setTimeLog(
                                        timeLog +
                                            ' ' +
                                            '->' +
                                            ' ' +
                                            `[${CreateDay()}]` +
                                            ' ' +
                                            '퇴실' +
                                            ' ' +
                                            CreateTime(),
                                    );
                                    setTimerOn(false);
                                }
                                logOutHandler();
                            }}
                        >
                            LogOut
                        </button>
                    ) : (
                        <ListAnchor href={'/LogIn'}>LogIn</ListAnchor>
                    )}
                    <ModalButton>
                        <CommuteBtn />
                    </ModalButton>
                </RightAnchorContainer>
            </AnchorContainer>
        </HeaderComponent>
    );
};

export default Header;
