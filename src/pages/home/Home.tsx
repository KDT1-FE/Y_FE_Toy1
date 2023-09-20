import React from "react";
import styled from "styled-components";
import Carousel from "components/template/Carousel";
import RecentPost from "components/template/RecentPost";
import StudyTimeRanking from "components/template/StudyTimeRanking";

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
