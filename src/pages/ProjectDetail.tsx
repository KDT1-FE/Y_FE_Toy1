import React from "react";
import "../styles/Project.css";
import ProjectSider from "../components/project/ProjectSider";
import { Layout, Skeleton } from "antd";
import ProjectDetailInfo from "../components/project/ProjectDetailInfo";
import ProjectListSider from "../components/project/ProjectListSider";
import { useQueryProject } from "../hooks/project/useQueryProject";
import ProjectDetailDefault from "../components/project/ProjectDetailDefault";

const { Content, Sider } = Layout;

const ProjectDetail = ({ isDefault }: { isDefault: boolean }) => {
  const [projectDetail, isLoaded] = useQueryProject();

  return (
    <Layout>
      <ProjectSider />
      <Layout>
        <Sider theme="light" width={260}>
          <ProjectListSider />
        </Sider>
        <Content
          className="project__content-area"
          style={{
            minHeight: "calc(100vh - 112px)",
            backgroundColor: "#f5f5f5",
            padding: "10px",
          }}
        >
          {isDefault ? (
            <ProjectDetailDefault />
          ) : isLoaded ? (
            <ProjectDetailInfo projectDetail={projectDetail} />
          ) : (
            <>
              <div style={{ marginBottom: "10px" }}>
                <Skeleton.Input active size="small" />
              </div>
              <div className="project-container">
                <div className="project__top-title">
                  <h3>프로젝트 상세 정보</h3>
                </div>
                <Skeleton title={true} />
              </div>
            </>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default ProjectDetail;
