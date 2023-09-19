import { INTERVAL } from 'constants/time';
import useInterval from 'hooks/useInterval';
import { useState } from 'react';
import styled from 'styled-components';
import { media } from 'styles/media';
import { liveClockFormat } from 'utils/format';

function LiveClock() {
  const [date, setDate] = useState(new Date());
  const tick = () => {
    setDate(new Date());
  };

  useInterval(() => {
    tick();
  }, INTERVAL);

  return <StyledTime>{liveClockFormat(date)}</StyledTime>;
}

const StyledTime = styled.div`
  font-size: 4.3rem;
  font-weight: 600;

  padding: 0 0.5rem;

  ${media.mobile(`
  font-size: 2.5rem;
`)}
`;

export default LiveClock;
