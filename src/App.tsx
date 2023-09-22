import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from './components/NavBar';
import Header from './components/Header';
import { UserProvider } from './common/UserContext';
import { MenuProvider } from './common/useMenu';

function App() {
  return (
    <UserProvider>
      <MenuProvider>
        <Container>
          <Wrapper>
            <Header />
            <MainWrapper>
              <NavBar />
              <Outlet />
            </MainWrapper>
          </Wrapper>
        </Container>
      </MenuProvider>
    </UserProvider>
  );
}

const Container = styled.div`
  display: flex;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
`;

const MainWrapper = styled.main`
  width: 100%;
  margin: 0 auto;
`;

export default App;
