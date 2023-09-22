import React from "react";
import { Form, Skeleton } from "antd";

const ProjectNewForm = () => {
  const formTailLayout = {
    labelCol: { md: { span: 4 }, xl: { span: 3 } },
    wrapperCol: { md: { span: 14 }, xl: { span: 16 } },
  };
  return (
    <div className="project-container">
      <div className="project__top-title">
        <h3>프로젝트 수정</h3>
      </div>
      <Form {...formTailLayout} layout="horizontal" colon={false}>
        <Form.Item label=" ">
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Skeleton.Button active />
          </div>
        </Form.Item>
        <Form.Item label="프로젝트 명:">
          <Skeleton.Input active />
        </Form.Item>
        <Form.Item label="진행상황:">
          <Skeleton.Input active />
        </Form.Item>
        <Form.Item label="담당자:">
          <Skeleton.Input active />
        </Form.Item>
        <Form.Item label="프로젝트 담당:">
          <Skeleton.Input active />
        </Form.Item>
        <Form.Item label="프로젝트 기간:">
          <Skeleton.Input active />
        </Form.Item>
      </Form>
      <Skeleton title={true} active />
    </div>
  );
};

export default ProjectNewForm;
