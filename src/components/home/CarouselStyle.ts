import styled from "styled-components";
import carouselData from '../../db/wiki/CarouselData';

interface CarouselContainerProps {
  carouselWidth: number;
  currentIndex: number;
}

interface CarouselContentProps {
  pageIndex: number;
  carouselWidth: number;
}

export const CarouselWrapper = styled.div`
  width: 100%;
  display: inline-block;
  height: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  border: 1px solid var(--color-main);
`;

export const CarouselContainer = styled.div<CarouselContainerProps>`
  height: 100%;
  width: ${({ carouselWidth }) => `${carouselWidth * 4}px`};
  display: flex;
  overflow: hidden;
  transform: ${({ currentIndex, carouselWidth }) => `translateX(${-currentIndex * carouselWidth}px)`};
  transition: 0.5s ease-in-out;
  border-radius: 5px;
`;

export const CarouselTitle = styled.a`
  position: absolute;
  display: inline-block;
  top: 16rem;
  left: 6rem;
  z-index: 2;
  font-size: 1.5rem;
  color: var(--color-white);
  cursor: pointer;
`;

export const CarouselText = styled.a`
  position: absolute;
  display: inline-block;
  top: 20rem;
  left: 5rem;
  z-index: 2;
  font-size: 1rem;
  color: var(--color-white);
  cursor: pointer;
`;

export const CarouselContent = styled.div<CarouselContentProps>`
  background-image: ${({pageIndex}) => `url(${carouselData[pageIndex].url})`};
  height: 100%;
  width: ${({ carouselWidth }) => `${carouselWidth}px`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 10px;
  position: relative;
`;

export const CarouselLeftBackDrop = styled.div`
  width: 60%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  left: 0;
  top: 0;
  position: absolute;
  z-index: 2;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

export const CarouselRightButton = styled.span`
  position: absolute;
  z-index: 3;
  right: 10px;
  top: 50%;
  transform: translate(0, -50%);
  font-size: 2.3rem;
  color: var(--color-white);
  cursor: pointer;
`;

export const CarouselLeftButton = styled.span`
  position: absolute;
  z-index: 3;
  left: 10px;
  top: 50%;
  transform: translate(0, -50%);
  font-size: 2.3rem;
  color: var(--color-white);
  cursor: pointer;
`;

export const CarouselDotContainer = styled.div`
  display: flex;
  justify-self: center;
  align-items: center;
  text-align: center;
  position: absolute;
  bottom: 1.5rem;
  gap: .8rem;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 4;
`;

export const CarouselDot = styled.div`
  width: 2rem;
  height: .6rem;
  border-radius: 5px;
  transition: .3s;
  background-color: var(--color-white);
  opacity: .7;
  cursor: pointer; 
  &:hover {
    transform: scaleX(1.5);
    margin: 0 .5rem;
    border-radius: 4px;
    opacity: 1;
  }
`;
  
export const CarouselPageButton = styled.a`
  display: inline-block;
  width: 8rem;
  height: 1.5rem;
  position: absolute;
  top: 28rem;
  left: 5rem;
  z-index: 5;
  text-align: center;
  vertical-align: center;
  padding: 0.5rem;
  border-radius: 5px;
  color: var(--color-white);
  cursor: pointer;
  background-color: var(--color-main);
`;