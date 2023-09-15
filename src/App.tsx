import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from './components/NavBar';
import Header from './components/Header';
import { UserProvider } from './common/UserContext';

function App() {
  return (
    <UserProvider>
      <Container>
        <Wrapper>
          <Header />
          <MainWrapper>
            <NavBar />
            <Outlet />
          </MainWrapper>
        </Wrapper>
      </Container>
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
  width: 90%;
  margin: 0 auto;
`;

export default App;
