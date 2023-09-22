import { EllipsisOutlined } from "@ant-design/icons";
import { Col, Dropdown, message, Row, Avatar, Tag } from "antd";
import React from "react";
import { FormDataType } from "../type/form";
import { NavigateFunction } from "react-router-dom";
import styled, { css } from "styled-components";

export const columns = (
  navigate: NavigateFunction,
  deleteData: (arg1: string, arg2: string) => void,
  userAccess: string | undefined,
  checkAdminPermission: () => boolean,
) => {
  const handleDelete = async (id: string, teamId: string) => {
    if (!checkAdminPermission()) return;
    deleteData(id, teamId);
    message.info("삭제되었습니다");
  };

  const handleMenuClick = (record: FormDataType, key: string) => {
    if (key === "view") {
      if (record.id) {
        navigate(`/employee/${record.id}`);
      }
    }
    if (key === "delete") {
      console.log(record);
      if (record.id) {
        handleDelete(record.id, record.teamId!);
      }
    }
  };

  return [
    {
      title: "Name",
      render: (record: FormDataType) => (
        <Row gutter={16}>
          <Col flex="0 1">
            <Avatar
              src={record.photo}
              alt={record.name}
              size={{ xs: 32, xxl: 43 }}
            >
              {record.name?.charAt(0)}
            </Avatar>
          </Col>
          <Col flex="auto">
            <NameField>
              <div className="name">{record.name}</div>
              <div className="email">{record.email}</div>
            </NameField>
          </Col>
        </Row>
      ),
    },
    {
      title: "Department",
      render: (record: FormDataType) => (
        <DepartmentField>
          <div className="name">{record.department}</div>
          <PositionTag position={record.position} bordered={false}>
            {record.position}
          </PositionTag>
        </DepartmentField>
      ),
    },
    {
      title: "Team",
      render: (record: FormDataType) => <TeamField>{record.team}</TeamField>,
    },
    {
      title: "Phone",
      render: (record: FormDataType) => <PhoneField>{record.phone}</PhoneField>,
    },
    {
      title: "Access",
      render: (record: FormDataType) => (
        <AccessField access={record.access ? String(record.access) : ""}>
          {record.access}
        </AccessField>
      ),
    },
    {
      title: <EllipsisOutlined />,
      dataIndex: "",
      render: (record: FormDataType) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "view",
                label: <span>View Profile</span>,
              },
              {
                key: "delete",
                label: <span>Delete</span>,
                danger: true,
              },
            ],
            onClick: ({ key }) => handleMenuClick(record, key),
          }}
          autoAdjustOverflow={true}
          placement="bottomRight"
          trigger={["click"]}
        >
          <Btn onClick={(e) => e.preventDefault()}>
            <EllipsisOutlined />
          </Btn>
        </Dropdown>
      ),
    },
  ];
};

const Btn = styled.a`
  display: block;
  padding: 0.3rem;
`;
const SharedFontStyle = css`
  font-size: 0.85rem;
`;

const NameField = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  & > .email {
    ${SharedFontStyle};
    font-weight: 400;
    color: #817e81;
  }
`;

const DepartmentField = styled.span`
  ${SharedFontStyle};
`;

const TeamField = styled.span`
  ${SharedFontStyle};
`;

const PhoneField = styled.span`
  ${SharedFontStyle};
`;
const AccessField = styled.span<{ access: string }>`
  ${SharedFontStyle};
  font-weight: 500;
  color: #a67aff;
  padding: 3px 13px;
  background: #f4eeff;
  border-radius: 1rem;
  letter-spacing: -0.5px;

  ${(props) =>
    props.access === "admin" &&
    css`
      background: #e4f8da;
      color: #88c851;
    `}
`;

const PositionTag = styled(Tag)<{ position: string | undefined }>`
  font-size: 0.8rem;
  font-weight: 500;
  border-radius: 1rem;
  ${(props) =>
    props.position
      ? css`
          color: ${props.position === "Manager"
            ? "#531dab"
            : props.position === "Senior"
            ? "#d4380d"
            : props.position === "Junior"
            ? "#7cb305"
            : "#333"};
        `
      : `
          background: #333;
        `};
`;
