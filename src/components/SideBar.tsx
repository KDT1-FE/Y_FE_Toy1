import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const SideBar = () => {
  const location = useLocation();

  const renderCategories = () => {
    switch (location.pathname) {
      case '/wiki':
        return (
          <Menu>
            <Item>
              <SubTitle>회사 생활</SubTitle>
              <Link to={'wiki'}>팀 소개</Link>
            </Item>
          </Menu>
        );
      case '/gallery':
        return (
          <Menu>
            <Item>
              <SubTitle>사진첩</SubTitle>
              <Link to={'wiki'}>협력사</Link>
            </Item>
          </Menu>
        );
      default:
        return (
          <Menu>
            <Item>
              <SubTitle>사진첩</SubTitle>
              <Link to={'wiki'}>협력사</Link>
            </Item>
            <Item>
              <SubTitle>사진첩</SubTitle>
              <Link to={'wiki'}>협력사</Link>
            </Item>
            <Item>
              <SubTitle>사진첩</SubTitle>
              <Link to={'wiki'}>협력사</Link>
            </Item>
          </Menu>
        );
    }
  };

  return (
    <Container>
      <div className="logo">
        <Link to={'/'}>Home (App Logo)</Link>
      </div>
      <MenuList>{renderCategories()}</MenuList>
    </Container>
  );
};

const Container = styled.aside`
  display: none;

  @media screen and (min-width: 1024px) {
    position: fixed;
    display: flex;
    flex-direction: column;
    min-width: 330px;
    min-height: 100vh;

    border-right: 1px solid ${(props) => props.theme.colors.border};

    z-index: 10;
  }

  div.logo {
    display: flex;
    align-items: center;

    padding-left: 2rem;
    height: 56px;
    border-bottom: 1px solid ${(props) => props.theme.colors.border};
  }
`;

const MenuList = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Menu = styled.ul`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-height: calc(100vh - 56px);
  overflow-y: auto;
`;

const SubTitle = styled.h3`
  font-size: ${(props) => props.theme.fontSize.subTitle};
  font-weight: 600;

  padding: 10px 0;
`;

const Item = styled.li`
  padding: 10px 0;
  padding-left: 2rem;
`;

export default SideBar;
