import styled from 'styled-components';
import { FlexContainer } from '../common/FlexContainer';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <Container>
      <Categories>
        <div className="category">
          <Link to={'wiki'}>Wiki</Link>
        </div>
        <div className="category">
          <Link to={'gallery'}>Gallery</Link>
        </div>
        <div className="category">
          <Link to={'/'}>Contact</Link>
        </div>
      </Categories>
    </Container>
  );
};

const Container = styled.nav`
  position: sticky;
  display: flex;
  justify-content: flex-start;
  top: 0;

  width: 100%;
  height: 56px;
  margin-bottom: 2rem;

  z-index: 15;

  background-color: ${(props) => props.theme.colors.white};
`;

const Categories = styled(FlexContainer)`
  justify-content: flex-start;

  height: 100%;
  width: 100%;

  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  div.category {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    height: 100%;

    margin-right: 24px;

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
  a {
    position: relative;
    display: flex;

    font-size: ${({ theme }) => theme.fontSize.text};
  }
`;

export default NavBar;
