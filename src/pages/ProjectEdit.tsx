import React from "react";
import "../styles/Project.css";
import ProjectSider from "../components/project/ProjectSider";
// import { Layout, theme } from "antd";
import { Layout } from "antd";
import ProjectNewForm from "../components/project/ProjectNewForm";
import ProjectNewFormSkeleton from "../components/project/ProjectNewFormSkeleton";
import useQueryProjectEdit from "../hooks/project/useQueryProjectEdit";
import { useLocation } from "react-router-dom";

const ProjectEdit = ({ isEdit }: { isEdit: boolean }) => {
  const { pathname } = useLocation();
  const projectId = pathname.split("/")[2];
  const [teams, users, projectDetail, isLoaded] =
    useQueryProjectEdit(projectId);
  return (
    <>
      {isLoaded ? (
        <Layout>
          <ProjectSider />
          {projectDetail !== undefined ? (
            <ProjectNewForm
              isEdit={isEdit}
              teams={teams}
              users={users}
              projectDetail={projectDetail}
            />
          ) : (
            <ProjectNewFormSkeleton />
          )}
        </Layout>
      ) : null}
    </>
  );
};

export default ProjectEdit;
