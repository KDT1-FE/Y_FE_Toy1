import React from "react";
import "../styles/Project.css";
import ProjectSider from "../components/project/ProjectSider";
import { Layout } from "antd";
import ProjectNewForm from "../components/project/ProjectNewForm";
import useQueryProjectEdit from "../hooks/project/useQueryProjectEdit";

const ProjectNew = ({ isEdit }: { isEdit: boolean }) => {
  const [teams, users, , isLoaded] = useQueryProjectEdit();
  return (
    <>
      {!isLoaded ? null : (
        <Layout>
          <ProjectSider />
          <ProjectNewForm isEdit={isEdit} teams={teams} users={users} />
        </Layout>
      )}
    </>
  );
};

export default ProjectNew;
