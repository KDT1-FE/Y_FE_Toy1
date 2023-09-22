import { Form, Input, InputProps, Modal, ModalProps, Select } from "antd";
import { Rule } from "antd/lib/form";
import React, { ReactNode } from "react";
import { FormDataType } from "../../../type/form";

interface FormItemProps {
  label: string;
  name: string;
  disabled?: boolean;
  rules?: Rule[];
  value?: string | string[];
}

interface CustomTextAreaProps {
  label: string;
  name: string;
  rules?: Rule[];
  disabled?: boolean;
  value?: string;
  rows?: number;
  readOnly?: boolean;
}

function CustomTextArea({
  label,
  name,
  rules,
  disabled,
  value,
  readOnly,
  ...args
}: CustomTextAreaProps) {
  return (
    <Form.Item label={label} name={name} rules={rules}>
      <Input.TextArea
        value={value}
        disabled={disabled}
        {...args}
        readOnly={readOnly}
      />
    </Form.Item>
  );
}

function CustomInput({
  label,
  name,
  rules,
  disabled,
  value,
  ...args
}: FormItemProps & InputProps) {
  return (
    <Form.Item label={label} name={name} rules={rules}>
      <Input value={value} disabled={disabled} {...args} />
    </Form.Item>
  );
}

interface SelectProps extends FormItemProps {
  options: Record<string, string>;
  defaultValue?: string;
  readOnly?: boolean;
  placeholder?: string;
  onChange?: (value: string) => void;
}

function CustomSelect({
  options,
  label,
  name,
  rules,
  disabled,
  defaultValue,
  readOnly,
  value,
  children,
  placeholder,
}: FormItemProps & {
  options: Record<string, string>;
  defaultValue?: string;
  readOnly?: boolean;
  mode?: string;
  placeholder?: string;
  onChange?: (selectedUserIds: string[]) => void;
  children?: ReactNode;
}) {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={rules}
      initialValue={defaultValue}
    >
      <Select
        disabled={disabled}
        className={readOnly ? "readOnly" : undefined}
        value={value}
        placeholder={placeholder}
      >
        {children}
        {Object.entries(options).map(([key, val]) => (
          <Select.Option
            value={Number.isNaN(Number(key)) ? key : Number(key)}
            key={key}
            disabled={key === defaultValue}
          >
            {val}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
}

interface UserData {
  key: string;
  title: string;
}

interface CustomSearchSelectProps extends Omit<SelectProps, "options"> {
  loading: boolean;
  error?: string | null;
  item?: UserData[];
}

function CustomSearchSelect({
  onChange,
  readOnly,
  loading,
  item,
  defaultValue,
  placeholder,
  error,
  ...restProps
}: CustomSearchSelectProps) {
  return (
    <Form.Item {...restProps}>
      <Select
        allowClear
        loading={loading}
        showSearch
        placeholder={placeholder}
        onChange={(value) =>
          onChange && onChange(value ? value.toString() : "")
        }
        className={readOnly ? "readOnly" : undefined}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option?.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0 ||
          option?.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        value={defaultValue}
      >
        {item && item.length > 0 ? (
          item.map((item) => (
            <Select.Option key={item.key} value={item.title}>
              {item.title}
            </Select.Option>
          ))
        ) : (
          <Select.Option key="no-data" value="no-data" disabled>
            데이터 없음
          </Select.Option>
        )}
      </Select>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </Form.Item>
  );
}

interface CustomModalProps {
  children: ReactNode;
}

function CustomModal({
  title,
  width,
  footer,
  children,
  open,
  onCancel,
}: CustomModalProps & ModalProps) {
  return (
    <>
      <Modal
        title={title}
        open={open}
        onCancel={onCancel}
        centered
        width={width}
        footer={footer}
      >
        {children}
      </Modal>
    </>
  );
}

export function useValidate() {
  const required = () => ({ required: true, message: "필수 항목입니다" });

  const max = (maxLength: number) => ({
    max: maxLength,
    message: `최대 ${maxLength}자 이내로 입력해주세요`,
  });

  const min = (minLength: number) => ({
    min: minLength,
    message: `최소 ${minLength}자 이내로 입력해주세요`,
  });

  const pattern = (RegExp: RegExp, message: string) => ({
    pattern: RegExp,
    message,
  });

  return {
    required,
    max,
    min,
    pattern,
  };
}

const CustomForm = {
  Form: Form,
  Input: CustomInput,
  Select: CustomSelect,
  Modal: CustomModal,
  TextArea: CustomTextArea,
  SearchSelect: CustomSearchSelect,
  useValidate,
};

export default CustomForm;
