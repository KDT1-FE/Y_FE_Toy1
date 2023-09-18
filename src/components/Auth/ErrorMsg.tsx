interface InputType {
  value: string;
  validationPass: boolean;
}

interface ErrorProps {
  target: string;
  input: InputType;
}

const ErrorMsg = ({ target, input }: ErrorProps): JSX.Element => {
  const showError = () => {
    if (target === 'email') {
      return '이메일 형식에 맞게 입력해 주세요.';
    }
    if (target === 'name') {
      return '이름을 제대로 입력해 주세요.';
    }
    if (target === 'password') {
      return '영문 또는 숫자를 6~12자 입력하세요.';
    }
    if (target === 'passwordConfirm') {
      return '패스워드가 일치하지 않습니다.';
    }
  };

  return (
    <div className="input-container__errorMsg">{input.value ? (input.validationPass ? '' : showError()) : null}</div>
  );
};

export default ErrorMsg;
