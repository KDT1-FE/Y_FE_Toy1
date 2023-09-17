import React from 'react';
import Lottie, { Options } from 'react-lottie';
import styled, { css } from 'styled-components';

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

// 메인 컴포넌트 구성 완료시 반응형 확인하기 위한 코드 부분(주척 처리 부분 포함)

const media = {
  desktop: (styles: string) => css`
    @media only screen and (max-width: 1024px) {
      ${styles}
    }
  `,
  tablet: (styles: string) => css`
    @media only screen and (min-width: 576px) and (max-width: 767px) {
      ${styles}
    }
  `,
  mobile: (styles: string) => css`
    @media only screen and (max-width: 575px) {
      ${styles}
    }
  `,
};

const StyledLottieContainer = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
  /* ${media.desktop(`
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
