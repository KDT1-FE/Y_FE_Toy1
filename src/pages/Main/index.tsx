// import Lottie from 'lottie-react';
import batteryLottie from 'assets/lottieJSON/battery.json';
import About from 'components/About';
import Carousel from 'components/Carousel';
import MainLottie from 'components/Common/MainLottie';
import CommuteList from 'components/CommuteList';
import styled from 'styled-components';

function Main() {
  return (
    <>
      <StyledNoticeContainer>
        <StyledTitleTextBox>
          <StyledTitleText>Notice</StyledTitleText>
          <StyledTitleSeeText>Wiki 공지사항 한눈에 보기</StyledTitleSeeText>
        </StyledTitleTextBox>
        <StyledCarouselBox>
          <Carousel />
        </StyledCarouselBox>
      </StyledNoticeContainer>
      <StyledAboutContainer>
        <StyledTitleTextBox>
          <StyledTitleText>About</StyledTitleText>
          <StyledTitleSeeText>Wiki 소개</StyledTitleSeeText>
        </StyledTitleTextBox>
        <About />
      </StyledAboutContainer>
      <StyledBottomWrapper>
        <StyledTitleTextBox>
          <StyledWorkTimeText>업무 기록</StyledWorkTimeText>
          <StyledWorkTimeSmallText>업무 시간기록</StyledWorkTimeSmallText>
        </StyledTitleTextBox>
        <StyledHrLine />
        {/* 이제 여기에 통근시간리스트 컴포넌트 부분 개발 */}
        <div>
          <CommuteList />
        </div>
        <MainLottie lottieData={batteryLottie} width={500} height={500} />
      </StyledBottomWrapper>
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
`;

const StyledTitleTextBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const StyledTitleText = styled.span`
  font-size: 3rem;
  font-weight: 500;
`;

const StyledTitleSeeText = styled.span`
  font-size: 1rem;
  font-weight: 400;
  margin-left: 1rem;
  margin-bottom: 0.5rem;
`;

const StyledCarouselBox = styled.div`
  display: flex;
  justify-content: center;
  width: auto;
  background: none;
  margin-top: 2rem;
`;

const StyledAboutContainer = styled.div`
  width: 60rem;
  height: 30rem;

  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 6rem;
`;

const StyledBottomWrapper = styled.div`
  width: 60rem;
  margin: 0 auto;
`;

const StyledWorkTimeText = styled.span`
  font-size: 2rem;
  font-weight: 500;
  margin-left: 1rem;
`;

const StyledWorkTimeSmallText = styled.span`
  font-size: 0.8rem;
  font-weight: 400;
  margin-left: 1rem;
  margin-bottom: 0.5rem;
`;

const StyledHrLine = styled.hr`
  width: 90%;
  border: 1px solid #c4c4c4;
  margin: 0 auto;
  margin-top: 2rem;
`;

export default Main;
