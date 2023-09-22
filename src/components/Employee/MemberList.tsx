import React, { useState, useEffect } from "react";
import { Button, notification } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import useFetchUserAccess from "../../hooks/Employee/useFetchUserAccess";
import { useDeleteData } from "../../hooks/Employee/useDeleteData";
import MemberFilter from "./MemberFilter";
import MemberSearch from "./MemberSearch";
import MemberTable from "./MemberTable";
import AddMemberModal from "./AddMemberModal";
import CustomForm from "../common/CustomForm";
import styled from "styled-components";

export default function MemberList() {
  const { userAccess, checkAdminPermission, notified } = useFetchUserAccess();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState<selectedRowKeys[]>([]);

  type selectedRowKeys = {
    id: string;
    teamId?: string;
  };

  const DeleteDataParams = {
    COLLECTION_NAME: "Users",
  };
  const { deleteData } = useDeleteData(DeleteDataParams);
  const handleDelete = async () => {
    if (!checkAdminPermission()) {
      notification.warning({
        message: "경고",
        description: "admin 권한만 수정 할 수 있습니다!",
        duration: 3,
      });
      return;
    }
    try {
      for (const data of selectedRowKeys) {
        await deleteData(data.id, data.teamId);
      }
      setSelectedRowKeys([]);
    } catch (err) {
      console.error(err);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (userAccess === "admin") {
      notification.success({
        message: "환영합니다!",
        description: "관리자 권한으로 접속하셨습니다.",
        duration: 3,
      });
    }
  }, [notified]);

  return (
    <>
      <Header>
        <h2>Employee</h2>
      </Header>
      <List>
        <CardHeader className="card-header">
          <ToggleWrap>
            <MemberFilter
              setFilterValue={setFilterValue}
              setSortValue={setSortValue}
            />
            <MemberSearch onSearch={setSearchText} />
          </ToggleWrap>
          <ToggleWrap>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={openModal}
              size="large"
            >
              Add
            </Button>

            <CustomForm.Modal
              title="멤버 등록"
              width={700}
              footer={null}
              open={isModalOpen}
              onCancel={closeModal}
            >
              <AddMemberModal onCancel={closeModal} />
            </CustomForm.Modal>
            <Button
              danger={true}
              icon={<DeleteOutlined />}
              size="large"
              onClick={handleDelete}
            ></Button>
          </ToggleWrap>
        </CardHeader>
        <ListTable>
          <MemberTable
            setSelectedRowKeys={setSelectedRowKeys}
            searchText={searchText}
            filterValue={filterValue}
            sortValue={sortValue}
          />
        </ListTable>
      </List>
    </>
  );
}

const Header = styled.div`
  margin: 0;
  padding: 0;
  border-bottom: 1px solid #f0f0f0;
`;

const List = styled.div`
  border-radius: 8px;
  word-wrap: break-word;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 1.5rem;
`;

const ToggleWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
`;

const ListTable = styled.div`
  width: 100%;
`;
