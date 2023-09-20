import { getWorkTimeData } from 'apis';
import { useEffect, useState } from 'react';
import { usedateFormat, useSecondsFormat } from 'utils/format';
import { COMMUTE_LIST_STATE } from 'constants/time';
import { media } from 'styles/media';
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
              <StyledListTextContainer>{data.name}님</StyledListTextContainer>
              <StyledListTextContainer>
                {useSecondsFormat(data.workTime)}동안 근무하셨어요!
              </StyledListTextContainer>
              <StyledListTextContainer>
                {usedateFormat(new Date(data.timeStamp))}
              </StyledListTextContainer>
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

  ${media.tablet(`
  font-size: 1rem
`)}
`;

const StyledListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  height: 3rem;
  border-bottom: 1px solid #eeeeee;
  margin: 0 auto;
  margin-top: 2rem;

  ${media.tablet(`
  justify-content: space-around;
  width: 100%;
  height: 2rem;
  margin: .5rem;
`)}
`;

const StyledListTextContainer = styled.div`
  ${media.tablet(`
  font-size: .8rem;
`)}
`;

export default CommuteList;
