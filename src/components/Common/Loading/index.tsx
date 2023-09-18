import loadingLottie from 'assets/lottieJSON/loading.json';
import LottieWrapper from 'components/Common/LoadingLottieContainer';
import styled from 'styled-components';

function Loading() {
  return (
    <>
      <StyledWrapper>
        <LottieWrapper lottieData={loadingLottie} />
      </StyledWrapper>
    </>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
`;

export default Loading;
