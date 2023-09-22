import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const WithTime = styled.p<{ $isRed: boolean }>`
  font-size: 1.2em;
  font-weight: 700;
  color: ${({ $isRed }) => {
    return $isRed ? '#ff0000' : '#ffd337';
  }};
  margin-left: 2rem;
`;

type Props = {
  time: number;
  unLoadItem: () => void;
};

const index: React.FC<Props> = ({ time, unLoadItem }): JSX.Element => {
  const currentTime = Math.floor(Date.now() / 1000);
  const leftTimes = Math.floor((time - currentTime) / 60);
  const [viewTime, setViewTime] = useState<number>(leftTimes);

  useEffect(() => {
    const interval = setInterval(() => {
      setViewTime(prevTime => {
        if (prevTime <= 0) {
          unLoadItem();
        }
        return prevTime - 1;
      });
    }, 60 * 1000);

    return () => {
      return clearInterval(interval);
    };
  }, []);

  return (
    <WithTime $isRed={viewTime <= 0}>
      {viewTime > 0 ? `${viewTime}분 남음` : '마감임박'}
    </WithTime>
  );
};

export default index;
