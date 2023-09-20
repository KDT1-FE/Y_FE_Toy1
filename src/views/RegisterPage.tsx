import { useInput, useButtonActivate } from '../hooks/auth';

import {
  FormTitle,
  InputEmail,
  InputName,
  InputPassword,
  InputPasswordConfirm,
  SubmitButton,
  ChangeAuthPage,
} from '../components/Auth';

import createUser from '../firebase/createUser';

import { useNavigate } from 'react-router-dom';

import '../scss/authPage.scss';

interface FormElements extends HTMLFormElement {
  email: HTMLInputElement;
  password: HTMLInputElement;
  user: HTMLInputElement;
}

interface FormTarget extends React.FormEvent<HTMLFormElement> {
  target: FormElements;
}

const RegisterPage = (): JSX.Element => {
  const [email, handleEmail] = useInput('email', { value: '', validationPass: false });

  const [name, handleName] = useInput('name', { value: '', validationPass: false });

  const [password, handlePassword] = useInput('password', { value: '', validationPass: false });

  const [passwordConfirm, handlePasswordConfirm] = useInput(
    'passwordConfirm',
    { value: '', validationPass: false },
    password,
  );

  const buttonActivate = useButtonActivate(email, name, password, passwordConfirm);

  const navigate = useNavigate();

  const handleSubmit = (e: FormTarget) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.user.value;

    createUser(email, password, name).then(result => {
      if (result === 'success') navigate('/login');
    });
  };

  return (
    <div className="auth-wrapper">
      <form className="authForm signup" onSubmit={handleSubmit}>
        <FormTitle title="SIGN UP" />

        <InputEmail email={email} handleEmail={handleEmail} />

        <InputName name={name} handleName={handleName} />

        <InputPassword password={password} handlePassword={handlePassword} />

        <InputPasswordConfirm passwordConfirm={passwordConfirm} handlePasswordConfirm={handlePasswordConfirm} />

        <SubmitButton content="SIGN UP" activate={buttonActivate} />

        <ChangeAuthPage target="/login" />
      </form>
    </div>
  );
};

export default RegisterPage;
