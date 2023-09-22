import React from "react";
import { Input } from "antd";

interface MemberSearchProps {
  onSearch: (searchText: string) => void;
}

export default function MemberSearch({ onSearch }: MemberSearchProps) {
  const handleSearch = (value: string) => {
    onSearch(value);
  };

  const { Search } = Input;

  return (
    <Search
      placeholder="팀명 검색"
      allowClear
      size="large"
      style={{ width: 300 }}
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
}
