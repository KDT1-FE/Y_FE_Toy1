import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db } from '../common/config';
import { collection, getDocs } from 'firebase/firestore';
import { Time, formatMsToTime } from '../utils/formatTime';
import { useUser } from '../common/UserContext';
import LoadingSpinner from './LoadingSpinner';

type CommuteData = {
  date: string;
  startTime: string;
  endTime: string;
  workingTime: string;
};

export default function Carousel() {
  const { user } = useUser();
  const [name, setName] = useState<string>('');
  const [data, setData] = useState<CommuteData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async (uid: string) => {
      if (!uid) {
        return;
      }

      try {
        const docRef = collection(db, `commute/${uid}/commuteDays`);
        const querySnapshot = await getDocs(docRef);

        const formattedData: CommuteData[] = [];

        querySnapshot.forEach((doc) => {
          const date = doc.id;
          const sessions = doc.data().session;

          // sessions 마지막 데이터
          const lastSession = sessions[sessions.length - 1];

          const start = new Time(lastSession.startTime);
          const end = new Time(lastSession.endTime);

          formattedData.push({
            date: date,
            startTime: start.time,
            endTime: end.time,
            workingTime: formatMsToTime(lastSession.workingTime),
          });
        });

        // 날짜 내림차순 정렬
        formattedData.sort((a, b) => {
          return b.date.localeCompare(a.date);
        });

        setData(formattedData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    if (!user) return;

    // 유저 정보
    if (user) {
      // console.log(user);
      setName(user.name);
      fetchData(user.uid);
    }
  }, [user]);

  return (
    <>
      {user &&
        (isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <H2>{name}님의 출퇴근 기록</H2>
            {data.length > 0 ? (
              <TableContainer>
                <Table>
                  <THead>
                    <tr>
                      <th>날짜</th>
                      <th>출근 시간</th>
                      <th>퇴근 시간</th>
                      <th>근무 시간</th>
                    </tr>
                  </THead>
                  <TBody>
                    {data.map((item, index) => (
                      <tr key={index}>
                        <TD>{item.date}</TD>
                        <TD>{item.startTime}</TD>
                        <TD>{item.endTime}</TD>
                        <TD>{item.workingTime}</TD>
                      </tr>
                    ))}
                  </TBody>
                </Table>
              </TableContainer>
            ) : (
              <Message>출퇴근 기록이 없습니다.</Message>
            )}
          </>
        ))}
    </>
  );
}

const H2 = styled.h2`
  margin-top: 1.5rem;
  font-size: 18px;
  font-weight: 700;
`;
const TableContainer = styled.div`
  @media screen and (max-width: 700px) {
    width: 100%;
    overflow-x: scroll;
  }
`;
const Table = styled.table`
  border-radius: 4px;
  box-sizing: border-box;
  width: 100%;
  margin-top: 10px;
  border-spacing: 0;
  overflow: hidden;
  padding: 0;
  border: 1px solid ${(props) => props.theme.colors.border};
  @media screen and (max-width: 700px) {
    min-width: 500px;
  }
`;

const THead = styled.thead`
  background-color: #eee;
  padding: 8px;

  th {
    padding: 8px;
    font-size: 16px;
    font-weight: bold;
    border-bottom: 1px solid ${(props) => props.theme.colors.border};
  }
`;

const TD = styled.td`
  padding: 8px;
`;

const TBody = styled.tbody`
  text-align: center;
`;

const Message = styled.p`
  color: gray;
  font-size: 16px;
  font-weight: 400;
`;
