import { useEffect, useState } from 'react';
import styled from 'styled-components';

function LiveClock() {
  const [date, setDate] = useState(new Date());
  const tick = () => {
    setDate(new Date());
  };
  useEffect(() => {
    const timeId = setInterval(() => tick(), 1000);

    return () => {
      clearInterval(timeId);
    };
  });

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
