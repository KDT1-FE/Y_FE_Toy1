import lottie404 from 'assets/lottieJSON/lottie404.json';
import LottieWrapper from 'components/Common/Lottie';
import { ROUTES } from 'constants/routes';
import { Link } from 'react-router-dom';
import { media } from 'styles/media';
import styled from 'styled-components';

function NotFound() {
  return (
    <>
      <Styled404Container>
        <LottieWrapper lottieData={lottie404} />
        <StyledAlertContainer>
          <StyledAlertLink to={ROUTES.MAIN}>홈으로 돌아가기</StyledAlertLink>
        </StyledAlertContainer>
      </Styled404Container>
    </>
  );
}

const Styled404Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;

  ${media.tablet(`
  padding: 20px;
  `)}
`;

const StyledAlertContainer = styled.div`
  width: 100%;
  height: 10%;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 11%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;

  background-color: #ffffff;
  border-radius: 8px;

  ${media.tablet(`
  width: 90%;
  left: 5%;
  top: auto;
  bottom: 5%;
  transform: none;

`)}
`;

const StyledAlertLink = styled(Link)`
  background-color: #292929;
  color: #fff;

  font-size: 1.25rem;
  font-weight: 600;

  width: 10rem;
  height: 3rem;
  border: none;
  border-radius: 0.375rem;
  padding: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: #1b64da;
    transition: all 0.5s;
  }
`;

export default NotFound;
