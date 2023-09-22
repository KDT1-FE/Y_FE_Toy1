import React, { useState } from "react";
import ProjectListItem from "./ProjectListItem";
import useQueryParam from "../../hooks/project/useQueryParam";
import { Button, Dropdown, MenuProps, Skeleton, Space } from "antd";
import useQueryProjectEdit from "../../hooks/project/useQueryProjectEdit";
import { DownOutlined, RedoOutlined } from "@ant-design/icons";
import useQueryProjectList from "../../hooks/project/useQueryProjectList";

const ProjectListSider = () => {
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const status = useQueryParam().get("status");
  const [teams, users, , isLoaded] = useQueryProjectEdit();
  const [projects] = useQueryProjectList();
  let projectArr =
    status === null
      ? projects && [
          ...projects["plus"],
          ...projects["progress"],
          ...projects["completed"],
        ]
      : projects && [...projects[status]];
  projectArr?.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis());

  // 팀명을 드롭다운 아이템 형식으로 변경하기
  const teamItems: MenuProps["items"] = teams?.map((team, index) => {
    return { key: index, label: team.teamName };
  });
  // 담당자명을 드롭다운 아이텀 형식으로 변경하기
  const userItems: MenuProps["items"] = users?.map((user, index) => {
    return { key: index, label: user.name };
  });

  const filterByTeam: MenuProps["onClick"] = ({ key }) => {
    // antdesign 측에서 타입을 이상하게 해서 string > json으로 변환하여 진행
    const findTeam = teamItems?.find((team) => team?.key === Number(key));
    const team = JSON.stringify(findTeam);
    const { label } = JSON.parse(team);
    setSelectedTeam(label);
  };

  const filterByUser: MenuProps["onClick"] = ({ key }) => {
    // 유저정보를 가져오기
    const findUser = userItems?.find((user) => user?.key === Number(key));
    const user = JSON.stringify(findUser);
    const { label } = JSON.parse(user);
    setSelectedUser(label);
  };

  const onClickReset = () => {
    setSelectedTeam("");
    setSelectedUser("");
    projectArr =
      status === null
        ? projects && [
            ...projects["plus"],
            ...projects["progress"],
            ...projects["completed"],
          ]
        : projects && [...projects[status]];
  };

  if (selectedTeam !== "") {
    const selectedProj = projectArr?.filter(
      (proj) => proj.teams.indexOf(selectedTeam) > -1,
    );
    projectArr = selectedProj;
  }
  if (selectedUser !== "") {
    const selectedProj = projectArr?.filter(
      (proj) => proj.assignees.indexOf(selectedUser) > -1,
    );
    projectArr = selectedProj;
  }

  const dropDownStyle = {
    height: "200px",
    overflow: "scroll",
    boxShadow: "0 0 10px rgba(0,0,0,.2)",
    borderRadius: "5px",
  };

  return (
    <>
      {isLoaded ? (
        <div className="project__filter">
          <Dropdown
            menu={{ items: userItems, onClick: filterByUser }}
            dropdownRender={(menu) => (
              <div style={dropDownStyle}>
                {React.cloneElement(menu as React.ReactElement)}
              </div>
            )}
          >
            <Button size={"small"}>
              <Space>
                {selectedUser === "" ? "담당자" : selectedUser.substring(0, 3)}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
          <Dropdown menu={{ items: teamItems, onClick: filterByTeam }}>
            <Button size={"small"}>
              <Space>
                {selectedTeam === "" ? "팀명" : selectedTeam.substring(0, 3)}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
          <Button onClick={onClickReset} size={"small"}>
            <Space>
              초기화
              <RedoOutlined />
            </Space>
          </Button>
        </div>
      ) : (
        <Skeleton.Button />
      )}

      <div className="project__all-list">
        {projectArr?.map((project) => (
          <ProjectListItem key={project.id} project={project} status={status} />
        ))}
      </div>
    </>
  );
};

export default ProjectListSider;
