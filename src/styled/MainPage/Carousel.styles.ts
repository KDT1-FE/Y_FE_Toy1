import Slider from 'react-slick';
import styled from 'styled-components';

type ArrowButtonProps = {
  direction: string;
};

export const StyledSlider = styled(Slider)`
  .slick-dots {
    bottom: 0;

    li {
      button::before {
        color: #96a0ff;
      }
    }
  }
`;

export const Slide = styled.div`
  height: 300px;
  display: flex !important;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  outline: none;
  position: relative;
  cursor: pointer;
`;

export const SlideImage = styled.img`
  display: inline-block;

  height: 100%;
`;

export const SliderWrapper = styled.div`
  max-width: 1200px;
  height: 300px;
  margin: 50px auto;
  position: relative;
`;

export const ArrowButton = styled.button<ArrowButtonProps>`
  position: absolute;
  top: 50%;
  ${(props) => (props.direction === 'prev' ? 'left: 0;' : 'right: 0;')}
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 1.5rem;
  color: #fff;
  z-index: 10;
  cursor: pointer;
  transform: translateY(-50%) rotate(${(props) => (props.direction === 'prev' ? '90deg' : '-90deg')});
`;
