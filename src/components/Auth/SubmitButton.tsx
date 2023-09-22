import '@scss/components/auth/submitButton.scss';

const SubmitButton = ({ content, activate }: SubmitButtonProps): JSX.Element => {
  return (
    <button type="submit" className="authForm__button" disabled={activate ? false : true}>
      {content}
    </button>
  );
};

export default SubmitButton;

interface SubmitButtonProps {
  content: string;
  activate: boolean;
}
