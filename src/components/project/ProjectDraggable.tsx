import React from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Draggable } from "react-beautiful-dnd";
import type { ProjectInfo } from "./ProjectDragDrop";
import styled from "styled-components";
import ProjectAssignee from "./ProjectAssignee";
import ProjectDate from "./ProjectDate";
import { useNavigate } from "react-router-dom";
import useMutationDelProject from "../../hooks/project/useMutationDelProject";
import { Popconfirm } from "antd";

interface ProjectDraggableProps {
  project: ProjectInfo;
  index: number;
}

const ProjectDraggable = ({ project, index }: ProjectDraggableProps) => {
  const navigate = useNavigate();
  const onClickProjDelete = useMutationDelProject();

  // console.log(project.id, "project rendering");
  return (
    <Draggable draggableId={project.id} index={index}>
      {(provided) => (
        <Project ref={provided.innerRef} {...provided.draggableProps}>
          <div className="project__item-btns">
            {/* <h2>{project.order}</h2> */}
            <div
              className="project__item-btn"
              onClick={() => {
                navigate(`/project/${project.id}/edit`);
              }}
            >
              <EditOutlined />
            </div>
            <Popconfirm
              title="프로젝트 삭제"
              description="정말로 삭제하시겠습니까?"
              okText="예"
              cancelText="아니오"
              onConfirm={() => {
                void onClickProjDelete(project.id, project.status);
                navigate(`/project`);
              }}
            >
              <div className="project__item-btn">
                <DeleteOutlined />
              </div>
            </Popconfirm>
          </div>
          <div {...provided.dragHandleProps}>
            <div className="project__item-title">{project.title}</div>
            <ProjectDate duration={project.duration} />
            <ProjectAssignee assignees={project.assignees} />
          </div>
        </Project>
      )}
    </Draggable>
  );
};

export default React.memo(ProjectDraggable);

const Project = styled.div`
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  margin-bottom: 6px;
  border: 1px solid #dfdfdf;
  .project__item-title {
    margin-bottom: 12px;
    font-size: 16px;
  }
`;
