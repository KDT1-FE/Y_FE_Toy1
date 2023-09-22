import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Segmented, Table, Alert, Space, Spin } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import WorkCalendar from "./WorkCalendar";
import "../../styles/WorkTime.css";

// firebase
import { db, auth } from "../../libs/firebase";
import {
  collection,
  doc,
  getDocs,
  Timestamp,
  DocumentData,
  QueryDocumentSnapshot,
  getDoc,
  onSnapshot,
  where,
  query,
} from "firebase/firestore";

interface WorkTimeProps {
  fontSize?: string;
}

interface DataType {
  key?: string;
  name?: string;
  department?: string;
  team?: string;
  starttime: Timestamp;
  finishtime: Timestamp;
}
interface TeamDataType {
  tkey?: string;
  tname?: string;
  tdepartment?: string;
  tteam?: string;
  starttime: Timestamp;
  finishtime: Timestamp;
}

const WorkTimeList: React.FC = () => {
  const [myWorkTimeData, setMyWorkTimeData] = useState<DataType[]>([]);
  const [teamWorkTimeData, setTeamWorkTimeData] = useState<TeamDataType[]>([]);
  const [workTimeFilter, setWorkTimeFilter] =
    useState<string>("나의 출퇴근 현황");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [myTeam, setMyTeam] = useState<string>("");

  const user = auth.currentUser;
  const userUid = user ? user.uid : null;

  const columns: ColumnsType<DataType> = [
    {
      title: "이름",
      dataIndex: workTimeFilter === "나의 출퇴근 현황" ? "name" : "tname",
    },
    {
      title: "부서",
      dataIndex:
        workTimeFilter === "나의 출퇴근 현황" ? "department" : "tdepartment",
    },
    {
      title: "소속팀",
      dataIndex: workTimeFilter === "나의 출퇴근 현황" ? "team" : "tteam",
    },
    {
      title: "출근 시간",
      dataIndex: "starttime",
      sorter: {
        compare: (a, b) => {
          const aTime = a.starttime ? a.starttime.toDate().getTime() : 0;
          const bTime = b.starttime ? b.starttime.toDate().getTime() : 0;
          return aTime - bTime;
        },
        multiple: 1,
      },
      render: (starttime) =>
        starttime
          ? `${starttime.toDate().toLocaleDateString()} ${
              starttime && starttime.toDate().toLocaleTimeString()
            }`
          : "",
    },
    {
      title: "퇴근 시간",
      dataIndex: "finishtime",
      sorter: {
        compare: (a, b) => {
          const aTime = a.finishtime ? a.finishtime.toDate().getTime() : 0;
          const bTime = b.finishtime ? b.finishtime.toDate().getTime() : 0;
          return aTime - bTime;
        },
        multiple: 2,
      },
      render: (finishtime) =>
        finishtime
          ? `${finishtime.toDate().toLocaleDateString()} ${
              finishtime && finishtime.toDate().toLocaleTimeString()
            }`
          : "",
    },
  ];

  useEffect(() => {
    const fetchWorkTime = async () => {
      try {
        setIsLoading(true);
        if (workTimeFilter === "나의 출퇴근 현황") {
          const myDocRef = doc(db, `Users/${userUid}`);
          const myDocSnap = await getDoc(myDocRef);
          const myDocData = myDocSnap.data() || {};
          const myTeam = myDocData.team;
          setMyTeam(myTeam);

          const myWorkTimeRef = collection(db, `Users/${userUid}/worktime`);

          const unsubscribe = onSnapshot(myWorkTimeRef, (snapshot) => {
            const updatedMyWorkTime: DataType[] = [];
            snapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
              const myWorkTimeData = doc.data();
              updatedMyWorkTime.push({
                key: doc.id,
                name: myDocData.name || "",
                department: myDocData.department || "",
                team: myDocData.team || "",
                starttime: myWorkTimeData.starttime,
                finishtime: myWorkTimeData.finishtime,
              });
            });
            setIsLoading(false);
            setMyWorkTimeData(updatedMyWorkTime);
          });

          return () => {
            unsubscribe();
          };
        } else if (workTimeFilter === "우리팀 출퇴근 현황") {
          const teamDocQuery = query(
            collection(db, "Users"),
            where("team", "==", myTeam),
          );
          const teamDocSnapshot = await getDocs(teamDocQuery);

          const updatedTeamWorkTime: TeamDataType[] = [];

          for (const doc of teamDocSnapshot.docs) {
            const teamUserData = doc.data();
            const teamUserId = doc.id;
            const teamWorkTimeRef = collection(
              db,
              "Users",
              teamUserId,
              "worktime",
            );
            console.log(teamUserData);
            const teamWorkTimeSnapshot = await getDocs(teamWorkTimeRef);
            teamWorkTimeSnapshot.forEach((subDoc) => {
              const teamWorkTimeData = subDoc.data();
              updatedTeamWorkTime.push({
                tkey: doc.id,
                tname: teamUserData.name || "",
                tdepartment: teamUserData.department || "",
                tteam: teamUserData.team || "",
                starttime: teamWorkTimeData.starttime || null,
                finishtime: teamWorkTimeData.finishtime || null,
              });
            });
          }
          setIsLoading(false);
          setTeamWorkTimeData(updatedTeamWorkTime);
        }
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching Team worktime data", error);
      }
    };

    fetchWorkTime();
  }, [workTimeFilter, userUid, myTeam]);

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra,
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <Container>
      <LeftContainer>
        <WorkTimeText color="#999999" fontSize="1.2rem">
          오늘도 열일했다!
        </WorkTimeText>
        <br />
        <WorkTimeText># 출퇴근 일지</WorkTimeText>
        <br />
        <br />
        <Segmented
          options={["나의 출퇴근 현황", "우리팀 출퇴근 현황"]}
          value={workTimeFilter as string}
          onChange={(value) => setWorkTimeFilter(value as string)}
        />
        <TableWrapper>
          {workTimeFilter === "나의 출퇴근 현황" && (
            <Table
              columns={columns}
              dataSource={myWorkTimeData.map((item, index) => ({
                ...item,
                key: `myWorkTime_${item.key || index}`,
              }))}
              onChange={onChange}
              pagination={{ position: ["bottomCenter"] }}
            />
          )}
          {workTimeFilter === "우리팀 출퇴근 현황" && (
            <Table
              columns={columns}
              dataSource={teamWorkTimeData.map((item, index) => ({
                ...item,
                key: `teamWorkTime_${item.tkey}_${index}_${Math.random()
                  .toString(36)
                  .substr(2, 9)}`,
              }))}
              onChange={onChange}
              pagination={{ position: ["bottomCenter"] }}
            />
          )}
          <Space
            direction="vertical"
            style={{
              width: "350px",
              position: "absolute",
              top: "50%",
              left: "20%",
            }}
          >
            <Spin
              size="large"
              tip="데이터를 불러오는 중입니다. 잠시만 기다려주세요..."
              spinning={isLoading}
              className="ant-spin-text"
              style={{ margin: 0, padding: 0 }}
            >
              <div className="content" />
            </Spin>
          </Space>
          <PaginationWrapper></PaginationWrapper>
        </TableWrapper>
      </LeftContainer>
      <RightContainer>
        <WorkCalendar></WorkCalendar>
      </RightContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const LeftContainer = styled.div`
  flex: 6;
`;

const WorkTimeText = styled.span<WorkTimeProps>`
  font-size: ${(props) => props.fontSize || "1.7rem"};
  color: ${(props) => props.color || "#3A56A3"};
`;
const TableWrapper = styled.div`
  width: 100%;
  padding: 1rem;
`;
const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

const RightContainer = styled.div`
  flex: 4;
  margin-left: 5px;
`;

export default WorkTimeList;
