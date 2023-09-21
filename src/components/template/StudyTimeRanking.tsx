import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { db } from "../../firebase";
import { ThemeContext } from "../../provider/darkModeProvider";

import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";

interface UsersData {
  id: string;
  class: number;
  email: string;
  nickName: string;
  studyTime: number;
}

const StudyTimeRanking = () => {
  const [users, setUsers] = useState<UsersData[]>([]);
  const q = query(collection(db, "user"), orderBy("studyTime", "desc"), limit(5));
  const { currentTheme } = useContext(ThemeContext);
  const theme: "dark" | "light" = currentTheme;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const postSnap = await getDocs(q);
        const data = postSnap.docs.map((doc) => {
          const docData = doc.data();
          return {
            // 다양한 falsy값으로 누락되면 ||로 바꿔야함
            id: doc.id,
            class: docData.class ?? 0,
            email: docData.email ?? "",
            nickName: docData.nickName ?? "",
            studyTime: docData.studyTime ?? 0,
          };
        });
        setUsers(data);
      } catch (error) {
        console.error("데이터를 불러오는데 실패했습니다.", error);
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <h1>공부시간 랭킹</h1>
      <RankWrapper>
        {users.map((usersData: UsersData, index: number) => (
          <div className="userList" key={usersData.id}>
            <div className="userList__icon">
              <img src={process.env.PUBLIC_URL + `/svg/number/${theme}/${index + 1}_icon-${theme}.svg`} alt="오류" />
            </div>
            <div className="userList__nickName">{usersData.nickName}</div>
            <div className="userList__studyTime">{usersData.studyTime}분</div>
          </div>
        ))}
      </RankWrapper>
    </>
  );
};

const RankWrapper = styled.div`
  display: flex;
  width: auto;
  height: auto;
  text-align: center;
  flex-direction: column;
  border-radius: 5px;
  margin-bottom: 30px;
  margin-top: 16px;

  .userList {
    font-weight: 700;
    font-size: 25px;
    display: flex;
    align-items: center;
    transition: all 0.3s ease;
    margin: 10px;
    background-color: ${(props) => props.theme.Userinfo};
    border-radius: 5px;
  }

  .userList:hover {
    background-color: var(--main-color);
    transform: scale(1.03);
  }

  .userList__icon {
    flex: 1 1 10%;
  }

  .userList__nickName {
    flex: 1 1 20%;
  }

  .userList__studyTime {
    flex: 1 1 70%;
  }
`;

export default StudyTimeRanking;
