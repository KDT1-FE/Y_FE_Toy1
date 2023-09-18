import { getWorkTimeData } from 'apis';
import { useEffect, useState } from 'react';
import usedateFormat from 'hooks/usedateFormat';
import useSecondsFormat from 'hooks/useSecondsFormat';
import styled from 'styled-components';

interface IresponseArray {
  uid: string;
  timeStamp: string;
  workTime: number;
  name: string;
}

function CommuteList() {
  const [workTimeData, setWorkTimeData] = useState<IresponseArray[]>([]);
  const reversedTimeData = [...workTimeData].reverse();

  useEffect(() => {
    const fetchDataFromFirestore = async () => {
      try {
        const responseArray = await getWorkTimeData();
        if (responseArray) {
          setWorkTimeData(responseArray);
        }
      } catch (error) {
        console.log('데이터를 불러오지 못했습니다.', error);
      }
    };
    fetchDataFromFirestore();
  }, []);

  return (
    <>
      <ul>
        {reversedTimeData.slice(0, 5).map((data: IresponseArray) => (
          <StyledListContainer key={data.uid}>
            <span>{data.name}님</span>
            <span>{useSecondsFormat(data.workTime)}동안 근무하셨어요!</span>
            <span>{usedateFormat(new Date(data.timeStamp))}</span>
          </StyledListContainer>
        ))}
      </ul>
    </>
  );
}

const StyledListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 3rem;
  border-bottom: 1px solid #f0f0f0;
  margin-top: 2rem;
`;

export default CommuteList;
