import { aboutwiki } from 'constants/aboutwiki';
import styled from 'styled-components';
import { media } from 'styles/media';

function AboutText() {
  return (
    <>
      <StyledAboutBox>
        {aboutwiki.map((item) => (
          <StyledAboutTexts key={item.id}>{item.about}</StyledAboutTexts>
        ))}
      </StyledAboutBox>
    </>
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

export default AboutText;
