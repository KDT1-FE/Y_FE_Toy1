import React, { useState } from 'react';
import styled from 'styled-components';
import WithButton from '../WithButton';
import WithTime from '../WithTime';

export interface WithProps {
  title: string;
  contents: string;
  location: string;
  people: number;
  time: number;
  joined: number;
  id: string;
}

const WithContainer = styled.div<{ $nowOnView: boolean }>`
  display: ${({ $nowOnView }) => {
    return $nowOnView ? 'flex' : 'none';
  }};
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;

  gap: 1rem;

  padding: 3rem 0.5rem;
  border-radius: 1rem;
  box-sizing: border-box;

  background-color: #fffef2;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.2);
`;

const WithWrapper = styled.div`
  display: flex;
  flex-direction: column;

  gap: 1rem;

  width: 80%;
`;

const WithTitle = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 3rem;
  margin-left: 1rem;

  font-size: 2rem;
`;

const WithTop = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 3rem;

  box-sizing: border-box;
`;

const WithLocation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0.6rem 2.5rem;
  font-size: 1.2rem;
  color: #424242;
  background-color: #ffe894;
  border-radius: 1rem;
`;

const WithBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const WithBottomLeft = styled.div`
  display: flex;
  flex-direction: column;

  gap: 1rem;

  p {
    margin-left: 1rem;
    color: #5d5d5d;
  }
`;

const WithItem = ({
  id,
  title,
  joined,
  contents,
  location,
  people,
  time,
}: WithProps) => {
  const [nowOnView, setNowOnView] = useState(true);

  const unLoadItem = () => {
    setNowOnView(!nowOnView);
  };

  return (
    <WithContainer $nowOnView={nowOnView}>
      <WithWrapper>
        <WithTop>
          <WithLocation>{location}</WithLocation>
          <WithTime
            time={time}
            unLoadItem={unLoadItem}
          />
        </WithTop>
        <WithBottom>
          <WithBottomLeft>
            <WithTitle>{title}</WithTitle>
            <p>{contents}</p>
          </WithBottomLeft>
          <WithButton
            id={id}
            joined={joined}
            people={people}
          />
        </WithBottom>
      </WithWrapper>
    </WithContainer>
  );
};

export default WithItem;
