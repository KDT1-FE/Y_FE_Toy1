import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFetchData } from "../../hooks/Employee/useFetchData";
import { FormDataType } from "../../type/form";
import { Button, message, Spin, Skeleton } from "antd";
import CustomForm from "../common/CustomForm";
import { EditOutlined, UnorderedListOutlined } from "@ant-design/icons";
import MemberForm from "./MemberForm";
import MemberProfile from "./MemberProfile";
import {
  useUpdateData,
  useUploadStorage,
  useDeleteStorage,
} from "../../hooks/Employee/useMemberMutaion";
import { useUpdateTeamForMember } from "../../hooks/Employee/useUpdateTeamForMember";
import styled from "styled-components";

function MemberDetailInfo() {
  const Form = CustomForm.Form;
  const [form] = Form.useForm();
  const [isEditMode, setIsEditMode] = useState(false);
  const [file, setFile] = useState<File | null>(null); // file 관리
  const navigate = useNavigate();
  const { memberId } = useParams<{ memberId: string }>();
  const fetchDataParams = {
    COLLECTION_NAME: "Users",
    DOCUMENT_ID: memberId,
  };
  const { data: userData, loading } = useFetchData(fetchDataParams) as {
    data: FormDataType;
    loading: boolean;
  };

  const [cardName, setCardName] = useState(userData.name);
  const [cardDepartment, setCardDepartment] = useState(userData.photo);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [teamId, setTeamId] = useState<string | undefined>("");
  useEffect(() => {
    if (userData) {
      Object.keys(userData).forEach((fieldName) => {
        form.setFieldsValue({ [fieldName]: userData[fieldName] });
        if (fieldName === "photo") {
          setPreviewUrl(userData[fieldName as string]);
        }
        setTeamId(userData.teamId);
        setCardDepartment(userData.department);
        setCardName(userData.name);
      });
    }
  }, [userData]);

  const handleUpdate = async (fieldsValue: FormDataType) => {
    try {
      const { uploadStorage } = useUploadStorage();
      const { deleteStorage } = useDeleteStorage();
      const { updateData } = useUpdateData({ COLLECTION_NAME: "Users" });

      if (file) {
        const downloadURL = await uploadStorage(file);
        fieldsValue.photo = downloadURL;

        if (userData && userData.photo) {
          await deleteStorage(userData.photo);
        }
      } else {
        fieldsValue.photo = previewUrl || "";
      }
      if (typeof fieldsValue.photo === "undefined" || !fieldsValue.photo) {
        fieldsValue.photo = "";
      }

      const currentTeamId = userData.teamId;
      if (memberId) {
        await updateData(memberId, fieldsValue);
      }
      const { updateTeamForMember } = useUpdateTeamForMember();

      if (memberId && fieldsValue.teamId && currentTeamId) {
        await updateTeamForMember(memberId, currentTeamId, fieldsValue.teamId);
      }

      handleProfileCard();
      navigate(-1);
    } catch (error) {
      console.error("Error updating member:", error);
      message.error("데이터 업데이트 중 오류가 발생했습니다");
    }
  };

  const handleProfileCard = () => {
    if (!isEditMode) {
      return;
    }
    const fieldsValue = form.getFieldsValue();
    setCardName(fieldsValue.name);
    setCardDepartment(fieldsValue.department);
  };
  const toggleEditMode = () => {
    setIsEditMode((prevIsEditMode) => {
      return !prevIsEditMode;
    });
  };

  return (
    <Form form={form}>
      {loading ? (
        <Overlay>
          <Spin size="large" />
        </Overlay>
      ) : null}
      <div className="member-header">
        <div className="member-title">
          <h3>직원 정보</h3>
          <span className="member-desc">
            {userData?.name ? (
              `${userData.name} 님의 프로필`
            ) : (
              <Skeleton.Input style={{ width: "200px" }} active />
            )}
          </span>
        </div>
        <div className="member-btn-area">
          <Button
            icon={<UnorderedListOutlined />}
            onClick={() => {
              navigate(-1);
            }}
          >
            목록
          </Button>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              toggleEditMode();
              if (isEditMode) {
                const fieldsValue = form.getFieldsValue();
                handleUpdate(fieldsValue);
              }
            }}
          >
            {isEditMode ? "Save" : "Edit"}
          </Button>
        </div>
      </div>
      <div className="member-container">
        <div className="member-profile-area">
          {loading ? (
            <Skeleton.Avatar size="large" shape="circle" active />
          ) : (
            <MemberProfile
              isEditMode={isEditMode}
              previewUrl={previewUrl}
              setPreviewUrl={setPreviewUrl}
              file={file}
              setFile={setFile}
            />
          )}
          <div className="member-profile-info">
            <div className="title-text">
              {cardName || <Skeleton.Input style={{ width: "150px" }} active />}
            </div>
            <div className="desc-text">
              {cardDepartment || (
                <Skeleton.Input style={{ width: "100px" }} active />
              )}
            </div>
          </div>
        </div>
        <div className="member-info-area">
          {loading ? (
            <Skeleton active />
          ) : (
            <div className="member-info-wrap">
              <MemberForm isEditMode={isEditMode} form={form} />
            </div>
          )}
        </div>
      </div>
    </Form>
  );
}
export default MemberDetailInfo;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;
