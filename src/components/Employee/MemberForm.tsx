import React from "react";

import CustomForm from "../common/CustomForm";
import { userInputs, userSelect } from "../../data/formSource";
import MemberSelectTeam from "./MemberSelectTeam";
import { Divider, FormInstance, Spin } from "antd";

function MemberForm({
  isEditMode,
  form,
}: {
  isEditMode: boolean;
  form: FormInstance;
}) {
  return (
    <>
      <Divider orientation="left">기본 정보</Divider>
      {userInputs.map((input) => (
        <CustomForm.Input
          key={input.name}
          label={input.label}
          name={input.name}
          rules={input.rules}
          readOnly={!isEditMode}
        />
      ))}
      <Divider orientation="left">회사 정보</Divider>
      <MemberSelectTeam readOnly={!isEditMode} form={form} />
      {userSelect.map((select) => (
        <CustomForm.Select
          key={select.name}
          label={select.label}
          name={select.name}
          placeholder={select.placeholder}
          options={select.options}
          rules={select.rules}
          readOnly={!isEditMode}
        />
      ))}
    </>
  );
}

export default MemberForm;
