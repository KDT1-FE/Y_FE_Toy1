import React, { useState } from "react";
import { Button, message, Spin } from "antd";
import { serverTimestamp } from "firebase/firestore";
import TeamForm from "./TeamForm";
import { useUploadData } from "../../../hooks/Employee/useMemberMutaion";
import TeamMemberSelect from "./TeamMemberSelect";
import MemberProfile from "../MemberProfile";
import { useRecoilState } from "recoil";
import { selectedUserIdsState } from "../../../store/member";
import CustomForm from "../../common/CustomForm";
import { FormDataType } from "../../../type/form";
import styled from "styled-components";

export default function AddTeamModal({ onCancel }: { onCancel: () => void }) {
  const Form = CustomForm.Form;
  const [form] = Form.useForm();
  const [isEditMode] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedUserIds, setSelectedUserIds] =
    useRecoilState(selectedUserIdsState);
  const [loadingMessage, setLoadingMessage] = useState<string | null>(null);
  const { uploadStorage, uploadStore } = useUploadData("Teams");

  const handleAdd = async (data: FormDataType) => {
    try {
      if (file) {
        setLoadingMessage("이미지 업로드 중...");
        const uploadedUrl = await uploadStorage(file);
        setLoadingMessage("데이터 저장 중...");
        await uploadStore({
          ...data,
          photo: uploadedUrl,
          userId: selectedUserIds,
          createdAt: serverTimestamp(),
        });
      }
      form.resetFields();
      setPreviewUrl(null);
      setSelectedUserIds([]);
      message.success("팀이 생성되었습니다!");
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      onCancel();
      setLoadingMessage(null);
    }
  };

  return (
    <>
      <FullScreenSpin message={loadingMessage} />
      <Form form={form} onFinish={handleAdd}>
        <MemberProfile
          {...{ isEditMode, previewUrl, setPreviewUrl, file, setFile }}
        />
        <TeamForm isEditMode={isEditMode} />
        <TeamMemberSelect onChange={setSelectedUserIds} />
        <SubmitButton />
      </Form>
    </>
  );
}

const FullScreenSpin = ({ message }: { message: string | null }) => (
  <Spin
    style={{
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 9999,
    }}
    spinning={!!message}
  >
    {message && <div>{message}</div>}
  </Spin>
);

const SubmitButton = () => (
  <SumbitBtn>
    <Button htmlType="submit" type="primary">
      Add
    </Button>
  </SumbitBtn>
);

const SumbitBtn = styled.div`
  display: flex;
  justify-content: flex-end;
`;
