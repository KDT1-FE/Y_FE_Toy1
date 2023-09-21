import React from 'react';
import {
    HomeContainer,
    AboutImg,
    AboutWrapper,
    AboutTitle,
    AboutSubTitle,
    AboutUs,
    AboutContent,
    AboutContainer,
    GalleryContainer,
    GalleryWrapper,
    GalleryUs,
    GalleryTitle,
    GallerySubTitle,
    GalleryContent,
    GalleryImg,
    RecruitmentContainer,
    RecruitmentWrapper,
    RecruitmentTitle,
    RecruitmentSubTitle,
    RecruitmentContent,
    RecruitmentImg,
    GalleryBgImg,
} from './style';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';

import Footer from '../../common/Footer';
import { url } from 'inspector';
// import wikidemo from '../../common/MainImg/wiki_demo.mp4';
import galleryBg from '../../common/MainImg/galleryBg.jpg';
import galleryImg from '../../common/MainImg/galleryImg.png';
import recruitmentImg from '../../common/MainImg/recruitmentImg.png';
import recruitmentBg from '../../common/MainImg/recruitmentBg.jpg';
import logoImg from '../../common/MainImg/fastusLogo.png';

const Home: React.FC = () => {
    return (
        <HomeContainer>
            <Carousel
                navButtonsAlwaysVisible={true}
                fullHeightHover={false}
                animation="slide"
                duration={300}
                indicators={false}
                autoPlay={true}
            >
                <Paper>
                    <GalleryContainer>
                        <GalleryWrapper>
                            <GalleryTitle>
                                About <span style={{ color: 'red' }}>FASTUS</span>
                            </GalleryTitle>
                            <GallerySubTitle>Study Smarter, Not Harder</GallerySubTitle>
                            <GalleryContent>
                                취준생들이 필요한 정보를 한번에! 취업 공고, <br /> 정보 교환, 회사 정보를 찾느라 시간
                                낭비하지 <br /> 말고 패스터디에서 빠르게 받아보세요!
                                <br /> 등록, 수정, 삭제하며 관리해보세요.
                            </GalleryContent>
                        </GalleryWrapper>
                        <div>
                            {/* <p>FASTUS</p> */}
                            <GalleryImg src={logoImg} />
                        </div>
                        <GalleryBgImg src={galleryBg} />
                    </GalleryContainer>
                </Paper>
                <Paper>
                    <GalleryContainer>
                        <GalleryWrapper>
                            <GalleryTitle>
                                About <span style={{ color: 'blue' }}>WIKI</span>
                            </GalleryTitle>
                            <GallerySubTitle>많은 정보를 한눈에!</GallerySubTitle>
                            <GalleryContent>
                                위키 페이지에서 채널을 관리하고 상세 <br />
                                페이지를 등록해보세요!
                            </GalleryContent>
                        </GalleryWrapper>
                        <div>
                            <GalleryImg src={galleryImg} />
                        </div>
                        <GalleryBgImg src={galleryBg} />
                    </GalleryContainer>
                </Paper>
                <Paper>
                    <GalleryContainer>
                        <GalleryWrapper>
                            <GalleryTitle>
                                About <span style={{ color: 'green' }}>GALLERY</span>
                            </GalleryTitle>
                            <GallerySubTitle>우리만의 만남의 광장!</GallerySubTitle>
                            <GalleryContent>
                                프로필 뿐만 아니라 다양한 레퍼런스를
                                <br /> 등록, 수정, 삭제하며 관리해보세요.
                            </GalleryContent>
                        </GalleryWrapper>
                        <div>
                            <GalleryImg src={galleryImg} />
                        </div>
                        <GalleryBgImg src={galleryBg} />
                    </GalleryContainer>
                </Paper>
                <Paper>
                    <RecruitmentContainer>
                        <RecruitmentWrapper>
                            <RecruitmentTitle>
                                About <span style={{ color: 'purple' }}>RECRUITMENT</span>
                            </RecruitmentTitle>
                            <RecruitmentSubTitle>취업 정보도 손쉽게</RecruitmentSubTitle>
                            <RecruitmentContent>
                                게시글을 작성하여 모임을 생성 및 가입해보세요!
                                <br /> 카테고리 별로 정리할 수 있어서 한눈에 보기 좋습니다.
                            </RecruitmentContent>
                        </RecruitmentWrapper>
                        <div>
                            <RecruitmentImg src={recruitmentImg} />
                        </div>
                        <GalleryBgImg src={recruitmentBg} />
                    </RecruitmentContainer>
                </Paper>
            </Carousel>
            <Footer />
        </HomeContainer>
    );
};

export default Home;
