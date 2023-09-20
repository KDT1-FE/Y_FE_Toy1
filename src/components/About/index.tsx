import { media } from 'styles/media';
import styled from 'styled-components';

function About() {
  return (
    <StyledAboutBox>
      <StyledAboutTexts>
        이 웹사이트는 직원들을 위한 Wiki 사이트 입니다.
      </StyledAboutTexts>
      <StyledAboutTexts>
        직원들이 직접 업무 일지를 작성하고, 공유할 수 있습니다.
      </StyledAboutTexts>
      <StyledAboutTexts>
        또한, 갤러리를 활용하여 사진을 공유하고 확인할 수 있습니다.
      </StyledAboutTexts>
      <StyledAboutTexts>
        스톱워치를 활용하여, 자신의 근무 시간 및 일정을 조절할 수 있습니다.
      </StyledAboutTexts>
    </StyledAboutBox>
  );
}

const StyledAboutBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  background-color: #eeeeee;

  border: 1px solid #dbe3f1;
  border-radius: 0 40px 40px 40px;
`;

const StyledAboutTexts = styled.div`
  font-size: 1rem;
  font-weight: 500;
  margin: 1.5rem 0 1.5rem 3rem;

  ${media.tablet(`
  font-size: .7rem;
  margin: 1rem;
`)}
`;

export default About;
