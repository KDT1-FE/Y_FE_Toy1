import React from 'react';
import Lottie, { Options } from 'react-lottie';
import styled from 'styled-components';
import { media } from 'styles/media';

interface IMainLottieProps {
  lottieData: object;
  width?: number;
  height?: number;
}

function MainLottie({ lottieData, width, height }: IMainLottieProps) {
  const defaultOption: Options = {
    animationData: lottieData,
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <StyledLottieContainer>
      <Lottie
        options={defaultOption}
        width={width}
        height={height}
        isClickToPauseDisabled
      />
    </StyledLottieContainer>
  );
}

const StyledLottieContainer = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
  /* ${media.desktop_lg(`
    min-width: 1024px;
    display: none;
  `)}

  ${media.tablet(`
    min-width: 768px;
    display: none;
  `)}

  ${media.mobile(`
    min-width: 576px;
    display: none;
  `)} */
`;

export default MainLottie;
