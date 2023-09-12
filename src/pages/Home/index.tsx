import React from 'react';
import { HomeContainer, CarouselContainer, ContentTitle, CarouselWrapper } from './style';
import Slider from '../../components/Slider';

const Home: React.FC = () => {
    return (
        <HomeContainer>
            <CarouselContainer>
                <ContentTitle>Carousel</ContentTitle>
                <CarouselWrapper></CarouselWrapper>
            </CarouselContainer>
        </HomeContainer>
    );
};

export default Home;
