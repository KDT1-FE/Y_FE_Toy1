import styled from 'styled-components';
import { FlexContainer } from '../common/FlexContainer';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <Container>
      <Categories>
        <Link to={'wiki'}>Wiki</Link>
        <Link to={'gallery'}>Gallery</Link>
        <Link to={'/'}>Contact</Link>
      </Categories>
    </Container>
  );
};

const Container = styled(FlexContainer)`
  justify-content: flex-start;
  width: 100%;

  height: 54px;

  @media screen and (min-width: 1024px) {
    width: 100%;
  }
`;

const Categories = styled(FlexContainer)`
  justify-content: flex-start;

  height: 100%;
  width: 100%;

  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  a {
    position: relative;
    display: flex;

    padding-top: 24px;
    height: 100%;

    font-size: ${({ theme }) => theme.fontSize.text};

    &:not(:last-child) {
      margin-right: 24px;
    }

    &:hover::before {
      position: absolute;
      content: '';
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: ${({ theme }) => theme.colors.black};
    }
  }
`;

export default NavBar;
