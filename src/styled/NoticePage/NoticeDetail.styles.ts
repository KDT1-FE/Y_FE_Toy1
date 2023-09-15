import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: 1200px;
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 100px;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Subject = styled.div`
  font-family: 'Inter';
  font-weight: 700;
  font-size: 2.2rem;
  margin-bottom: 30px;
`;

export const DateAndActionsWrapper = styled.div`
  font-family: 'Inter';
  font-size: 0.875rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Date = styled.div`
  text-align: center;
`;

export const ActionsWrapper = styled.div`
  width: 70px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
`;

export const EditBtn = styled.div`
  color: #96a0ff;
  cursor: pointer;
`;

export const DeleteBtn = styled.div`
  color: #d57b7b;
  cursor: pointer;
`;

export const Underline = styled.div`
  border-bottom: 1px solid black;
  margin: 10px 0 26px;
`;

export const Body = styled.div`
  width: 100%;
  min-height: 500px;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const Image = styled.img`
  display: inline-block;
`;

export const Contents = styled.div`
  padding-top: 40px;
  padding-bottom: 120px;
  overflow: hidden;
`;

export const MoveToListBtn = styled.button`
  margin: 0 auto;
  width: 200px;
  height: 50px;
  background-color: #484aad;
  border: none;
  border-radius: 50px;
  font-family: 'Inter';
  font-weight: 700;
  font-size: 1.5rem;
  color: #ffffff;
  cursor: pointer;

  a {
    color: white;
    text-decoration: none;
  }
`;
