import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import type { ProjectInfo } from "./ProjectDragDrop";
import ProjectDraggable from "./ProjectDraggable";

interface ProjectDroppableProps {
  id: string;
  projectList?: ProjectInfo[];
}

const ProjectDroppable = ({ id, projectList }: ProjectDroppableProps) => {
  // const projects = projectList?.sort((a, b) => a.order - b.order);

  return (
    <Projects>
      <div className="project__board-top">
        <h3 className={id}>
          {id === "progress" ? "진행중인" : id === "plus" ? "예정된" : "완료된"}{" "}
          프로젝트
        </h3>
        <span>{projectList?.length}</span>
      </div>
      {projectList === undefined ? null : (
        <Droppable droppableId={id}>
          {(provided, snapshot) => (
            // eslint-disable-next-line react/prop-types
            <Area
              ref={provided.innerRef}
              {...provided.droppableProps}
              $isDraggingOver={snapshot.isDraggingOver}
              $isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            >
              {projectList?.map((project, index) => (
                <ProjectDraggable
                  key={project.id}
                  project={project}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </Area>
          )}
        </Droppable>
      )}
    </Projects>
  );
};

export default ProjectDroppable;

const Projects = styled.div`
  width: 100%;
  max-width: 342px;
  display: flex;
  flex-direction: column;
  min-height: 233px;
  padding: 20px 10px;
  background-color: #f5f5f5;
  margin-bottom: 24px;
  .project__board-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  h3 {
    &.progress {
      color: #00b96b;
    }
    &.plus {
      color: #004ca5;
    }
    &.completed {
      color: #555;
    }
  }
`;

interface AreaProps {
  $isDraggingOver: boolean;
  $isDraggingFromThis: boolean;
}
const Area = styled.div<AreaProps>`
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  background-color: ${(props) =>
    props.$isDraggingOver
      ? "lightgray"
      : props.$isDraggingFromThis
      ? "lightcoral"
      : "transparent"};
`;
