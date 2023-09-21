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
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
`;

export const CarouselContainer = styled.div<CarouselContainerProps>`
  height: 100%;
  width: ${({ carouselWidth }) => `${carouselWidth * 5}px`};
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
  font-size: 1.8rem;
  font-weight: 500;
  color: var(--color-main);
  cursor: pointer;
`;

export const CarouselText = styled.a`
  position: absolute;
  display: inline-block;
  width: 35%;
  top: 20rem;
  left: 5rem;
  z-index: 2;
  font-size: 1rem;
  color: var(--color-black);
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
  width: 43%;
  height: 27%;
  background-color: rgba(255, 255, 255, 0.3);
  left: .5rem;
  top: 14.6rem;
  position: absolute;
  z-index: 2;
  border-radius: 20px;
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
  color: var(--color-main);
  cursor: pointer;
`;

export const CarouselLeftButton = styled.span`
  position: absolute;
  z-index: 3;
  left: 10px;
  top: 50%;
  transform: translate(0, -50%);
  font-size: 2.3rem;
  color: var(--color-main);
  cursor: pointer;
`;

export const CarouselDotContainer = styled.div`
  display: flex;
  justify-self: center;
  align-items: center;
  text-align: center;
  position: absolute;
  bottom: 1.5rem;
  gap: .6rem;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 4;
`;

export const CarouselDot = styled.div`
  width: 1.7rem;
  height: .6rem;
  border-radius: 5px;
  transition: .3s;
  background-color: var(--color-main);
  cursor: pointer; 
  &:hover {
    transform: scaleX(1.5);
    margin: 0 .5rem;
    border-radius: 4px;
  }
`;
  
export const CarouselPageButton = styled.a`
  display: inline-block;
  width: 8rem;
  height: 1.5rem;
  position: absolute;
  top: 28rem;
  left: 6rem;
  z-index: 5;
  text-align: center;
  vertical-align: center;
  padding: 0.5rem;
  border-radius: 5px;
  color: var(--color-white);
  cursor: pointer;
  background-color: var(--color-main);
`;