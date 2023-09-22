import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFetchData } from "../../../hooks/Employee/useFetchData";
import { FormDataType } from "../../../type/form";
import { Button, message, Skeleton, Spin } from "antd";
import CustomForm from "../../common/CustomForm";
import { EditOutlined, UnorderedListOutlined } from "@ant-design/icons";
import MemberProfile from "../MemberProfile";
import {
  useUpdateData,
  useUploadStorage,
  useDeleteStorage,
} from "../../../hooks/Employee/useMemberMutaion";
import TeamForm from "./TeamForm";
import { useRecoilState } from "recoil";
import { selectedUserIdsState } from "../../../store/member";
import EditMemberSelect from "./EditMemberSelect";
import styled from "styled-components";

function TeamDetailInfo() {
  const Form = CustomForm.Form;
  const [form] = Form.useForm();
  const [isEditMode, setIsEditMode] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const { teamId } = useParams<{
    teamId: string;
  }>();
  const fetchDataParams = {
    COLLECTION_NAME: "Teams",
    DOCUMENT_ID: teamId,
  };
  const { data: userData, loading } = useFetchData(fetchDataParams) as {
    data: FormDataType;
    loading: boolean;
  };
  const [cardName, setCardName] = useState(userData.name || userData.teamName);
  const [cardDepartment, setCardDepartment] = useState(userData.photo);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedUserIds, setSelectedUserIds] =
    useRecoilState(selectedUserIdsState);
  const [prevUserIds, setPrevUserIds] = useState<string[]>([]);

  useEffect(() => {
    if (userData) {
      Object.keys(userData).forEach((fieldName) => {
        form.setFieldsValue({ [fieldName]: userData[fieldName] });
        if (fieldName === "photo") {
          setPreviewUrl(userData[fieldName as string]);
        }
        setCardDepartment(userData.department);
        setCardName(userData.name || userData.teamName);
        setPrevUserIds(userData.userId);
      });
    }
  }, [userData]);

  const handleUpdate = async () => {
    try {
      const { uploadStorage } = useUploadStorage();
      const { deleteStorage } = useDeleteStorage();
      const { updateData } = useUpdateData({ COLLECTION_NAME: "Teams" });
      const fieldsValue = form.getFieldsValue();

      if (file !== null) {
        const downloadURL = await uploadStorage(file as File);
        fieldsValue.photo = downloadURL;
        if (userData?.photo) {
          await deleteStorage(userData.photo);
        }
      }
      if (teamId) {
        await updateData(teamId, fieldsValue);
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
          <h3>팀 정보</h3>
          <span className="member-desc">{userData.teamName} 팀 프로필</span>
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
                handleUpdate();
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
            <div className="title-text">{cardName}</div>
            <div className="desc-text">{cardDepartment}</div>
          </div>
        </div>
        <div className="member-info-area">
          <div className="member-info-wrap">
            {loading ? (
              <Skeleton active />
            ) : (
              <>
                <TeamForm isEditMode={isEditMode} />
                <EditMemberSelect
                  isEditMode={isEditMode}
                  onChange={(userIds: string[]) => setSelectedUserIds(userIds)}
                  prevUserIds={prevUserIds}
                />{" "}
              </>
            )}
          </div>
        </div>
      </div>
    </Form>
  );
}
export default TeamDetailInfo;

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
