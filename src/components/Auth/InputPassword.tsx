import { Icon, ErrorMsg } from '../../components/Auth';

import '../../scss/components/auth/input.scss';

interface InputType {
  value: string;
  validationPass: boolean;
}

interface PasswordProps {
  password: InputType;
  handlePassword: React.ChangeEventHandler<HTMLInputElement>;
}

const InputPassword = ({ password, handlePassword }: PasswordProps): JSX.Element => {
  return (
    <div className="input-container">
      <input
        type="password"
        name="password"
        id="password"
        value={password.value}
        onChange={handlePassword}
        required
        autoComplete="off"
      />

      <label htmlFor="password">Password</label>

      <span className="input-container__bar"></span>

      <Icon input={password} />

      <ErrorMsg target="password" input={password} />
    </div>
  );
};

export default InputPassword;
