import React from "react";
import styled from "styled-components";
import Carousel from "components/Carousel";
import RecentPost from "components/RecentPost";
import StudyTimeRanking from "components/StudyTimeRanking";

const Home = () => {
  return (
    <Container>
      <Carousel />
      <StudyTimeRanking />
      <RecentPost />
    </Container>
  );
};

const Container = styled.section`
  position: relative;
`;

export default Home;
