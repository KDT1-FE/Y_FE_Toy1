import '../../scss/components/auth/formTitle.scss';

interface TitleProps {
  title: string;
}

export const FormTitle = ({ title }: TitleProps): JSX.Element => {
  return <div className="authForm__title">{title}</div>;
};
