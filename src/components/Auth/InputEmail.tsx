import { Icon, ErrorMsg } from '../../components/Auth';

import '../../scss/components/auth/input.scss';

interface InputType {
  value: string;
  validationPass: boolean;
}

interface EmailProps {
  email: InputType;
  handleEmail: React.ChangeEventHandler<HTMLInputElement>;
}

const InputEmail = ({ email, handleEmail }: EmailProps): JSX.Element => {
  return (
    <div className="input-container">
      <input
        type="text"
        name="email"
        id="email"
        value={email.value}
        onChange={handleEmail}
        required
        autoComplete="off"
      />

      <label htmlFor="email">Email</label>

      <span className="input-container__bar"></span>

      <Icon input={email} />

      <ErrorMsg target="email" input={email} />
    </div>
  );
};

export default InputEmail;
