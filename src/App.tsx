import { Outlet } from 'react-router-dom';

import styled from 'styled-components';
import Header from './components/Header';
import NavBar from './components/NavBar';
import { Spacer } from './common/Spacer';
import { FlexContainer } from './common/FlexContainer';
import SideBar from './components/SideBar';

function App() {
  return (
    <>
      <Header />
      <Container>
        <MainWrapper>
          <Spacer />
          <NavBar />
          <Spacer />
          <Outlet />
        </MainWrapper>
        <SideWrapper>
          <SideBar />
        </SideWrapper>
      </Container>
    </>
  );
}

const Container = styled.main`
  display: flex;
  justify-content: space-evenly;
`;

const MainWrapper = styled.div`
  flex: 1 1 auto;
  padding: 0 24px;

  @media screen and (min-width: 768px) {
    max-width: 728px;
  }
`;

const SideWrapper = styled(FlexContainer)`
  display: none;

  @media screen and (min-width: 1024px) {
    display: block;
    flex: 1 1 auto;

    max-width: 330px;
    min-height: 100vh;

    border-left: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

export default App;
