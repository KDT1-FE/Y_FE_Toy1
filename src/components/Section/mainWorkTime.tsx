import {
  MAIN_WORKTIME_TITLE,
  MAIN_WORKTIME_SUBTITLE,
} from 'constants/maintext';
import styled from 'styled-components';
import { media } from 'styles/media';

function MainWorkTime() {
  return (
    <>
      <StyledTitleTextBox>
        <StyledWorkTimeText>{MAIN_WORKTIME_TITLE}</StyledWorkTimeText>
        <StyledWorkTimeSmallText>
          {MAIN_WORKTIME_SUBTITLE}
        </StyledWorkTimeSmallText>
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

const StyledWorkTimeText = styled.span`
  font-size: 2rem;
  font-weight: 500;
  margin-left: 1rem;

  ${media.tablet(`
  display: none;
`)}

  ${media.desktop_lg(`
  margin-left: 1rem;
`)}
`;

const StyledWorkTimeSmallText = styled.span`
  font-size: 0.8rem;
  font-weight: 400;
  margin-left: 1rem;
  margin-bottom: 0.5rem;

  ${media.tablet(`
  font-size: 1rem;
  font-weight: 600;
`)}
`;

export default MainWorkTime;
