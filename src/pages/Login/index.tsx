import styled from 'styled-components';
import loginIcon from '../../assets/icons/loginIcon.svg';
import googleIcon from '../../assets/icons/googleIcons.svg';
import { useNavigate } from 'react-router-dom';
import { login } from 'apis';
import { media } from 'styles/media';
import { ROUTES } from 'constants/routes';

function Login() {
  const navigate = useNavigate();
  const handleGoogleLogin = async () => {
    await login();
    navigate(ROUTES.MAIN);
  };
  return (
    <StyledSection>
      <StyledContainer>
        <StyledIconImage src={loginIcon} alt="로그인 아이콘" />
        로그인 후 WIKI 서비스를 <br />
        사용하실 수 있습니다
      </StyledContainer>
      <StyledMobileContainer>
        로그인 후 WIKI 서비스를 <br />
        사용하실 수 있습니다
      </StyledMobileContainer>
      <StyledLoginContainer>
        <StyledMainText>WIKI</StyledMainText>
        로그인 하기
        <StyledLoginButton onClick={handleGoogleLogin}>
          <StyledGoogleLogo src={googleIcon} />
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
  ${media.desktop_2xl(`
    gap: 23rem;
  `)}
  ${media.desktop_xl(`
    gap: 17rem;
  `)}
  ${media.desktop_lg(`
  gap: 13rem;
  `)}
  ${media.tablet(`
  gap: 7rem;
  `)}
${media.mobile(`
    gap: 2rem;
    width:100vw;
    height:100vh;
    justify-content:center;
    flex-direction:column;
`)}
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

  ${media.desktop_xl(`
  font-size: 2rem;
`)}
  ${media.desktop_lg(`
font-size: 1.6rem;
`)}
${media.tablet(`
font-size: 1.3rem;
`)}
${media.mobile(`
display:none;
`)}
`;

const StyledIconImage = styled.img`
  margin: 0 0 1rem 3rem;
  ${media.tablet(`
  display:none;
`)}
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
  ${media.desktop_lg(`
  width: 20rem;
  height: 20rem;

  gap: 1rem;
  `)}
  ${media.mobile(`
`)}
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

  ${media.desktop_lg(`
  width:18px;
  height:18px;
  `)}
`;

const StyledMobileContainer = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  display: none;

  ${media.mobile(`
    display:block;
  `)}
`;
export default Login;
