import { IworkTimeResponse, getWorkTimeData } from 'apis/WorkTime';
import { useEffect, useState } from 'react';
import { dateFormat, secondFormat } from 'utils/format';
import { COMMUTE_LIST_STATE } from 'constants/time';
import { media } from 'styles/media';
import styled from 'styled-components';

interface StyledListTextContainerProps {
  align: 'left' | 'center' | 'right';
}

function CommuteList() {
  const [workTimeData, setWorkTimeData] = useState<IworkTimeResponse[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseArray = await getWorkTimeData();
        if (responseArray) setWorkTimeData(responseArray);
      } catch (error) {
        alert('데이터를 불러오지 못했습니다. 다시 시도해주세요.');
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
              <StyledListTextContainer align="left">
                {data.name}님
              </StyledListTextContainer>
              <StyledListTextContainer align="center">
                {secondFormat(data.workTime)}동안 근무하셨어요!
              </StyledListTextContainer>
              <StyledListTextContainer align="right">
                {dateFormat(new Date(data.timeStamp))}
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
  align-items: center;
  justify-content: space-between;
  width: 80%;
  height: 3rem;
  border-bottom: 1px solid #eeeeee;
  margin: 0 auto;
  padding: 2.4rem;

  ${media.tablet(`
  align-items: center;
  width: 100%;
  height: 2rem;
  margin: .5rem;
`)}
`;

const StyledListTextContainer = styled.div<StyledListTextContainerProps>`
  flex: 1;
  text-align: ${(props) => props.align};
  ${media.tablet(`
  font-size: .8rem;
`)}
`;

export default CommuteList;
