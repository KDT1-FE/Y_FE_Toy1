import About from 'components/About';
import Carousel from 'components/Carousel';
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

export default Main;
