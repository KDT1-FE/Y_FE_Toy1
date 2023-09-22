import React from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import headerIconSvg from '../../../assets/logo.png';
import LoginButton from './LoginBtn';

interface StyledHeaderProps {
  transparent: string;
}

const HeaderWrapper = styled.div<StyledHeaderProps>`
  font-family: 'SBAggroB';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 5rem;
  color: #ffd850;
  font-weight: 700;
  background-color: ${props => {
    return props.transparent === 'true' ? 'rgba(57, 57, 57, 0.5)' : '#393939';
  }};
  z-index: 9;
`;

const Inner = styled.div`
  width: 90%;
  max-width: 1400px;
  height: 100%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LeftWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
`;

const HeaderIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;

const LeftTitle = styled.h1`
  font-size: 1.2rem;
`;

const RightWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: auto;
`;

const RightItem = styled.li`
  margin: 0.5rem;
`;

const NavItem = styled(NavLink)`
  color: var(--color-white);
  text-decoration: none;

  &.active {
    color: var(--color-primary);
  }
`;

const RightList = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MyPageButton = styled.button`
  font-size: 1rem;
  color: var(--color-white);
  background-color: var(--color-primary);
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

const StyledHeader: React.FC<StyledHeaderProps> = ({ transparent }) => {
  const navigate = useNavigate();
  const handleGoToHome = () => {
    navigate('/');
  };

  return (
    <HeaderWrapper transparent={transparent}>
      <Inner>
        <LeftWrapper>
          <HeaderIcon
            src={headerIconSvg}
            alt="headerIcon"
          />
          <LeftTitle onClick={handleGoToHome}>SWAL</LeftTitle>
        </LeftWrapper>
        <RightWrapper>
          <RightList>
            <RightItem>
              <NavItem
                className={({ isActive }) => {
                  return isActive ? 'nav__active' : 'nav__default';
                }}
                to="/"
              >
                Home
              </NavItem>
            </RightItem>
            <RightItem>
              <NavItem
                className={({ isActive }) => {
                  return isActive ? 'nav__active' : 'nav__default';
                }}
                to="/wiki"
              >
                Wiki
              </NavItem>
            </RightItem>
            <RightItem>
              <NavItem
                className={({ isActive }) => {
                  return isActive ? 'nav__active' : 'nav__default';
                }}
                to="/gallery"
              >
                Gallery
              </NavItem>
            </RightItem>
          </RightList>
          <LoginButton />
        </RightWrapper>
      </Inner>
    </HeaderWrapper>
  );
};

export default StyledHeader;
