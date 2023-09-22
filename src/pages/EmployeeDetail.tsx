import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import MemberDetailInfo from "../components/Employee/MemberDetailInfo";
import TeamDetailInfo from "../components/Employee/Team/TeamDetailInfo"; // TeamDetailInfo 컴포넌트 추가
import MemberSider from "../components/Employee/MemberSider";
import { Layout } from "antd";
import "../styles/Employee.css";

function EmployeeDetail() {
  const { memberId, teamId } = useParams();

  return (
    <Layout>
      <MemberSider />
      <Container>
        <Wrap>
          <Content className="card-container">
            {memberId ? (
              <MemberDetailInfo />
            ) : teamId ? (
              <TeamDetailInfo />
            ) : null}
          </Content>
        </Wrap>
      </Container>
    </Layout>
  );
}

export default EmployeeDetail;

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

const Content = styled.div`
  background-color: #fff;
  border-radius: 8px;
  color: #526484;
  word-wrap: break-word;
`;
