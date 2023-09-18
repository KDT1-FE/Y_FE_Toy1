import { Icon, ErrorMsg } from '../../components/Auth';

import '../../scss/components/auth/input.scss';

interface InputType {
  value: string;
  validationPass: boolean;
}

interface PasswordConfirmProps {
  passwordConfirm: InputType;
  handlePasswordConfirm: React.ChangeEventHandler<HTMLInputElement>;
}

const InputPasswordConfirm = ({ passwordConfirm, handlePasswordConfirm }: PasswordConfirmProps): JSX.Element => {
  return (
    <div className="input-container">
      <input
        type="password"
        name="password-confirm"
        id="password-confirm"
        value={passwordConfirm.value}
        onChange={handlePasswordConfirm}
        required
        autoComplete="off"
      />

      <label htmlFor="password-confirm">Confirm Password</label>

      <span className="input-container__bar"></span>

      <Icon input={passwordConfirm} />

      <ErrorMsg target="passwordConfirm" input={passwordConfirm} />
    </div>
  );
};

export default InputPasswordConfirm;
