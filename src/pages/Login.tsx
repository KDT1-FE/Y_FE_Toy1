import { useState, ChangeEvent } from 'react';
import { auth } from '../common/config';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useUser } from '../common/UserContext';
import { Link } from 'react-router-dom';

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

  const handleLogin = async () => {
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
    <div>
      <h2>로그인</h2>
      <div>
        <label>이메일:</label>
        <input type="email" value={email} onChange={handleEmailChange} />
      </div>
      <div>
        <label>비밀번호:</label>
        <input type="password" value={password} onChange={handlePasswordChange} />
      </div>
      <button onClick={handleLogin}>로그인</button>
      <Link to="/join">회원가입</Link>
    </div>
  );
};

export default Login;
