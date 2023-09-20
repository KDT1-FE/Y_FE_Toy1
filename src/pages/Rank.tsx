import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { db } from "../firebase";

import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import Sidebar from "components/Sidebar";
interface UsersData {
  id: string;
  class: number;
  email: string;
  nickName: string;
  studyTime: number;
}

const Rank = () => {
  const [users, setUsers] = useState<UsersData[]>([]);

  const q = query(collection(db, "user"), orderBy("studyTime", "desc"), limit(100));

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
      <Container>
        <RankWrapper>
          <table>
            <thead>
              <tr>
                <th>순위</th>
                <th>닉네임</th>
                <th>클래스</th>
                <th>공부 시간</th>
              </tr>
            </thead>
            <tbody>
              {users.map((usersData: UsersData, index: number) => (
                <tr key={usersData.id}>
                  <td>
                    <img src={process.env.PUBLIC_URL + `/svg/number/${index + 1}_icon.svg`} alt="오류" />
                  </td>
                  <td>{usersData.nickName}</td>
                  <td>{usersData.class}</td>
                  <td>{usersData.studyTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </RankWrapper>
      </Container>
    </>
  );
};

const Container = styled.section`
  position: relative;
  left: 200px;
  height: calc(100% - 60px);
  width: calc(100% - 200px);
  padding: 5px;
  box-sizing: border-box;
`;

const RankWrapper = styled.div`
  width: auto;
  height: auto;
  margin-bottom: 5px;
  display: flex;
  /* justify-content: space-between; */
  text-align: center;
  /* align-items: center; */
  table {
    width: 100%; /* 테이블 전체 너비를 화면 너비에 맞춤 */
    table-layout: fixed; /* 테이블 레이아웃을 고정된 너비로 설정 */
  }

  /* thead {
    background-color: red;
  } */

  td {
    border-top: 2px solid black;
  }

  /* th,
  td {
    width: 25%; // 각 셀의 너비를 테이블 너비의 25%로 지정
  } */
`;


export default Rank;
