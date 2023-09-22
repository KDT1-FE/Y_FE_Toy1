import React from "react";
import { Divider } from "antd";
import CustomForm from "../../common/CustomForm";
import TeamLeaderSelect from "./TeamLeaderSelect";
import {
  teamInputs,
  teamSelect,
  teamTextAreas,
} from "../../../data/formSource";

interface TeamFormProps {
  isEditMode: boolean;
}
function TeamForm({ isEditMode }: TeamFormProps) {
  return (
    <>
      <Divider orientation="left">기본 정보</Divider>
      {teamInputs.map((input) => (
        <CustomForm.Input
          key={input.name}
          label={input.label}
          name={input.name || ""}
          rules={input.rules}
          readOnly={!isEditMode}
        />
      ))}{" "}
      {teamSelect.map((select) => (
        <CustomForm.Select
          key={select.name}
          label={select.label}
          name={select.name}
          placeholder={select.place}
          options={select.options}
          rules={select.rules}
          readOnly={!isEditMode}
        />
      ))}
      <TeamLeaderSelect readOnly={!isEditMode} />
      {teamTextAreas.map((textArea) => (
        <CustomForm.TextArea
          key={textArea.name}
          label={textArea.label}
          name={textArea.name}
          rules={textArea.rules}
          readOnly={!isEditMode}
        />
      ))}
    </>
  );
}

export default TeamForm;
