import React from "react";
import useQueryWidget from "../../hooks/main/useQueryWidget";
import { MainSect } from "./MainTeam";
import { Col, Row } from "antd";
import MainWikiWidget from "./MainWikiWidget";
import MainProjectWidget from "./MainProjectWidget";

const MainWidget = () => {
  const [, projects, isLoaded] = useQueryWidget();
  return (
    <MainSect>
      <Row justify={"center"}>
        <Col xs={24} sm={24} md={24} lg={20} xl={18}>
          <div className="title">
            <h2>💡 What&apos;s New</h2>
            <p>이정도면 껌이조의 새로운 위키/프로젝트 목록입니다.</p>
          </div>
          {isLoaded ? (
            <Row gutter={[32, 16]}>
              <Col flex={1}>
                <MainWikiWidget />
              </Col>
              <Col flex={1}>
                <MainProjectWidget projects={projects} />
              </Col>
            </Row>
          ) : null}
        </Col>
      </Row>
    </MainSect>
  );
};

export default MainWidget;
