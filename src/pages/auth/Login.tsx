import { useState, ChangeEvent } from 'react';
import { auth } from '../../common/config';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useUser } from '../../common/UserContext';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { SubPageContainer } from '../../utils/CommonDesign';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { updateUser } = useUser(); // UserContext에서 updateUser 함수 불러오기

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onAuthStateChanged(auth, (authUser) => {
        if (authUser) {
          const user = {
            name: authUser.displayName || '',
            uid: authUser.uid,
            email: authUser.email || '',
            photoUrl: authUser.photoURL || '',
            phone: authUser.phoneNumber || '',
            emailVerified: authUser.emailVerified,
          };
          updateUser(user);
        }
      });
      window.location.href = '/';
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  };

  return (
    <SubPageContainer>
      <CategoryTitleSection>
        <CategoryTitle>로그인</CategoryTitle>
        <BreadCrumb>회원인증 &gt; 로그인</BreadCrumb>
      </CategoryTitleSection>
      <AuthForm onSubmit={handleLogin}>
        <LoginSection>
          <InputContainer>
            <label>이메일</label>
            <input
              required
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="이메일을 입력해주세요."
            />
          </InputContainer>
          <InputContainer>
            <label>비밀번호</label>
            <input
              required
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="비밀번호를 입력해주세요."
            />
          </InputContainer>
          <ButtonContainer>
            <button type="submit">로그인</button>
          </ButtonContainer>
        </LoginSection>
        <JoinSection>
          <JoinContainer>
            <label>회원이 아니신가요?</label>
            <Link to="/login/join">회원가입</Link>
          </JoinContainer>
        </JoinSection>
      </AuthForm>
    </SubPageContainer>
  );
};

const AuthForm = styled.form`
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  gap: 10px;

  @media screen and (max-width: 1150px) {
    flex-direction: column;
    margin-bottom: 20px;

    div {
      width: 100%;
    }
  }
`;

const LoginSection = styled.div`
  width: 45%;
`;
const JoinSection = styled.div`
  width: 45%;
`;
const CategoryTitleSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 700px) {
    display: block;
    h1 {
      font-size: 25px;
    }
  }
`;
const CategoryTitle = styled.h1`
  font-size: 28px;
`;
const BreadCrumb = styled.span`
  font-size: 12px;
  text-align: right;
  color: gray;
`;
const InputContainer = styled.div`
  label {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 30px;
  }

  input {
    font-family: 'Noto Sans KR';
    margin-top: 10px;
    width: 100%;
    padding: 10px;
    outline: none;
    border-radius: 4px;
    border: 1px solid #ddd;
    margin-bottom: 20px;
  }
`;
const ButtonContainer = styled.div`
  button {
    font-family: 'Noto Sans KR';
    width: 100%;
    cursor: pointer;
    height: 47px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    color: rgb(255, 255, 255);
    text-align: center;
    line-height: 47px;
    background-color: rgb(50, 103, 177);
  }
`;

const JoinContainer = styled.div`
  padding-top: 20px;

  label {
    font-size: 16px;
    font-weight: bold;
  }
  a {
    margin-top: 10px;
    display: block;
    font-family: 'Noto Sans KR';
    width: 100%;
    cursor: pointer;
    height: 47px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    color: rgb(255, 255, 255);
    text-align: center;
    line-height: 47px;
    background-color: #333;
  }
`;

export default Login;
