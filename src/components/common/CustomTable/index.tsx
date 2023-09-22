import React from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { FormDataType } from "../../../type/form";

interface Props<TableData> {
  data: TableData[];
  columns: ColumnsType<TableData>;
  rowSelection: object;
}

function CustomTable<TableData extends FormDataType>({
  data,
  columns,
  rowSelection,
}: Props<TableData>) {
  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        rowKey={(record) => record.id || ""}
        rowSelection={rowSelection}
      />
    </>
  );
}

export default CustomTable;
