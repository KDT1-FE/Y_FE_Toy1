import React from 'react';
import Slider from 'react-slick';
import { media } from 'styles/media';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { carouseltext } from 'constants/carouseltext';

function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
    initialSlide: 1,
  };

  return (
    <StyledCarouselBox>
      <StyledWrapper>
        <StyledCarousel {...settings}>
          {carouseltext.map((item) => (
            <StyledItem key={item.id}>
              <StyledImg>
                <StyledTitle1>{item.title1}</StyledTitle1>
                <StyledTitle2>{item.title2}</StyledTitle2>
                <img
                  src={item.src}
                  alt="carousel Image"
                  width={1600}
                  height={420}
                />
              </StyledImg>
            </StyledItem>
          ))}
        </StyledCarousel>
      </StyledWrapper>
    </StyledCarouselBox>
  );
}

const StyledCarouselBox = styled.div`
  display: flex;
  justify-content: center;
  width: auto;
  background: none;
  margin-top: 2rem;
`;

const StyledWrapper = styled.div`
  position: relative;
  width: 100%;
  height: auto;
`;

const StyledCarousel = styled(Slider)`
  .slick-list {
    width: 100%;
    margin: 0 auto;
    max-width: 100%;
  }
  .slick-slide div {
    cursor: pointer;
  }
  .slick-dots {
    bottom: -2.2rem;
  }
  .slick-dots li button:before {
    color: blue;
  }
  ${media.tablet(`
    .slick-slide div{
      max-width: 100%
    }
  `)}
`;

const StyledItem = styled.div`
  position: relative;
  border-radius: 24px;
  background: none;
  box-shadow: 0px 3px 7px 5px rgba(0, 0, 0, 0.1);
`;

const StyledImg = styled.div`
  width: auto;
  height: auto;
  position: relative;
  object-fit: cover;

  border-radius: 26px;
  overflow: hidden;

  img {
    max-width: 100%;
    height: auto;
  }
`;

const StyledTitle1 = styled.span`
  position: absolute;
  top: 0;
  padding: 3rem;

  font-size: 2.25rem;
  font-weight: 600;
  color: white;

  ${media.tablet(`
  font-size: 1rem
`)}
`;

const StyledTitle2 = styled.span`
  position: absolute;
  top: 0;
  padding: 7rem 3rem 0rem 3rem;

  font-size: 2.25rem;
  font-weight: 600;
  color: white;

  ${media.tablet(`
  padding: 4.8rem 3.4rem;
  font-size: .4rem
`)}
`;

export default Carousel;
