import React, { useEffect, useRef, useState } from 'react';
import {
    Outer,
    Inner,
    InnerBox,
    InnerHeadline,
    InnerSubTitle,
    InnerBtnWrapper,
    SubInnerBox,
    SubInnerHeadline,
    SubInnerSubTitle,
    SubInnerBtnWrapper,
    SubInnerImg,
} from './style';
import Button from '@mui/material/Button';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import wikiImg from '../../common/MainImg/wikiMain.png';
import galleryImg from '../../common/MainImg/galleryMain.png';
import recruitmentImg from '../../common/MainImg/recruitment.png';
import recruitmentPostImg from '../../common/MainImg/recruitmentPost.png';

const Home: React.FC = () => {
    const outerDivRef = useRef<HTMLDivElement | null>(null);
    const [scrollIndex, setScrollIndex] = useState<number>(1);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = (e: WheelEvent) => {
            e.preventDefault();

            const { deltaY } = e;
            const { scrollTop } = outerDivRef.current!;
            const pageHeight = window.innerHeight;

            if (deltaY == 0) {
                return;
            } else {
                if (deltaY > 0) {
                    // 스크롤 다운
                    if (scrollTop >= 0 && scrollTop < pageHeight) {
                        console.log('현재 1페이지, down');

                        outerDivRef.current!.scrollTo({
                            top: pageHeight,
                            left: 0,
                            behavior: 'smooth',
                        });
                        setScrollIndex(2);
                    } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
                        console.log('현재 2페이지, down');

                        outerDivRef.current!.scrollTo({
                            top: pageHeight * 2,
                            left: 0,
                            behavior: 'smooth',
                        });
                        setScrollIndex(3);
                    } else {
                        console.log('현재 3페이지, down');

                        outerDivRef.current!.scrollTo({
                            top: pageHeight * 2,
                            left: 0,
                            behavior: 'smooth',
                        });
                        setScrollIndex(3);
                    }
                } else {
                    // 스크롤 업
                    if (scrollTop >= 0 && scrollTop < pageHeight) {
                        console.log('현재 1페이지, up');

                        outerDivRef.current!.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: 'smooth',
                        });
                        setScrollIndex(1);
                    } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 1.5) {
                        console.log('현재 2페이지, up');
                        outerDivRef.current!.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: 'smooth',
                        });
                        setScrollIndex(1);
                    } else {
                        console.log('현재 3페이지, up');
                        outerDivRef.current!.scrollTo({
                            top: pageHeight,
                            left: 0,
                            behavior: 'smooth',
                        });
                        setScrollIndex(2);
                    }
                }
            }
        }; // 디바운스 지연 시간을 조절합니다.

        const outerDivRefCurrent = outerDivRef.current;
        if (outerDivRefCurrent) {
            outerDivRefCurrent.addEventListener('wheel', handleScroll);
        }

        return () => {
            if (outerDivRefCurrent) {
                outerDivRefCurrent.removeEventListener('wheel', handleScroll);
            }
        };
    }, []);
    const pageHeight = window.innerHeight;

    const handleIntro = () => {
        outerDivRef.current!.scrollTo({
            top: pageHeight,
            left: 0,
            behavior: 'smooth',
        });
    };
    return (
        <Outer ref={outerDivRef} className="outer">
            <Dots scrollIndex={scrollIndex} />
            <Inner style={{ backgroundColor: '#350d36' }}>
                <InnerBox>
                    <InnerHeadline style={{ color: 'white' }}>FASTUDY</InnerHeadline>
                    <InnerSubTitle>프로젝트 / 스터디 인원 모집 사이트</InnerSubTitle>
                    <InnerBtnWrapper>
                        <Button
                            variant="outlined"
                            size="large"
                            style={{
                                width: '200px',
                                height: '70px',
                                fontSize: '1.5rem',
                                backgroundColor: '#fff',
                                borderRadius: '15px',
                            }}
                            onClick={() => {
                                window.location.href = 'https://github.com/2weeks-team';
                            }}
                        >
                            깃허브
                        </Button>
                        <Button
                            variant="contained"
                            size="large"
                            style={{
                                marginLeft: '20px',
                                width: '200px',
                                height: '70px',
                                fontSize: '1.5rem',
                                borderRadius: '15px',
                            }}
                            onClick={() => {
                                handleIntro();
                            }}
                        >
                            소개
                        </Button>
                    </InnerBtnWrapper>
                </InnerBox>
            </Inner>
            <Carousel
                navButtonsAlwaysVisible={true}
                fullHeightHover={false}
                animation="slide"
                autoPlay={false}
                indicators={false}
            >
                <Paper>
                    <Inner style={{ backgroundColor: '#7d9bfd' }}>
                        <InnerBox>
                            <InnerHeadline style={{ color: 'white' }}>위키/갤러리</InnerHeadline>
                            <InnerSubTitle>누구나 자유롭게 수정/삭제 가능한 위키와 갤러리</InnerSubTitle>
                            <InnerBtnWrapper>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    style={{
                                        width: '200px',
                                        height: '70px',
                                        fontSize: '1.5rem',
                                        backgroundColor: '#fff',
                                        borderRadius: '15px',
                                    }}
                                    onClick={() => {
                                        navigate('/wiki');
                                    }}
                                >
                                    위키
                                </Button>
                                <Button
                                    variant="contained"
                                    size="large"
                                    style={{
                                        marginLeft: '20px',
                                        width: '200px',
                                        height: '70px',
                                        fontSize: '1.5rem',
                                        borderRadius: '15px',
                                    }}
                                    onClick={() => {
                                        navigate('/gallery');
                                    }}
                                >
                                    갤러리
                                </Button>
                            </InnerBtnWrapper>
                        </InnerBox>
                    </Inner>
                </Paper>
                <Paper>
                    <Inner style={{ backgroundColor: '#7d9bfd' }}>
                        <SubInnerBox>
                            <SubInnerHeadline style={{ color: 'white' }}>위키</SubInnerHeadline>
                            <SubInnerSubTitle>누구나 자유롭게 수정/삭제 가능한 위키</SubInnerSubTitle>
                            <InnerBtnWrapper>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    style={{
                                        width: '200px',
                                        height: '70px',
                                        fontSize: '1.5rem',
                                        backgroundColor: '#fff',
                                        borderRadius: '15px',
                                    }}
                                    onClick={() => {
                                        navigate('/wiki');
                                    }}
                                >
                                    위키
                                </Button>
                            </InnerBtnWrapper>
                            <SubInnerImg
                                style={{
                                    backgroundImage: `url(${wikiImg})`,
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                }}
                            ></SubInnerImg>
                        </SubInnerBox>
                    </Inner>
                </Paper>
                <Paper>
                    <Inner style={{ backgroundColor: '#7d9bfd' }}>
                        <SubInnerBox>
                            <SubInnerHeadline style={{ color: 'white' }}>갤러리</SubInnerHeadline>
                            <SubInnerSubTitle>누구나 자유롭게 수정/삭제 가능한 갤러리</SubInnerSubTitle>
                            <InnerBtnWrapper>
                                <Button
                                    variant="contained"
                                    size="large"
                                    style={{
                                        width: '200px',
                                        height: '70px',
                                        fontSize: '1.5rem',
                                        borderRadius: '15px',
                                    }}
                                    onClick={() => {
                                        navigate('/gallery');
                                    }}
                                >
                                    갤러리
                                </Button>
                            </InnerBtnWrapper>
                            <SubInnerImg
                                style={{
                                    backgroundImage: `url(${galleryImg})`,
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                }}
                            ></SubInnerImg>
                        </SubInnerBox>
                    </Inner>
                </Paper>
            </Carousel>
            <Carousel
                navButtonsAlwaysVisible={true}
                fullHeightHover={false}
                animation="slide"
                autoPlay={false}
                indicators={false}
            >
                <Paper>
                    <Inner style={{ backgroundColor: '#FFC2C0' }}>
                        <InnerBox>
                            <InnerHeadline style={{ color: 'rgb(0,0,0)' }}>모집 게시판</InnerHeadline>
                            <InnerSubTitle style={{ color: 'rgb(120,0,0)' }}>
                                스터디/프로젝트 인원을 모집해보세요
                            </InnerSubTitle>
                            <InnerBtnWrapper>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    style={{
                                        width: '200px',
                                        height: '70px',
                                        fontSize: '1.5rem',
                                        backgroundColor: '#fff',
                                        borderRadius: '15px',
                                    }}
                                    onClick={() => {
                                        navigate('/recruitment');
                                    }}
                                >
                                    프로젝트
                                </Button>
                                <Button
                                    variant="contained"
                                    size="large"
                                    style={{
                                        marginLeft: '20px',
                                        width: '200px',
                                        height: '70px',
                                        fontSize: '1.5rem',
                                        borderRadius: '15px',
                                    }}
                                    onClick={() => {
                                        navigate('/recruitment');
                                    }}
                                >
                                    스터디
                                </Button>
                            </InnerBtnWrapper>
                        </InnerBox>
                    </Inner>
                </Paper>
                <Paper>
                    <Inner style={{ backgroundColor: '#FFC2C0' }}>
                        <SubInnerBox>
                            <SubInnerHeadline style={{ color: 'white' }}>모집 게시판</SubInnerHeadline>
                            <SubInnerSubTitle>카테고리별로 분류된 게시글을 만나실 수 있습니다.</SubInnerSubTitle>
                            <InnerBtnWrapper>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    style={{
                                        width: '200px',
                                        height: '70px',
                                        fontSize: '1.5rem',
                                        backgroundColor: '#fff',
                                        borderRadius: '15px',
                                    }}
                                    onClick={() => {
                                        navigate('/recruitment');
                                    }}
                                >
                                    모집하기
                                </Button>
                            </InnerBtnWrapper>
                            <SubInnerImg
                                style={{
                                    backgroundImage: `url(${recruitmentImg})`,
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                }}
                            ></SubInnerImg>
                        </SubInnerBox>
                    </Inner>
                </Paper>
                <Paper>
                    <Inner style={{ backgroundColor: '#FFC2C0' }}>
                        <SubInnerBox>
                            <SubInnerHeadline style={{ color: 'white' }}>모집글 작성</SubInnerHeadline>
                            <SubInnerSubTitle>작성하기에 들어가 프로젝트/스터디 인원을 모집해보세요</SubInnerSubTitle>
                            <InnerBtnWrapper>
                                <Button
                                    variant="contained"
                                    size="large"
                                    style={{
                                        width: '200px',
                                        height: '70px',
                                        fontSize: '1.5rem',
                                        borderRadius: '15px',
                                    }}
                                    onClick={() => {
                                        navigate('/recruitment/post');
                                    }}
                                >
                                    작성하기
                                </Button>
                            </InnerBtnWrapper>
                            <SubInnerImg
                                style={{
                                    backgroundImage: `url(${recruitmentPostImg})`,
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                }}
                            ></SubInnerImg>
                        </SubInnerBox>
                    </Inner>
                </Paper>
            </Carousel>
        </Outer>
    );
};

const Dot = ({ num, scrollIndex }: { num: number; scrollIndex: number }) => {
    return (
        <div
            style={{
                width: 10,
                height: 10,
                border: '1px solid #fff',
                borderRadius: 999,
                backgroundColor: '#fff',
                transform: `scale(${scrollIndex == num ? 1 : 0.5})`,
                transition: 'all 0.5s',
            }}
        ></div>
    );
};

const Dots = ({ scrollIndex }: { scrollIndex: number }) => {
    return (
        <div style={{ position: 'fixed', zIndex: '3', top: '50%', right: 50, transform: 'translate(-50%, -50%)' }}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: 20,
                    height: 100,
                }}
            >
                <Dot num={1} scrollIndex={scrollIndex}></Dot>
                <Dot num={2} scrollIndex={scrollIndex}></Dot>
                <Dot num={3} scrollIndex={scrollIndex}></Dot>
            </div>
        </div>
    );
};

export default Home;
