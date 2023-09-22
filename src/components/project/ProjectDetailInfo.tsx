/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Breadcrumb, Button, Popconfirm } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import ProjectDate from "./ProjectDate";
import ProjectAssignee from "./ProjectAssignee";
import { Viewer } from "@toast-ui/react-editor";
import { useNavigate } from "react-router-dom";
import { ProjectDetail } from "../../libs/firestore";
import useMutationDelProject from "../../hooks/project/useMutationDelProject";
import ProjectTeams from "./ProjectTeams";

const ProjectDetailInfo = ({
  projectDetail,
}: {
  projectDetail?: ProjectDetail;
}) => {
  const onClickDelete = useMutationDelProject();
  const navigate = useNavigate();

  return (
    <>
      <div style={{ marginBottom: "12px" }}>
        <Breadcrumb
          items={[
            { title: "프로젝트" },
            {
              title:
                projectDetail?.status === "plus"
                  ? "예정된 프로젝트"
                  : projectDetail?.status === "progress"
                  ? "진행중인 프로젝트"
                  : "완료된 프로젝트",
            },
            { title: projectDetail?.title },
          ]}
        />
      </div>
      <div className="project-container">
        <div className="project__top-title">
          <h3>프로젝트 상세 정보</h3>
          <div className="project__top-btns">
            <Button
              type="primary"
              icon={<EditFilled />}
              size="large"
              onClick={() => {
                navigate(`/project/${projectDetail?.id}/edit`);
              }}
            >
              프로젝트 수정
            </Button>
            <Popconfirm
              title="프로젝트 삭제"
              description="정말로 삭제하시겠습니까?"
              okText="예"
              cancelText="아니오"
              onConfirm={() => {
                void onClickDelete(projectDetail!.id!, projectDetail!.status);
                navigate(`/project/all`);
              }}
            >
              <Button danger icon={<DeleteFilled />} size="large">
                프로젝트 삭제
              </Button>
            </Popconfirm>
          </div>
        </div>
        <h2>{projectDetail?.title}</h2>
        <ProjectDate duration={projectDetail?.duration} />
        <ProjectAssignee assignees={projectDetail?.assignees} />
        <ProjectTeams teams={projectDetail?.teams} />
        <Viewer initialValue={projectDetail?.data} />
      </div>
    </>
  );
};

export default ProjectDetailInfo;
