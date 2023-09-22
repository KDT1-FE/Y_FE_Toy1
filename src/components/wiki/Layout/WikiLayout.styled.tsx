import styled from 'styled-components';

interface Props {
  color?: string;
}

export const WikiContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 1070px;
  margin: 0 0 0 5%;
  height: 79vh;
`;

export const WikiHeader = styled.div`
  padding-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 70px;
  border-bottom: 3px solid var(--color-orange);
`;

export const Title = styled.div`
  font-family: 'IBMPlexSansKR-Regular';
  font-size: 2.7rem;
  font-weight: 700;
`;

export const Primary = styled.span`
  color: var(--color-orange);
`;

export const WikiButton = styled.button`
  font-family: 'SBAggroB';
  width: 8rem;
  height: 3rem;
  background-color: var(--color-primary);
  color: var(--color-white);

  border: none;
  border-radius: 30px;
  cursor: pointer;

  transform: translateY(1px);
  transition: 0.2s;

  &:hover {
    transform: translateY(3px);
    background-color: var(--color-btn);
  }
`;

export const Contents = styled.div<Props>`
  box-sizing: border-box;
  width: 100%;
  height: 60vh;
  margin-top: 50px;
  padding: 20px 30px 40px;

  border-radius: 15px;
  background-color: ${props => {
    return props.color ? props.color : '#f2f2f2';
  }};
  overflow: auto;
`;
