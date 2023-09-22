import React, { useState } from "react";
import { Button, Form, Spin } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import styled from "styled-components";
import MemberForm from "./MemberForm";
import MemberProfile from "./MemberProfile";
import { useUploadData } from "../../hooks/Employee/useMemberMutaion";
import { FormDataType } from "../../type/form";

const COLLECTION_NAME = "Users";

export default function AddMemberModal({ onCancel }: { onCancel: () => void }) {
  const [form] = Form.useForm();
  const [isEditMode] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { uploadStorage, uploadStore } = useUploadData(COLLECTION_NAME);

  const handleAdd = async (data: FormDataType, teamId: string) => {
    setIsLoading(true);
    try {
      if (file) {
        setLoadingMessage("이미지 업로드 중...");
        const uploadedURL = await uploadStorage(file);
        setLoadingMessage("데이터 저장 중...");
        await uploadStore({ ...data, photo: uploadedURL }, teamId);
      }
      form.resetFields();
      setPreviewUrl(null);
    } catch (error) {
      console.error("handleAdd 오류:", error);
    } finally {
      onCancel();
      setLoadingMessage(null);
    }
  };

  return (
    <>
      <FullScreenSpin message={loadingMessage} />
      <Form form={form} onFinish={(data) => handleAdd(data, data.teamId)}>
        <MemberProfile
          {...{ isEditMode, previewUrl, setPreviewUrl, file, setFile }}
        />
        <MemberForm {...{ isEditMode, form }} />
        <SubmitButton isLoading={isLoading} />
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

const SubmitButton = ({ isLoading }: { isLoading: boolean }) => (
  <SumbitBtn>
    <Button
      icon={<UserAddOutlined />}
      htmlType="submit"
      type="primary"
      disabled={isLoading}
    >
      Add
    </Button>
  </SumbitBtn>
);

const SumbitBtn = styled.div`
  display: flex;
  justify-content: flex-end;
`;
