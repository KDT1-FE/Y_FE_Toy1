import { User } from 'firebase/auth';
import { auth, db } from '../common/config';
import { useState, ChangeEvent } from 'react';
import { updatePhoneNumber, RecaptchaVerifier, PhoneAuthProvider } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

const JoinPhoneNumber = ({ user }: { user: User | null }) => {
  const [phone, setPhone] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };
  const location = window.location.pathname;

  const addPhoneNumber = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (user) {
      if (phone) {
        const appVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'normal',
          callback: (recaptchaToken: string) => {
            // Callback 로직
            const phoneNumber = `+82${phone?.substring(1)}`;
            const provider = new PhoneAuthProvider(auth);
            provider
              .verifyPhoneNumber(phoneNumber, appVerifier)
              .then((verificationId) => {
                const code = window.prompt('인증 코드를 입력하세요:');
                if (code) {
                  const credential = PhoneAuthProvider.credential(verificationId, code);
                  setIsLoading(true);
                  updatePhoneNumber(user, credential)
                    .then(async () => {
                      appVerifier.clear();
                      const docRef = doc(db, 'user', user.uid);
                      await updateDoc(docRef, {
                        phone: user.phoneNumber,
                      });
                      await setIsLoading(false);
                      if (location === '/mypage/modify') {
                        alert('휴대폰번호 수정이 완료되었습니다.');
                        window.location.reload();
                      } else {
                        alert('회원가입이 완료되었습니다.');
                        window.location.href = '/';
                      }
                    })
                    .catch((error) => {
                      setIsLoading(false);
                      appVerifier.clear();
                      if (error.code === 'auth/invalid-verification-code') {
                        alert('인증 코드가 다릅니다. 인증 절차를 재시도 해 주세요.');
                      } else if (error.code === 'auth/account-exists-with-different-credential') {
                        appVerifier.render();
                        alert('이미 등록된 번호입니다.');
                      } else {
                        alert('정의되지 않은 오류입니다. 관리자에 문의해 주세요.');
                        console.log(error);
                      }
                    });
                }
              })
              .catch((error) => {
                console.log(error);
                setIsLoading(false);
              });
          },
          'expired-callback': () => {
            alert('reCAPTCHA가 만료되었습니다. 다시 풀어주세요.');
            // reCAPTCHA 다시 렌더링
            appVerifier.render();
          },
        });

        // reCAPTCHA 인증을 요청합니다.
        appVerifier.render();
      }
    }
  };
  return (
    <PhoneAuthSection>
      {isLoading && <LoadingSpinner />}
      <form onSubmit={addPhoneNumber}>
        <label>휴대폰번호</label>
        <InputContainer>
          <input
            required
            type="tel"
            name="phone"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="휴대폰번호를 입력해주세요."
          />
          <button type="submit">인증</button>
        </InputContainer>
        <span>휴대폰번호는 숫자만 입력해주세요. (예 : 01012345678)</span>
        <div id="recaptcha-container"></div>

        {location === '/login/join' && (
          <SkipContainer>
            <Link to="/">휴대폰번호 등록 건너뛰기</Link>
            <span>휴대폰번호는 추후 마이페이지에서도 등록이 가능합니다.</span>
          </SkipContainer>
        )}
      </form>
    </PhoneAuthSection>
  );
};

const PhoneAuthSection = styled.div`
  text-align: left;
  form {
  }
  label {
    font-size: 16px;
    font-weight: bold;
    display: block;
  }
  input {
    font-family: 'Noto Sans KR';
    width: calc(100% - 110px);
    padding: 10px;
    outline: none;
    border-radius: 4px;
    border: 1px solid #ddd;
    height: 41px;
    box-sizing: border-box;
  }
  span {
    display: block;
    font-size: 12px;
    color: gray;
  }
  button {
    font-family: 'Noto Sans KR';
    width: 100px;

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

  #recaptcha-container {
    margin-top: 20px;
  }
`;

const InputContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SkipContainer = styled.div`
  margin-top: 20px;
  a {
    width: 100%;
    display: block;
    font-family: 'Noto Sans KR';
    cursor: pointer;
    height: 47px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    color: #222;
    text-align: center;
    line-height: 47px;
    background-color: lightgray;
    margin-bottom: 5px;
  }
`;

export default JoinPhoneNumber;
