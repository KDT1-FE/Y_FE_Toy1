import { getWorkTimeData } from 'apis';
import { useEffect, useState } from 'react';
import { usedateFormat, useSecondsFormat } from 'utils/format';
import { COMMUTE_LIST_STATE } from 'constants/time';
import styled from 'styled-components';

interface IresponseArray {
  uid: string;
  timeStamp: string;
  workTime: number;
  name: string;
}

function CommuteList() {
  const [workTimeData, setWorkTimeData] = useState<IresponseArray[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseArray = await getWorkTimeData();
        if (responseArray) {
          setWorkTimeData(responseArray);
        }
      } catch (error) {
        console.log('데이터를 불러오지 못했습니다.', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {workTimeData.length === 0 ? (
        <StyledEmptyListContainer>
          <div>아직 기록된 업무 시간이 없습니다.</div>
        </StyledEmptyListContainer>
      ) : (
        workTimeData
          .slice(COMMUTE_LIST_STATE.START_INDEX, COMMUTE_LIST_STATE.LAST_INDEX)
          .map((data, index) => (
            <StyledListContainer key={index}>
              <div>{data.name}님</div>
              <div>{useSecondsFormat(data.workTime)}동안 근무하셨어요!</div>
              <div>{usedateFormat(new Date(data.timeStamp))}</div>
            </StyledListContainer>
          ))
      )}
    </>
  );
}

const StyledEmptyListContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 3rem;
  margin-top: 2rem;
`;

const StyledListContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 3rem;
  border-bottom: 1px solid #f0f0f0;
  margin-top: 2rem;
`;

export default CommuteList;
