import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  getDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../libs/firebase";
import { FormDataType } from "../../type/form";
import { message } from "antd";

export function useFetchTeamData() {
  const [loading, setLoading] = useState(true);
  const [teamData, setTeamData] = useState<FormDataType[]>([]);

  useEffect(() => {
    const teamCollectionRef = collection(db, "Teams");
    const sortedQuery = query(teamCollectionRef, orderBy("createdAt")); // "createdAt" 필드를 기준으로 정렬

    const unsubscribe = onSnapshot(sortedQuery, (querySnapshot) => {
      const teamArray: any[] = [];

      querySnapshot.forEach((doc) => {
        const teamData = { id: doc.id, ...doc.data() };
        teamArray.push(teamData);
      });

      const fetchTeamUsers = async () => {
        const dataWithUsers = await Promise.all(
          teamArray.map(async (team) => {
            const userIds = team.userId
              ? Array.isArray(team.userId)
                ? team.userId
                : [team.userId]
              : [];
            const teamUserPromises = userIds.map(async (userId: string) => {
              let userData = {};
              if (userId) {
                const userDocRef = doc(db, "Users", userId);
                try {
                  const userDoc = await getDoc(userDocRef);
                  if (userDoc.exists()) {
                    userData = {
                      id: userDoc.id,
                      ...userDoc.data(),
                    } as FormDataType;
                  }
                } catch (error) {
                  console.error("Error fetching user data:", error);
                  message.error("데이터를 불러올 수 없습니다!");
                }
              }

              return userData;
            });
            const teamUsers = await Promise.all(teamUserPromises);

            return {
              ...team,
              teamUsers,
            };
          }),
        );
        setTeamData(dataWithUsers);
        setLoading(false);
      };
      fetchTeamUsers();
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return { loading, teamData };
}
