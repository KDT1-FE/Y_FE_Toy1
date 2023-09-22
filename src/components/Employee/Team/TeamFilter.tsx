import { FilterFilled } from "@ant-design/icons";
import React from "react";
import { Button, Dropdown, MenuProps } from "antd";

interface MemberFilterProps {
  setFilterValue: (value: string) => void;
  setSortValue: (value: string) => void;
}

export default function TeamFilter({
  setFilterValue,
  setSortValue,
}: MemberFilterProps) {
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    switch (e.key) {
      case "sortName":
        setSortValue("");
        break;
      case "sortTeamName":
        setSortValue(e.key);
        break;
      case "sortDepartment":
        setSortValue(e.key);
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
          label: <span>default</span>,
          key: "sortName",
        },
        {
          label: <span>TeamName</span>,
          key: "sortTeamName",
        },
        {
          label: <span>Department</span>,
          key: "sortDepartment",
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
