import { useState, useEffect } from "react";
import { db } from "../../libs/firebase";
import { collection, getDocs, DocumentReference } from "firebase/firestore";
import { message } from "antd";

export function useTeamUserIds() {
  const [teamUserIds, setTeamUserIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchTeamUserIds = async () => {
      try {
        const teamsCollectionRef = collection(db, "Teams");
        const teamsSnapshot = await getDocs(teamsCollectionRef);
        const userIds: string[] = [];

        teamsSnapshot.forEach((teamDoc) => {
          const userData: string[] = teamDoc.data().userId || [];
          userIds.push(...userData);
        });

        setTeamUserIds(userIds);
      } catch (error) {
        console.error("Error fetching team user IDs:", error);
        message.error("데이터를 불러올 수 없습니다!");
      }
    };

    fetchTeamUserIds();
  }, []);

  return teamUserIds;
}
