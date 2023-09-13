import Carousel from 'components/Carousel';
import styled from 'styled-components';

function Main() {
  return (
    <StyledNoticeContainer>
      <StyledNoticeTextBox>
        <StyledNoticeText>Notice</StyledNoticeText>
        <StyledNoticeSeeText>Wiki 공지사항 한눈에 보기</StyledNoticeSeeText>
      </StyledNoticeTextBox>
      <StyledCarouselBox>
        <Carousel />
      </StyledCarouselBox>
    </StyledNoticeContainer>
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

const StyledNoticeTextBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const StyledNoticeText = styled.span`
  font-size: 3rem;
  font-weight: 500;
`;

const StyledNoticeSeeText = styled.span`
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

export default Main;
