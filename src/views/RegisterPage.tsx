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

import '../scss/authPage.scss';

export const RegisterPage = (): JSX.Element => {
  const [email, handleEmail] = useInput('email', { value: '', validationPass: false });

  const [name, handleName] = useInput('name', { value: '', validationPass: false });

  const [password, handlePassword] = useInput('password', { value: '', validationPass: false });

  const [passwordConfirm, handlePasswordConfirm] = useInput(
    'passwordConfirm',
    { value: '', validationPass: false },
    password,
  );

  const buttonActivate = useButtonActivate(email, name, password, passwordConfirm);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    /* ------------------------------ set firestore ----------------------------- */

    /* -------------------------------- firebase Authentication -------------------------------- */
  };

  return (
    <form className="authForm signup" onSubmit={handleSubmit}>
      <FormTitle title="SIGN UP" />

      <InputEmail email={email} handleEmail={handleEmail} />

      <InputName name={name} handleName={handleName} />

      <InputPassword password={password} handlePassword={handlePassword} />

      <InputPasswordConfirm passwordConfirm={passwordConfirm} handlePasswordConfirm={handlePasswordConfirm} />

      <SubmitButton content="SIGN UP" activate={buttonActivate} />

      <ChangeAuthPage target="/login" />
    </form>
  );
};
