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

import galleryBg from '../../common/MainImg/galleryBg.jpg';
import galleryImg from '../../common/MainImg/galleryImg.png';
import recruitmentImg from '../../common/MainImg/recruitmentImg.png';
import recruitmentBg from '../../common/MainImg/recruitmentBg.jpg';

const Home: React.FC = () => {
    return (
        <HomeContainer>
            <Carousel
                navButtonsAlwaysVisible={true}
                fullHeightHover={false}
                animation="slide"
                duration={300}
                indicators={false}
                autoPlay={false}
            >
                <Paper>
                    <GalleryContainer>
                        <GalleryWrapper>
                            <GalleryTitle>
                                About <span style={{ color: 'green' }}>GALLERY</span>
                            </GalleryTitle>
                            <GallerySubTitle>Page for Fastcampus x Yanolja bootcamp</GallerySubTitle>
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
                            <RecruitmentSubTitle>Page for Fastcampus x Yanolja bootcamp</RecruitmentSubTitle>
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
