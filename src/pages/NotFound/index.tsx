import lottie404 from 'assets/lottieJSON/lottie404.json';
import LottieWrapper from 'components/Common/Lottie';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function NotFound() {
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const navigateHome = () => {
    navigate('/');
  };
  return (
    <>
      <Styled404Container>
        <LottieWrapper lottieData={lottie404} />
        <div>
          {showAlert && (
            <StyledAlertContainer>
              <StyledAlertButton onClick={navigateHome}>
                홈으로 돌아가기
              </StyledAlertButton>
            </StyledAlertContainer>
          )}
        </div>
      </Styled404Container>
    </>
  );
}

const Styled404Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

const StyledAlertContainer = styled.div`
  width: 100%;
  height: 10%;

  z-index: 999;

  position: absolute;
  top: 11%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: #ffffff;
  border-radius: 8px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledAlertButton = styled.button`
  background-color: #292929;
  color: #fff;

  font-size: 1.25rem;
  font-weight: 600;

  width: 9.3rem;
  height: 2.4rem;
  border: none;
  border-radius: 0.375rem;

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
