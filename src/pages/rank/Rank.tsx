import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { db } from "../../firebase";
import { IsMobile } from "utils/mediaQuery";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import Sidebar from "components/layout/Sidebar";
interface UsersData {
  id: string;
  class: string;
  email: string;
  nickName: string;
  studyTime: number;
}
interface IContainer {
  leftmargin: number;
  topmargin: number;
}

const Rank = () => {
  const [users, setUsers] = useState<UsersData[]>([]);
  const q = query(collection(db, "user"), orderBy("studyTime", "desc"), limit(100));
  const defaultImageUrl = process.env.PUBLIC_URL + "/png/default.png";

  let leftMargin = 200;
  let topMargin = 60;
  if (IsMobile()) {
    leftMargin = 0;
    topMargin = 100;
  }

  const classConverter = (userClass: Number): string => {
    switch (userClass) {
      case 0:
        return "브론즈";
      case 1:
        return "실버";
      case 2:
        return "골드";
      default:
        return "언랭";
    }
  };

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
        console.log(users);
      } catch (error) {
        console.error("데이터를 불러오는데 실패했습니다.", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <Sidebar />
      <Container leftmargin={leftMargin} topmargin={topMargin}>
        <RankWrapper>
          {users.map((usersData: UsersData, index: number) => (
            <div className="userList" key={usersData.id}>
              <div>
                <img
                  className="useList_class"
                  src={
                    usersData.class !== undefined && usersData.class !== null
                      ? process.env.PUBLIC_URL + `/png/class_${usersData.class}.png`
                      : defaultImageUrl
                  }
                  alt={usersData.class}
                />
                <div className="class">{classConverter(parseInt(usersData.class))}</div>
              </div>

              <div className="userList__rank">{index + 1}</div>
              <div className="userList__nickName">{usersData.nickName}</div>
              <div className="userList__studyTime">{usersData.studyTime}분</div>
            </div>
          ))}
        </RankWrapper>
      </Container>
    </>
  );
};

const Container = styled.section<IContainer>`
  position: relative;
  left: ${(props) => props.leftmargin}px;
  height: calc(100% - ${(props) => props.topmargin}px);
  width: calc(100% - ${(props) => props.leftmargin}px);
  padding: 5px;
  box-sizing: border-box;
`;

const RankWrapper = styled.div`
  display: flex;
  width: auto;
  height: auto;
  text-align: center;
  flex-direction: column;
  border-radius: 5px;
  margin-bottom: 50px;
  margin-top: 16px;

  .userList {
    font-weight: 700;
    font-size: 25px;
    display: flex;
    align-items: center;
    transition: all 0.3s ease;
    margin: 10px;
    background-color: ${(props) => props.theme.studyRank};
    border-radius: 5px;
  }

  .userList img {
    height: 50px;
  }

  .class {
    font-size: 12px;
  }

  .userList:hover {
    background-color: var(--main-color);
    transform: scale(1.03);
  }

  .userList__rank {
    flex: 1 1 10%;
  }

  .userList__nickName {
    flex: 1 1 20%;
  }

  .userList__studyTime {
    flex: 1 1 70%;
  }
`;

export default Rank;
