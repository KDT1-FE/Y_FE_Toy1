import { FilterFilled } from "@ant-design/icons";
import React from "react";
import { Button, Dropdown, MenuProps } from "antd";

interface MemberFilterProps {
  setFilterValue: (value: string) => void;
  setSortValue: (value: string) => void;
}

export default function MemberFilter({
  setFilterValue,
  setSortValue,
}: MemberFilterProps) {
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    switch (e.key) {
      case "sortName":
        setSortValue(e.key);
        break;
      case "sortTeam":
        setSortValue(e.key);
        break;
      case "membersAll":
        setFilterValue("");
        break;
      case "admin":
        setFilterValue(e.key);
        break;
      case "member":
        setFilterValue(e.key);
        break;
      default:
        break;
    }
  };

  const items: MenuProps["items"] = [
    {
      type: "group",
      label: "SORT BY:",
      children: [
        {
          label: <span>Name(default)</span>,
          key: "sortName",
        },
        {
          label: <span>Team</span>,
          key: "sortTeam",
        },
      ],
    },
    {
      type: "group",
      label: "MEMBERS:",
      children: [
        {
          label: <span>All</span>,
          key: "membersAll",
        },
        {
          label: <span>admin</span>,
          key: "admin",
        },
        {
          label: <span>Member</span>,
          key: "member",
        },
      ],
    },
  ];

  return (
    <div className="filter-btn">
      <Dropdown
        menu={{ items, onClick: handleMenuClick }}
        placement="bottomLeft"
        trigger={["click"]}
      >
        <Button size="large">
          <FilterFilled />
          <span>Filter</span>
        </Button>
      </Dropdown>
    </div>
  );
}
