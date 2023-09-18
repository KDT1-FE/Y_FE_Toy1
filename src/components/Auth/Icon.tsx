import { BsFillXCircleFill, BsCheckCircleFill } from 'react-icons/bs';

interface InputType {
  value: string;
  validationPass: boolean;
}

interface IconProps {
  input: InputType;
}

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
