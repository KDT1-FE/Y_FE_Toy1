import styled from 'styled-components';
import loginIcon from '../../assets/icons/loginIcon.svg';
import googleIcon from '../../assets/icons/googleIcons.svg';

function Login() {
  return (
    <StyledSection>
      <StyledContainer>
        <StyledIconImage src={loginIcon} alt="login icon" />
        로그인 후 WIKI 서비스를 <br />
        사용하실 수 있습니다
      </StyledContainer>
      <StyledLoginContainer>
        <StyledMainText>WIKI</StyledMainText>
        로그인 하기
        <StyledLoginButton>
          <StyledGoogleLogo src={googleIcon} alt="google logo" />
          Google로 간편 로그인
        </StyledLoginButton>
      </StyledLoginContainer>
    </StyledSection>
  );
}

const StyledSection = styled.section`
  display: flex;
  align-items: center;
  gap: 27rem;
`;
const StyledContainer = styled.div`
  background-color: #e2e8f0;
  width: 30vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  font-size: 2.25rem;
  font-weight: 700;
`;

const StyledIconImage = styled.img`
  margin: 0 0 1rem 3rem;
`;

const StyledLoginContainer = styled.div`
  width: 23.1rem;
  height: 23.5rem;

  border: 1px solid #c1c8cf;
  border-radius: 1rem;
  padding: 2.7rem 1.9rem 4.4rem 1.9rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  font-size: 1.5rem;
  font-weight: 500;
`;

const StyledMainText = styled.div`
  font-weight: 700;
  font-size: 4rem;
  color: #3584f4;
`;

const StyledLoginButton = styled.button`
  width: 16.4rem;
  height: 2.8rem;

  font-size: 1rem;
  font-weight: 500;

  margin-top: 1.4rem;
  border: 1px solid #d9d9d9;
  border-radius: 0.3rem;

  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;

const StyledGoogleLogo = styled.img`
  width: 20px;
  height: 20px;
`;
export default Login;
