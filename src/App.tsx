import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from './components/NavBar';
import Header from './components/Header';

function App() {
  return (
    <Container>
      <Wrapper>
        <Header />
        <MainWrapper>
          <NavBar />
          <Outlet />
        </MainWrapper>
      </Wrapper>
    </Container>
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
