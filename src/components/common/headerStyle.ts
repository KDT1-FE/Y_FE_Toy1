import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Container = styled.div`
  position: sticky;
  top: 0;
`;

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 3.375rem;
  padding: 0rem 5rem;

  background: var(--color-white);
  border: 0.06rem solid var(--color-white);
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Logo = styled.span`
  color: var(--color-dark-gray);
  font-weight: 700;
  font-size: 1.13rem;
  line-height: normal;
  text-align: left;
`;

export const UserName = styled.span`
  color: var(--color-dark-gray);
  font-size: 0.88rem;
  line-height: normal;
  text-align: left;

  margin-right: 1.25rem;
`;

export const WorkingTime = styled.div`
  border-radius: 4px;
  border: 1px solid var(--color-medium-gray);

  background: var(--color-white);

  padding: 0.3125rem 0.6875rem;
  margin-right: 0.4375rem;

  color: var(--color-dark-gray);
  font-weight: 400;
  font-size: 0.875rem;
  line-height: normal;
`;

export const LogoutBtn = styled.button`
  display: flex;
  align-items: center;

  background-color: var(--color-white);
  color: var(--color-dark-gray);

  border: 0;

  font-size: 0.875rem;
  line-height: 1.25rem;
  cursor: pointer;

  margin-left: 1.25rem;

  &:hover {
    text-decoration: underline;
  }
  &::before {
    content: "";
    background: #c8c8c8;

    width: 1px;
    height: 0.875rem;

    display: block;

    position: relative;
    left: -1.25rem;
  }
`;

export const Bottom = styled.nav`
  background: var(--color-main);
  border: 0.06rem solid var(--color-white);

  height: 3.375rem;
  padding: 0rem 5rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NavSpan = styled(NavLink)<{ margin_r?: string }>`
  color: var(--color-white);
  font-weight: 500;
  font-size: 1rem;
  line-height: normal;
  margin-right: ${({ margin_r }) => margin_r};

  &.active {
    font-weight: 700;
  }
`;
