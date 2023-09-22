import React, { useState, useEffect, useMemo } from "react";
import { Table, Skeleton, Spin } from "antd";

import { FormDataType } from "../../type/form";
import { columns } from "../../data/tableColumns";
import { useFetchData } from "../../hooks/Employee/useFetchData";
import { useNavigate } from "react-router-dom";
import { useDeleteData } from "../../hooks/Employee/useDeleteData";
import useFetchUserAccess from "../../hooks/Employee/useFetchUserAccess";

type SelectedRowData = {
  id: string;
  teamId?: string;
};

interface MemberTableProps {
  setSelectedRowKeys: (keys: SelectedRowData[]) => void;
  searchText: string;
  filterValue: string;
  sortValue: string;
}

export default function MemberTable({
  setSelectedRowKeys,
  searchText,
  filterValue,
  sortValue,
}: MemberTableProps) {
  const fetchDataParams = {
    COLLECTION_NAME: "Users",
    ORDER: "name",
  };

  const { data, loading } = useFetchData(fetchDataParams);
  const [filteredData, setFilteredData] = useState<FormDataType[]>(data);

  const navigate = useNavigate();
  const { deleteData } = useDeleteData({ COLLECTION_NAME: "Users" });
  const { userAccess, checkAdminPermission } = useFetchUserAccess();

  const memoizedColumns = useMemo(
    () => columns(navigate, deleteData, userAccess, checkAdminPermission),
    [navigate, deleteData, userAccess, checkAdminPermission],
  );

  useEffect(() => {
    let processedData = data;

    if (filterValue) {
      processedData = data.filter((item) => item.access === filterValue);
    }

    if (searchText) {
      processedData = processedData.filter(
        (item) =>
          item.name?.includes(searchText) ||
          item.department?.includes(searchText),
      );
    }

    if (sortValue === "sortName") {
      processedData.sort((a, b) => (a.name ?? "").localeCompare(b.name ?? ""));
    } else if (sortValue === "sortTeam") {
      processedData.sort((a, b) => (a.team ?? "").localeCompare(b.team ?? ""));
    }

    setFilteredData(processedData.map((item) => ({ ...item, key: item.id })));
  }, [data, filterValue, sortValue, searchText]);

  if (loading) {
    return (
      <Spin size="large">
        <Table
          dataSource={Array(8)
            .fill({})
            .map((_, idx) => ({ key: idx }))}
          columns={memoizedColumns.map((column) => ({
            ...column,
            render: () => (
              <Skeleton.Input style={{ width: "100%" }} active size="small" />
            ),
          }))}
          pagination={false}
        />
      </Spin>
    );
  }

  return (
    <Table
      dataSource={filteredData}
      columns={memoizedColumns}
      pagination={{
        defaultPageSize: 8,
        showSizeChanger: true,
      }}
      rowSelection={{
        onChange: (selectedKeys, selectedRows) => {
          const selectedIds = selectedRows
            .filter((row) => row.id)
            .map((row) => ({ id: row.id!, teamId: row.teamId }));
          setSelectedRowKeys(selectedIds);
        },
      }}
    />
  );
}
