import { useInput, useButtonActivate } from '../hooks/auth';

import { getUserName, requestLogin } from '../firebase/login';

import { FormTitle, InputEmail, InputPassword, SubmitButton, ChangeAuthPage } from '../components/Auth';

import { useDispatch } from 'react-redux';
import { login } from '../store/loginSlice';

import { useNavigate } from 'react-router-dom';

import '../scss/authPage.scss';

interface FormElements extends HTMLFormElement {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

interface FormTarget extends React.FormEvent<HTMLFormElement> {
  target: FormElements;
}

const LoginPage = (): JSX.Element => {
  const [email, handleEmail] = useInput('email', { value: '', validationPass: false });

  const [password, handlePassword] = useInput('password', { value: '', validationPass: false });

  const buttonActivate = useButtonActivate(email, password);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = (e: FormTarget) => {
    e.preventDefault();

    const userEmail = e.target.email.value;
    const userPassword = e.target.password.value;

    requestLogin(userEmail, userPassword);

    getUserName(userEmail).then(userName => {
      localStorage.setItem('isLogin', 'true');
      localStorage.setItem('userEmail', userEmail);
      localStorage.setItem('userName', userName);

      dispatch(login({ userName, userEmail }));

      navigate('/');
    });
  };

  return (
    <div className="auth-wrapper">
      <form className="authForm signin" onSubmit={handleSubmit}>
        <FormTitle title="SIGN IN" />

        <InputEmail email={email} handleEmail={handleEmail} />
        <InputPassword password={password} handlePassword={handlePassword} />

        <SubmitButton content="SIGN IN" activate={buttonActivate} />

        <ChangeAuthPage target="/register" />
      </form>
    </div>
  );
};

export default LoginPage;
