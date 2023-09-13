import useInterval from 'hooks/useInterval';
import { useState } from 'react';
import styled from 'styled-components';

function LiveClock() {
  const [date, setDate] = useState(new Date());
  const tick = () => {
    setDate(new Date());
  };

  useInterval(() => {
    tick();
  }, 1000);

  return (
    <StyledTime>
      {date.getHours()} : {date.getMinutes()} : {date.getSeconds()}
    </StyledTime>
  );
}

const StyledTime = styled.div`
  font-size: 4.3rem;
  font-weight: 600;
`;

export default LiveClock;
