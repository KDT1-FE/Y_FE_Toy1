import batteryLottie from 'assets/lottieJSON/battery.json';
import Carousel from 'components/Carousel';
import MainLottie from 'components/Common/MainLottie';
import CommuteList from 'components/CommuteList';
import AboutText from 'components/Section/aboutText';
import MainNotice from 'components/Section/mainNotice';
import MainAbout from 'components/Section/mainAbout';
import MainWorkTime from 'components/Section/mainWorkTime';
import { media } from 'styles/media';
import styled from 'styled-components';

function Main() {
  return (
    <>
      <StyledNoticeContainer>
        <MainNotice />
        <Carousel />
      </StyledNoticeContainer>
      <StyledAboutContainer>
        <MainAbout />
        <AboutText />
      </StyledAboutContainer>
      <StyledBottomWrapper>
        <MainWorkTime />
        <StyledHrLine />
        <div>
          <CommuteList />
        </div>
      </StyledBottomWrapper>
      <MainLottie lottieData={batteryLottie} width={200} height={200} />
    </>
  );
}

const StyledNoticeContainer = styled.div`
  width: 100rem;
  height: 30rem;

  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 6rem;

  ${media.desktop_lg(`
  max-width: 100%;
  padding: 0 1rem;
  margin-top: 3rem;
  height: 100%
`)}
`;

const StyledAboutContainer = styled.div`
  width: 60rem;
  height: 30rem;

  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 14rem;

  ${media.tablet(`
    max-width: 100%;
    padding: 0 1rem;
    margin-top: 3rem;
    height: 100%;
  `)}
`;

const StyledBottomWrapper = styled.div`
  width: 60rem;
  margin: 0 auto;

  ${media.tablet(`
    max-width: 100%;
    padding: 0 1rem;
    margin-top: 3rem;
    height: 100%;
  `)}
`;

const StyledHrLine = styled.hr`
  width: 90%;
  border: 1px solid #c4c4c4;
  margin: 0 auto;
  margin-top: 2rem;

  ${media.tablet(`
  margin-top: 1rem;
`)}
`;

export default Main;
