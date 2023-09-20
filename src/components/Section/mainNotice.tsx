import { MAIN_NOTICE_TITLE, MAIN_NOTICE_SUBTITLE } from 'constants/maintext';
import styled from 'styled-components';
import { media } from 'styles/media';

function MainNotice() {
  return (
    <>
      <StyledTitleTextBox>
        <StyledTitleText>{MAIN_NOTICE_TITLE}</StyledTitleText>
        <StyledTitleSeeText>{MAIN_NOTICE_SUBTITLE}</StyledTitleSeeText>
      </StyledTitleTextBox>
    </>
  );
}

const StyledTitleTextBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const StyledTitleText = styled.span`
  font-size: 3rem;
  font-weight: 500;

  ${media.tablet(`
  display: none;
`)}
`;

const StyledTitleSeeText = styled.span`
  font-size: 1rem;
  font-weight: 400;
  margin-left: 1rem;
  margin-bottom: 0.5rem;

  ${media.tablet(`
  font-size: .8rem
`)}
`;

export default MainNotice;
