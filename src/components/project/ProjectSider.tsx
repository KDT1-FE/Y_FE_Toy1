import React from "react";
import { Layout, Menu, theme } from "antd";
import type { MenuProps } from "antd";
import {
  AlignLeftOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  EditOutlined,
  PlusCircleOutlined,
  ProjectOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group",
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("프로젝트 상태", "projects", <AlignLeftOutlined />, [
    getItem("전체 프로젝트", "all", <UnorderedListOutlined />),
    getItem("예정된 프로젝트", "plus", <PlusCircleOutlined />),
    getItem("진행중인 프로젝트", "progress", <ClockCircleOutlined />),
    getItem("완료된 프로젝트", "completed", <CheckCircleOutlined />),
  ]),
  getItem("팀 프로젝트", "team", <ProjectOutlined />, [
    getItem("내 팀 프로젝트", "myProject", <UserOutlined />),
  ]),
];

const { Sider } = Layout;

const ProjectSider = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname.split("/")[2];
  const {
    token: { colorBgContainer, colorPrimary },
  } = theme.useToken();

  const onClick: MenuProps["onClick"] = (e) => {
    // console.log("click ", e);
    switch (e.key) {
      case "all":
        navigate("/project/all");
        break;
      case "plus":
        navigate("/project/all?status=plus");
        break;
      case "progress":
        navigate("/project/all?status=progress");
        break;
      case "completed":
        navigate("/project/all?status=completed");
        break;
      case "myProject":
        navigate("/project");
        break;
    }
  };

  return (
    <Sider style={{ background: colorBgContainer }} width={200}>
      <NewProjectBtn $primary={colorPrimary}>
        <Link to={"/project/new"}>
          <EditOutlined /> 새 프로젝트 추가
        </Link>
      </NewProjectBtn>
      <Menu
        onClick={onClick}
        style={{ width: 200 }}
        defaultSelectedKeys={[currentPath ?? "myProject"]}
        defaultOpenKeys={["team", "projects"]}
        mode="inline"
        items={items}
      />
    </Sider>
  );
};

export default ProjectSider;

const NewProjectBtn = styled.div<{ $primary: string }>`
  background: ${(props) => props.$primary};
  a {
    display: block;
    padding: 12px 10px 12px 24px;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    margin-left: 4px;
  }
`;
