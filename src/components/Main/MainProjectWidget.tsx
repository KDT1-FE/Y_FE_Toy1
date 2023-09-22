import React from "react";
import { ProjectInfo } from "../../libs/firestore";
import { BorderTitle, WidgetItem } from "./MainWikiWidget";
import { theme } from "antd";
import { Link } from "react-router-dom";

const MainProjectWidget = ({ projects }: { projects?: ProjectInfo[] }) => {
  const {
    token: { colorPrimary },
  } = theme.useToken();

  projects?.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis());

  return (
    <div>
      <BorderTitle $colorPrimary={colorPrimary}>최근 프로젝트</BorderTitle>
      <div>
        {projects?.map((project) => (
          <WidgetItem key={project.id}>
            <p>
              <Link to={`/project/${project.id}`}>{project.title}</Link>
            </p>
            <div className="list-date">
              <span>{project.createdAt.toDate().getMonth() + 1}</span>.
              <span>{project.createdAt.toDate().getUTCDate()}</span>
            </div>
          </WidgetItem>
        ))}
      </div>
    </div>
  );
};

export default MainProjectWidget;
