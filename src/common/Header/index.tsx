import React, { useEffect } from 'react';
import {
    HeaderComponent,
    HomeHeaderComponent,
    TitleAnchor,
    AnchorContainer,
    ListAnchor,
    RightAnchorContainer,
    LogoutButton,
    LoginButton,
} from './style';
import { useRecoilState } from 'recoil';
import { UserId, TimeLog, TimerOn, ThemeChange } from '../../utils/recoil';
import { useNavigate, useLocation } from 'react-router-dom';
import { createTimelog, readUser } from '../../utils/firebase';
import { CreateDay, CreateTime } from '../../components/modal/Hooks/WhatTime';
import MyPageBtn from '../../components/modal/MyPage/MyPageBtn';
import swal from 'sweetalert';
import { RedCircle } from '../../components/modal/MyPage/style';

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
    const [theme, setTheme] = useRecoilState(ThemeChange);

    // 페이지 전환 시 세션 스토리지에서 타임로그 현재 상태 받아오기

    useEffect(() => {
        if (sessionStorage.getItem('timerOn')) {
            const sessionTimerOn = sessionStorage.getItem('timerOn');
            setTimerOn(sessionTimerOn === '1' ? true : false);
            const sessionTimelog = sessionStorage.getItem('timelog');
            setTimeLog(sessionTimelog ? sessionTimelog : '');
            console.log(userId);
        }
    }, [pathname]);
    // 퇴실버튼을 누르거나 로그아웃 시 firestore에 데이터 전송
    useEffect(() => {
        if (!timerOn) {
            if (timeLog.length > 0) {
                createTimelog('user', userId, timeLog);
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
    const logOutTimeCheck = () => {
        if (timerOn && timeLog !== '') {
            setTimeLog(timeLog + ' ' + ' ' + '-' + ' ' + ' ' + '퇴실' + ' ' + ' ' + CreateTime());
            setTimerOn(false);
        }
        // 타임로그 기록 전 아이디 정보가 사라지는 것을 막기위해 setTimeout처리
        setTimeout(() => {
            logOutHandler();
        }, 100);
    };

    const homeValued = location.pathname == '/';
    console.log(homeValued);

    return (
        <>
            {homeValued ? (
                <HomeHeaderComponent>
                    <TitleAnchor href="/" style={{ color: '#fff' }}>
                        FASTUDY
                    </TitleAnchor>
                    <AnchorContainer>
                        <RightAnchorContainer>
                            <ListAnchor href="/wiki" style={{ color: '#fff' }}>
                                위키
                            </ListAnchor>
                            <ListAnchor href="/recruitment" style={{ color: '#fff' }}>
                                모집
                            </ListAnchor>
                            <ListAnchor href="/gallery" style={{ color: '#fff' }}>
                                갤러리
                            </ListAnchor>
                            {userId.length > 0 ? (
                                <LogoutButton
                                    onClick={() => {
                                        swal({
                                            title: '로그아웃 하시겠습니까?',
                                            icon: 'warning',
                                            buttons: ['취소', '로그아웃'],
                                        }).then((yes) => {
                                            if (yes) {
                                                if (timerOn) {
                                                    logOutTimeCheck();
                                                } else {
                                                    logOutHandler();
                                                }
                                            }
                                        });
                                    }}
                                    style={{ color: '#fff' }}
                                >
                                    LogOut
                                </LogoutButton>
                            ) : (
                                <ListAnchor href={'/LogIn'}>
                                    <LoginButton style={{ color: '#fff' }}>LogIn</LoginButton>
                                </ListAnchor>
                            )}
                            {userId.length > 0 && <MyPageBtn />}
                            {timerOn && (
                                <RedCircle
                                    value={timerOn}
                                    style={{ position: 'fixed', top: '8px', right: '8px' }}
                                ></RedCircle>
                            )}
                        </RightAnchorContainer>
                    </AnchorContainer>
                </HomeHeaderComponent>
            ) : (
                <HeaderComponent>
                    <TitleAnchor href="/">FASTUDY</TitleAnchor>
                    <AnchorContainer>
                        <RightAnchorContainer>
                            <ListAnchor href="/wiki">위키</ListAnchor>
                            <ListAnchor href="/recruitment">모집</ListAnchor>
                            <ListAnchor href="/gallery">갤러리</ListAnchor>
                            {userId.length > 0 ? (
                                <LogoutButton
                                    onClick={() => {
                                        swal({
                                            title: '로그아웃 하시겠습니까?',
                                            icon: 'warning',
                                            buttons: ['취소', '로그아웃'],
                                        }).then((yes) => {
                                            if (yes) {
                                                if (timerOn) {
                                                    logOutTimeCheck();
                                                } else {
                                                    logOutHandler();
                                                }
                                            }
                                        });
                                    }}
                                >
                                    로그인
                                </LogoutButton>
                            ) : (
                                <ListAnchor href={'/LogIn'}>
                                    <LoginButton>로그인</LoginButton>
                                </ListAnchor>
                            )}
                            {userId.length > 0 && <MyPageBtn />}
                            {timerOn && (
                                <RedCircle
                                    value={timerOn}
                                    style={{ position: 'fixed', top: '8px', right: '8px' }}
                                ></RedCircle>
                            )}
                        </RightAnchorContainer>
                    </AnchorContainer>
                </HeaderComponent>
            )}
        </>
    );
};

export default Header;
