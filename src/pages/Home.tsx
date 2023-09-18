import React from "react";
import styled from "styled-components";
import Carousel from "components/Carousel";
import RecentPost from "components/RecentPost";

const Home = () => {
  return (
    <Container>
      <Carousel />
      <HomeBox />
        <RecentPost />
    </Container>
  );
};

const Container = styled.section`
  position: relative;
`;

const HomeBox = styled.div`
  background-color: gray;
  width: 1202px;
  height: 500px;
  margin-bottom: 50px;
`;

export default Home;
