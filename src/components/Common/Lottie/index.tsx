import Lottie, { Options } from 'react-lottie';
import styled from 'styled-components';

interface ILottieWrapper {
  lottieData: object;
}

function LottieWrapper({ lottieData }: ILottieWrapper) {
  const lottieOptions: Options = {
    animationData: lottieData,
    loop: true,
    autoplay: true,
  };

  return (
    <StyledWrapper>
      <Lottie options={lottieOptions} isClickToPauseDisabled />
    </StyledWrapper>
  );
}

export default LottieWrapper;

const StyledWrapper = styled.div`
  width: 100%;
`;
