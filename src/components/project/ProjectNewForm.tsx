import React, { useRef } from "react";
import dayjs from "dayjs";
import { Button, DatePicker, Form, Input, Select } from "antd";
import { SaveFilled } from "@ant-design/icons";
import ProjectMdEditor from "./ProjectMdEditor";
import { useMutationNewProject } from "../../hooks/project/useMutationNewProject";
import type { Editor } from "@toast-ui/react-editor";
import { ProjectDetail, TeamList, UserList } from "../../libs/firestore";

const { RangePicker } = DatePicker;

const ProjectNewForm = ({
  isEdit,
  teams,
  users,
  projectDetail,
}: {
  isEdit: boolean;
  teams?: TeamList[];
  users?: UserList[];
  projectDetail?: ProjectDetail;
}) => {
  const [form] = Form.useForm();

  const formTailLayout = {
    labelCol: { md: { span: 4 }, xl: { span: 3 } },
    wrapperCol: { md: { span: 14 }, xl: { span: 16 } },
  };
  const editorRef = useRef<Editor>(null);
  const { onFinish } = useMutationNewProject({
    editorRef,
    isEdit,
  });

  return (
    <div className="project-container">
      <div className="project__top-title">
        <h3>프로젝트 {isEdit ? "수정" : "추가"}</h3>
      </div>
      <Form
        {...formTailLayout}
        form={form}
        layout="horizontal"
        colon={false}
        onFinish={(values) => {
          void onFinish(values);
        }}
        initialValues={
          isEdit
            ? {
                ...projectDetail,
                duration: [
                  dayjs(projectDetail?.duration[0]),
                  dayjs(projectDetail?.duration[1]),
                ],
              }
            : {}
        }
        autoComplete="off"
      >
        <Form.Item label=" ">
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="primary"
              icon={<SaveFilled />}
              size="large"
              htmlType="submit"
            >
              저장
            </Button>
          </div>
        </Form.Item>
        <Form.Item
          name="title"
          label="프로젝트 명:"
          validateTrigger="onBlur"
          rules={[
            {
              required: true,
              message: "프로젝트명은 필수 입력 사항입니다.",
            },
          ]}
        >
          <Input placeholder="프로젝트명을 입력 해주세요." />
        </Form.Item>
        <Form.Item
          name="status"
          label="진행상황:"
          validateTrigger="onBlur"
          rules={[{ required: true, message: "담당자를 선택 해주세요." }]}
        >
          <Select placeholder="진행상황을 선택 해주세요.">
            <Select.Option value="plus">예정됨</Select.Option>
            <Select.Option value="progress">진행중</Select.Option>
            <Select.Option value="completed">완료됨</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="assignees"
          label="담당자:"
          validateTrigger="onBlur"
          rules={[{ required: true, message: "담당자를 선택 해주세요." }]}
        >
          <Select mode="multiple" placeholder="담당자를 선택 해주세요.">
            {users?.map((user) => (
              <Select.Option key={user.name} value={user.name}>
                {user.name}
              </Select.Option>
            ))}
            {/* <Select.Option value="김미정">김미정</Select.Option>
            <Select.Option value="김성겸">김성겸</Select.Option>
            <Select.Option value="노욱진">노욱진</Select.Option>
            <Select.Option value="박나영">박나영</Select.Option>
            <Select.Option value="진종수">진종수</Select.Option> */}
          </Select>
        </Form.Item>
        <Form.Item
          name="teams"
          label="프로젝트 담당:"
          validateTrigger="onBlur"
          rules={[{ required: true, message: "담당할 팀을 선택 해주세요." }]}
        >
          <Select
            mode="multiple"
            placeholder="프로젝트를 담당할 팀을 선택 해주세요."
          >
            {teams?.map((team) => (
              <Select.Option key={team.teamName} value={team.teamName}>
                {team.teamName}
              </Select.Option>
            ))}
            {/* <Select.Option value="FE1팀">FE1팀</Select.Option>
            <Select.Option value="FE2팀">FE2팀</Select.Option>
            <Select.Option value="BE1팀">BE1팀</Select.Option>
            <Select.Option value="BE2팀">BE2팀</Select.Option>
            <Select.Option value="QA팀">QA팀</Select.Option> */}
          </Select>
        </Form.Item>
        <Form.Item
          name="duration"
          label="프로젝트 기간:"
          validateTrigger="onBlur"
          rules={[{ required: true, message: "프로젝트 기간을 설정해주세요" }]}
        >
          <RangePicker />
        </Form.Item>
      </Form>
      <ProjectMdEditor
        editorRef={editorRef}
        initialValue={projectDetail?.data}
      />
    </div>
  );
};

export default ProjectNewForm;
