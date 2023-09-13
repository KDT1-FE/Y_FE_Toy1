import React from 'react';
import {
    HomeContainer,
    CarouselContainer,
    ContentTitle,
    CarouselWrapper,
    AboutContainer,
    AboutImg,
    AboutWrapper,
    AboutTitle,
    AboutSubTitle,
    AboutUs,
} from './style';
import Slider from '../../components/Slider';
import fastcampusImg from '../../common/mainImg/fastcampus.png';

const Home: React.FC = () => {
    return (
        <HomeContainer>
            <AboutContainer>
                <AboutWrapper>
                    <AboutUs>About us</AboutUs>
                    <AboutTitle>
                        WIKI FOR <span style={{ color: 'red' }}>FASTCAMPUS</span>
                    </AboutTitle>
                    <AboutSubTitle>Page for Fastcampus x Yanolja bootcamp</AboutSubTitle>
                </AboutWrapper>
                <AboutImg src={fastcampusImg} />
            </AboutContainer>
            <CarouselContainer>
                <ContentTitle>Carousel</ContentTitle>
                <CarouselWrapper>
                    <Slider></Slider>
                </CarouselWrapper>
            </CarouselContainer>
        </HomeContainer>
    );
};

export default Home;
