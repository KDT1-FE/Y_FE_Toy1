import React, { useState, useEffect } from "react";
import { Transfer, Form, message } from "antd";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../libs/firebase";
import { Rule } from "antd/lib/form";
import CustomForm from "../../common/CustomForm";
import { useTeamUserIds } from "../../../hooks/Employee/useTeamUserIds";

interface AddTeamMemberSelectProps {
  onChange: (selectedUserIds: string[]) => void;
  rules?: Rule[];
}
interface UserData {
  key: string;
  title: string;
}

function AddTeamMemberSelect({ onChange }: AddTeamMemberSelectProps) {
  const [users, setUsers] = useState<UserData[]>([]);
  const [selectedUserKeys, setSelectedUserKeys] = useState<string[]>([]);
  const teamUserIds = useTeamUserIds();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userCollectionRef = collection(db, "Users");
        const userSnapshot = await getDocs(userCollectionRef);
        const userArray: UserData[] = [];

        userSnapshot.forEach((doc) => {
          const userData = { key: doc.id, title: doc.data().name || "" };
          userArray.push(userData);
        });

        const filteredUserArray = userArray.filter(
          (user) => !teamUserIds.includes(user.key),
        );

        setUsers(filteredUserArray);
      } catch (error) {
        console.error("Error fetching users:", error);
        message.error("데이터를 불러올 수 없습니다!");
      }
    };

    fetchUsers();
  }, [teamUserIds]);

  const handleUserChange = (nextSelectedKeys: string[]) => {
    setSelectedUserKeys(nextSelectedKeys);
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
        />
      </Form.Item>
    </>
  );
}

export default AddTeamMemberSelect;
