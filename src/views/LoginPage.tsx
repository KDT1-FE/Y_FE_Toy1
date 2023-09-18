import { useInput, useButtonActivate } from '../hooks/auth';

import { FormTitle, InputEmail, InputPassword, SubmitButton, ChangeAuthPage } from '../components/Auth';

import '../scss/authPage.scss';

const LoginPage = (): JSX.Element => {
  const [email, handleEmail] = useInput('email', { value: '', validationPass: false });

  const [password, handlePassword] = useInput('password', { value: '', validationPass: false });

  const buttonActivate = useButtonActivate(email, password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    /* -------------------------------- firebase Authentication -------------------------------- */
  };

  return (
    <form className="authForm signin" onSubmit={handleSubmit}>
      <FormTitle title="SIGN IN" />

      <InputEmail email={email} handleEmail={handleEmail} />
      <InputPassword password={password} handlePassword={handlePassword} />

      <SubmitButton content="SIGN IN" activate={buttonActivate} />

      <ChangeAuthPage target="/register" />
    </form>
  );
};

export default LoginPage;
