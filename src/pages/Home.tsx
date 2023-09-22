import styled from 'styled-components';
import Carousel from '../components/Carousel';
import CommuteTable from '../components/CommuteTable';

const Home = () => {
  return (
    <MainContainer>
      <Carousel></Carousel>
      <CommuteTable></CommuteTable>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  width: 100%;
  padding: 1.5rem 2.6rem 0 2.6rem;

  min-height: ${(props) =>
    `calc(100vh - (${props.theme.size.header} + ${props.theme.size.nav} + ${props.theme.size.footer}))`};

  @media screen and (max-width: 700px) {
    padding: 1.5rem 1.1rem 0 1.1rem;
  }
`;

export default Home;
