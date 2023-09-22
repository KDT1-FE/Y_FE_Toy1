import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import sidebar from '../../../assets/sidebar.svg';

const SidebarWikiWrapper = styled.div`
  position: relative;
  width: 10rem;
  min-height: 20rem;
  height: 30rem;
  padding: 2rem;

  background-color: var(--color-beige);
  border-radius: 1rem;
  box-shadow: 0 0.2rem 0.2rem 0 #c3c3c3;

  color: var(--color-black);
  white-space: nowrap;
  overflow: visible;

  .sidebar__wiki--header {
    display: flex;
    gap: 0.5rem;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 1.2rem;

    .sidebar__wiki--icon {
      width: 2rem;
    }

    h2 {
      font-size: 1.2rem;
    }
  }

  a {
    text-decoration: none;
    color: var(--color-black);
  }

  ul {
    font-size: 0.8rem;
  }

  li {
    margin-bottom: 0.7rem;
  }
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: var(--color-black);
  display: block;
  padding: 0.8rem 1.5rem;
  border-radius: 0.7rem;
  transition: 0.5s;

  &:hover {
    text-decoration: none;
    background-color: #fff0b8;
    box-shadow: inset 0 0.1rem 0.1rem 0 #f6e6ac;
  }

  &.active {
    font-weight: 700;
    color: #ffa800;
    text-decoration: none;
    background-color: #fff0b8;
    box-shadow: inset 0 0.1rem 0.1rem 0 #f6e6ac;
  }
`;

const SidebarWiki = () => {
  return (
    <SidebarWikiWrapper>
      <div className="sidebar__wiki--header">
        <img
          className="sidebar__wiki--icon"
          src={sidebar}
          alt="sidebar"
        />
        <h2>위키</h2>
      </div>
      <nav>
        <ul>
          <li>
            <StyledNavLink to="/wiki/notice">공지사항</StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/wiki/intro">소개</StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/wiki/with">같이 먹을 사람 구해요</StyledNavLink>
          </li>
        </ul>
      </nav>
    </SidebarWikiWrapper>
  );
};

export default SidebarWiki;
