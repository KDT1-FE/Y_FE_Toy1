import React from "react";
import { Link } from "react-router-dom";

interface Project {
  id: number;
  team: string;
  title: string;
  deadline: string;
  teamSize: number;
}

interface ProjectListProps {
  projects: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => (
  <div>
    <h1>프로젝트 리스트</h1>
    <ul>
      {projects.map((project) => (
        <li key={project.id}>
          <Link to={`/project/${project.team}/${project.id}`}>
            {project.team} 팀 - {project.title}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default ProjectList;
