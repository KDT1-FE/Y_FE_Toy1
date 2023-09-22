import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { db } from "../../firebase";
import { IsMobile } from "utils/mediaQuery";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import Sidebar from "components/layout/Sidebar";
import Comment from "components/template/Comment";

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
  const [podiumUsers, setPodiumdUsers] = useState<UsersData[]>([]);
  const q = query(
    collection(db, "user"),
    orderBy("studyTime", "desc"),
    limit(100)
  );
  const defaultImageUrl = process.env.PUBLIC_URL + "/png/class_default.png";

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
        setPodiumdUsers([data[1], data[0], data[2]]);
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
          <div className="userPodium">
            {podiumUsers.map((usersData: UsersData, index: number) => (
              <div className={`userBox__${index + 1}`} key={usersData.id}>
                <img
                  className="crown"
                  src={process.env.PUBLIC_URL + `/png/user__${index + 1}.png`}
                  alt="crown"
                />
                <div className={`user__${index + 1}`}>
                  <img
                    className="user__image-podium"
                    src={process.env.PUBLIC_URL + "/png/user_default.png"}
                    alt="프로필"
                  />
                </div>
                <div className="userList__detailBox">
                  <div className="userList__nickName-podium">
                    {usersData.nickName}
                  </div>
                  <div className="userList__studyTime">
                    <div className="studyTime">{usersData.studyTime}분</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {users.slice(4).map((usersData: UsersData, index: number) => (
            <div className="userList" key={usersData.id}>
              <div className="userList__rank">{index + 4}</div>
              <img
                className="user__image"
                src={process.env.PUBLIC_URL + "/png/user_default.png"}
                alt="프로필"
              />
              <div className="userList__nickName">{usersData.nickName}</div>
              <div className="userList__studyTime">
                <div className="studyTime">{usersData.studyTime}분</div>
              </div>

              <div className="usetList__emblem">
                <img
                  className="useList__class"
                  src={
                    usersData.class !== undefined && usersData.class !== null
                      ? process.env.PUBLIC_URL +
                        `/png/class_${usersData.class}.png`
                      : defaultImageUrl
                  }
                  alt={usersData.class}
                />
                <div className="class">
                  {classConverter(parseInt(usersData.class))}
                </div>
              </div>
            </div>
          ))}
        </RankWrapper>
        <Comment />
      </Container>
    </>
  );
};

const Container = styled.section<IContainer>`
  position: relative;
  left: ${(props) => props.leftmargin}px;
  height: calc(100% - ${(props) => props.topmargin}px);
  width: calc(100% - ${(props) => props.leftmargin}px);
  padding: 5px 30px 5px 30px;
  box-sizing: border-box;
`;

const RankWrapper = styled.div`
  display: flex;
  width: auto;
  height: auto;
  text-align: center;
  flex-direction: column;
  border-radius: 5px;
  margin: 70px;
  background-color: ${(props) => props.theme.studyRank};

  .userList {
    font-weight: 700;
    font-size: 16px;
    display: flex;
    align-items: center;
    transition: all 0.3s ease;
    margin: 10px;
    background-color: ${(props) => props.theme.body};
    border-radius: 5px;
  }

  .userList img {
    height: 100px;
  }

  .class {
    font-size: 12px;
    margin-bottom: 10px;
  }

  .userList:hover {
    background-color: var(--main-color);
    transform: scale(1.03);
  }

  .userList__rank {
    flex: 1 1 10%;
    font-size: 25px;
  }

  .userList__nickName {
    font-size: 25px;
    flex: 1 1 40%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .userList__studyTime {
    flex: 1 1 50%;
    display: flex;
    justify-content: center;
  }

  .usetList__emblem {
    flex: 1 1 30%;
  }

  .studyTime {
    width: 100px;
    height: auto;
    background-color: ${(props) => props.theme.studyRank};
    border-radius: 5%;
    padding: 10px;
    text-align: center;
    font-size: 25px;
    font-weight: 700;
  }

  .user__image {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin: 10px;
  }
  .user__image img {
    object-fit: cover;
  }

  .userPodium {
    display: flex;
    justify-content: center;
    position: relative;
    height: 450px;
  }

  .user__2 {
    width: 150px;
    height: 150px;
    background-color: var(--main-color);
    margin: 0 10px 10px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .user__1 {
    width: 150px;
    height: 150px;
    background-color: var(--main-color);
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .user__3 {
    width: 150px;
    height: 150px;
    background-color: var(--main-color);
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .crown {
    width: 100px;
    height: auto;
  }

  .userBox__1 {
    width: 200px;
    transform: translateY(50px);
  }
  .userBox__2 {
    width: 200px;
  }

  .userBox__3 {
    width: 200px;
    transform: translateY(70px);
  }

  .user__image-podium {
    height: 100px;
    width: 100px;
  }

  .userList__nickName-podium {
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 10px;
    color: ${(props) => props.theme.text};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export default Rank;
