import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db } from '../common/config';
import { doc, getDoc } from 'firebase/firestore';
import { timeToLocaleTimeString, formatMsToTime } from '../utils/formatTime';
import { useUser } from '../common/UserContext';

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
  
  useEffect(() => {
    const fetchData = async (uid: string) => {
      if (!uid) {
        return; 
      }
      
      try {
        const docRef = doc(db, 'commute', uid);
        const docSnapshot = await getDoc(docRef);
  
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          const formattedData = Object.keys(data).map((date) => ({
            date: date,
            startTime: timeToLocaleTimeString(data[date].startTime),
            endTime: timeToLocaleTimeString(data[date].endTime),
            workingTime: formatMsToTime(data[date].workingTime),
          }));
          setData(formattedData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } 
    }

    if(!user) 
      return;

    // 유저 정보
    if(user) {
      setName(user.name);
      fetchData(user.uid);
    }
  }, [user]);

  return (
    <>
      {
        user &&
        (
        <>
          <H1>{name}님의 출퇴근 기록</H1>
            {data.length > 0 ? (
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
                      <TH>{item.date}</TH>
                      <TH>{item.startTime}</TH>
                      <TH>{item.endTime}</TH>
                      <TH>{item.workingTime}</TH>
                    </tr>
                  ))}
                </TBody>
              </Table>
            ) : (
              <Message>출퇴근 기록이 없습니다.</Message>
            )}  
        </>
        )
      }
    </>
  );
};

const H1 = styled.h1`
  margin-top: 1.5rem;
  font-size: 20px;
  font-weight: 700;
`;

const Table = styled.table`
  border: 1px solid #E2E2E2;
  border-radius: 10px;
  width: 100%;
  margin-top: 0.5rem;
  margin-bottom: 4.5rem;
  border-collapse: collapse;
`;

const THead = styled.thead`
  background-color: #E2E2E2;
  padding: 8px; 

  th {
    padding: 8px;
  }
`;

const TH = styled.th`
  border-bottom: 1px solid #E2E2E2;
  padding: 6px;
`;

const TBody = styled.tbody`
  text-align: center;
`;

const Message = styled.p`
  margin-top: 0.5rem;
  color: gray;
  font-size: 16px;
  font-weight: 400;
`;