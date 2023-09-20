import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: 1200px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  cursor: pointer;

  a {
    color: #96a0ff;
    text-decoration: none;
  }
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
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const ImageWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Image = styled.img`
  display: inline-block;
  max-width: 100%;
  max-height: 300px;
`;

export const Contents = styled.div`
  padding-top: 40px;
  padding-bottom: 120px;
  overflow: hidden;
`;

export const MoveToListBtn = styled.button`
  margin: 0 auto;
  background-color: #484aad;
  border: none;
  border-radius: 50px;
  font-family: 'Inter';
  font-weight: 700;
  font-size: 1.5rem;
  color: #ffffff;
  cursor: pointer;

  a {
    display: block;
    color: white;
    text-decoration: none;
    padding: 10px 50px;
  }
`;
