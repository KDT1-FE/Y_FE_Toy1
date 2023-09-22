import React, { useState, useEffect } from "react";
import { Transfer, Form, message, Avatar, Tooltip } from "antd";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../libs/firebase";
import { Rule } from "antd/lib/form";
import CustomForm from "../../common/CustomForm";
import { useTeamUserIds } from "../../../hooks/Employee/useTeamUserIds";

interface EditTeamMemberSelectProps {
  isEditMode: boolean;
  onChange: (selectedUserIds: string[]) => void;
  rules?: Rule[];
  prevUserIds?: string[];
}
interface UserData {
  key: string;
  title: string;
  photo?: string;
}
function EditTeamMemberSelect({
  isEditMode,
  prevUserIds,
  onChange,
}: EditTeamMemberSelectProps) {
  const [users, setUsers] = useState<UserData[]>([]);
  const [selectedUserKeys, setSelectedUserKeys] = useState<string[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<UserData[]>([]);

  const teamUserIds = useTeamUserIds();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userCollectionRef = collection(db, "Users");
        const userSnapshot = await getDocs(userCollectionRef);
        const userArray: UserData[] = [];

        userSnapshot.forEach((doc) => {
          const userData = {
            key: doc.id,
            title: doc.data().name,
            photo: doc.data().photo || "",
          };
          userArray.push(userData);
        });

        const filteredUserArray = userArray.filter(
          (user) => !teamUserIds.includes(user.key),
        );

        if (prevUserIds && prevUserIds.length > 0) {
          const selectedUserData: UserData[] = [];

          prevUserIds.forEach((userId) => {
            const userToAdd = userArray.find((user) => user.key === userId);
            if (userToAdd) {
              filteredUserArray.push(userToAdd);
              selectedUserData.push(userToAdd);
            }
          });

          setSelectedUsers(selectedUserData);

          const selectedKeys = selectedUserData.map((user) => user.key);
          setSelectedUserKeys(selectedKeys);
        }

        setUsers(filteredUserArray);

        if (prevUserIds && prevUserIds.length > 0) {
          const selectedKeys = userArray
            .filter((user) => prevUserIds.includes(user.key))
            .map((user) => user.key);

          setSelectedUserKeys(selectedKeys);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        message.error("데이터를 불러올 수 없습니다!");
      }
    };
    fetchUsers();
  }, [prevUserIds, teamUserIds]);

  const handleUserChange = (nextSelectedKeys: string[]) => {
    setSelectedUserKeys(nextSelectedKeys);
    const nextSelectedUsers = users.filter((user) =>
      nextSelectedKeys.includes(user.key),
    );
    setSelectedUsers(nextSelectedUsers);
    onChange(nextSelectedKeys);
  };
  const { required } = CustomForm.useValidate();

  return (
    <>
      <Form.Item label="팀원" name="userId" rules={[required()]}>
        <Transfer
          dataSource={users}
          targetKeys={selectedUserKeys}
          onChange={handleUserChange}
          render={(item) => item.title}
          showSearch
          listStyle={{ width: "100%" }}
          disabled={!isEditMode}
        />
      </Form.Item>
      <div style={{ marginLeft: "38px", marginBottom: "16px" }}>
        <Avatar.Group
          maxStyle={{
            color: "#f56a00",
            backgroundColor: "#fde3cf",
            cursor: "pointer",
          }}
          maxPopoverTrigger="click"
          size="large"
        >
          {selectedUsers.map((user) => (
            <Tooltip key={user.key} title={user.title} placement="top">
              <Avatar key={user.key} src={user.photo}>
                {user.title}
              </Avatar>
            </Tooltip>
          ))}
        </Avatar.Group>
      </div>
    </>
  );
}

export default EditTeamMemberSelect;
