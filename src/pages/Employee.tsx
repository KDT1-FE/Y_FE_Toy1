import React from "react";
import styled from "styled-components";
import MemberList from "../components/Employee/MemberList";
import TeamList from "../components/Employee/Team/TeamList";
import { Layout } from "antd";
import { useLocation } from "react-router-dom";
import MemberSider from "../components/Employee/MemberSider";

const Container = styled.div`
  padding: 0 1rem;
  width: 100%;
  background: #fff;
`;

const Wrap = styled.div`
  padding: 0 1rem;
  margin: 0 auto;
  max-width: 100%;
  background: #fff;
  @media (min-width: 576px) {
    max-width: 576px;
  }

  @media (min-width: 768px) {
    max-width: 768px;
  }

  @media (min-width: 992px) {
    max-width: 992px;
  }

  @media (min-width: 1200px) {
    max-width: 1200px;
  }
`;

const Content = styled.div``;

const Employee = () => {
  const location = useLocation();

  const render = (() => {
    switch (location.pathname) {
      case "/employee/":
        return <MemberList />;
      case "/employee/team":
        return <TeamList />;
      default:
        return <MemberList />;
    }
  })();

  return (
    <Layout>
      <MemberSider />
      <Container>
        <Wrap>
          <Content>{render}</Content>
        </Wrap>
      </Container>
    </Layout>
  );
};

export default Employee;
