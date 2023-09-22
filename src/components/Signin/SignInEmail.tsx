import React from "react";
import { Button, Form, Input } from "antd";
import { styled } from "styled-components";
import { useSign } from "../../hooks/SignIn/useSign";

interface FieldType {
  userEmail?: string;
  password?: string;
  remember?: string;
}
// antd Finish 함수
const onFinish = (values: any) => {
  console.log("Success: ", values);
};
const onFinishFailed = (errorInfo: any) => {
  console.log("Failed: ", errorInfo);
};

const SignInEmailModal = () => {
  const { handleEmailChange, handlePasswordChange, handleSignIn } = useSign();
  return (
    <Container>
      <ModalContainer>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600, margin: 0 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="이메일"
            name="userEmail"
            rules={[
              {
                required: true,
                message: "올바른 이메일을 입력해주세요!",
              },
            ]}
          >
            <Input onChange={handleEmailChange} />
          </Form.Item>

          <Form.Item<FieldType>
            label="비밀번호"
            name="password"
            rules={[{ required: true, message: "비밀번호를 입력해주세요!" }]}
          >
            <Input.Password onChange={handlePasswordChange} />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            onClick={handleSignIn}
            style={{ width: 330, height: 40, borderRadius: 10 }}
          >
            제출
          </Button>
        </Form>
      </ModalContainer>
    </Container>
  );
};
export default SignInEmailModal;

const Container = styled.div`
  margin: 0;
  padding: 0;
`;
const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 20px;
  text-align: start;
`;
