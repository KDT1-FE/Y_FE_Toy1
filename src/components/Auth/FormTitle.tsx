import '@scss/components/auth/formTitle.scss';

const FormTitle = ({ title }: TitleProps): JSX.Element => {
  return <div className="authForm__title">{title}</div>;
};

export default FormTitle;

interface TitleProps {
  title: string;
}
