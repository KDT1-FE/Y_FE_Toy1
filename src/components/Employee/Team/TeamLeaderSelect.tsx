import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../libs/firebase";
import { useTeamUserIds } from "../../../hooks/Employee/useTeamUserIds";
import CustomForm from "../../common/CustomForm";
import { message } from "antd";

interface UserData {
  key: string;
  title: string;
}

interface TeamLeaderSelectProps {
  readOnly: boolean;
}

function TeamLeaderSelect({ readOnly }: TeamLeaderSelectProps) {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const teamUserIds = useTeamUserIds();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userCollectionRef = collection(db, "Users");
        const userSnapshot = await getDocs(userCollectionRef);
        const userArray: UserData[] = userSnapshot.docs.map((doc) => ({
          key: doc.id,
          title: doc.data().name || "이름 없음",
        }));

        const filteredUserArray = userArray.filter(
          (user) => !teamUserIds.includes(user.key),
        );

        setUsers(filteredUserArray);
      } catch (error) {
        console.error("Error fetching users:", error);
        message.error("멤버를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [teamUserIds]);

  const { required } = CustomForm.useValidate();

  return (
    <CustomForm.SearchSelect
      loading={loading}
      rules={[required()]}
      item={users}
      label="팀 리더"
      name="leader"
      readOnly={readOnly}
    />
  );
}

export default TeamLeaderSelect;
