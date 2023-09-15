import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const NavBar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 80px;
  background-color: #484aad;
`;

export const NavTitle = styled.div`
  font-size: 48px;
  color: white;
  font-family: 'PlayfairDisplay';
  width: 25%;

  text-align: center;
`;

export const NavCategoryBox = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
`;

export const NavModalBox = styled.div`
  width: 25%;
  display: flex;
  justify-content: center;
  gap: 40px;
  align-items: center;
`;

export const NavCategoryLink = styled(Link)`
  font-family: 'RobotoMono';
  font-size: 24px;
  text-decoration: none;
  color: white;
`;
