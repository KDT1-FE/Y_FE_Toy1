import { BsFillXCircleFill, BsCheckCircleFill } from 'react-icons/bs';

const Icon = ({ input }: IconProps): JSX.Element => {
  if (!input.value) return <></>;

  if (input.validationPass) {
    return (
      <i className="input-container__icon success">
        <BsCheckCircleFill />
      </i>
    );
  } else {
    return (
      <i className="input-container__icon error">
        <BsFillXCircleFill />
      </i>
    );
  }
};

export default Icon;

interface InputType {
  value: string;
  validationPass: boolean;
}

interface IconProps {
  input: InputType;
}
