import React from "react";
import { MailOutlined } from "@ant-design/icons";
import { styled } from "styled-components";
import { Col, Divider, Modal, Row } from "antd";
import SignInGoogle from "../components/Signin/SignInGoogle";
import { Link } from "react-router-dom";
import SignUpEmailModal from "../components/SignUp/SignUpEmail";
import { MainTitle } from "../components/SignUp/Title";
import { motion } from "framer-motion";
import useModal from "../hooks/SignIn/useModal";
import {
  Container,
  EmailLogin,
  SignInContainer,
  SignInLeftImg,
  SignInRight,
  Logo,
  LoginBtnContainer,
} from "./SignIn";
import { useSign } from "../hooks/SignIn/useSign";

const SignUp = () => {
  const { isEmailModalOpen, showModal, handleCancel, handleOk } = useModal();
  const { handleSignUp } = useSign();
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container>
        <SignInContainer>
          <Row gutter={[0, 0]}>
            <Col span={12}>
              <SignInLeftImg $img={"/team_up.svg"} />
            </Col>
            <Col span={12}>
              <SignInRight>
                <Logo src="/fe3-wiki-logo.png" alt="logo"></Logo>
                <LoginBtnContainer>
                  <Divider>회원가입</Divider>
                  <MainTitle>
                    Wiki에 오신 것을 환영합니다!
                    <br />
                    시작하시기 전에 회원가입을 해주세요!
                  </MainTitle>
                  <EmailLogin onClick={showModal}>
                    <IconContainer>
                      <MailOutlined />
                    </IconContainer>
                    <span>직접 이메일 입력</span>
                  </EmailLogin>
                  <Divider plain>OR</Divider>
                  <SignInGoogle />
                </LoginBtnContainer>
                <MoveSingIn to="/signin">
                  <span>이미 계정이 있으신가요?</span> 로그인하기
                </MoveSingIn>
              </SignInRight>
            </Col>
          </Row>
        </SignInContainer>
        <Modal
          open={isEmailModalOpen}
          onCancel={handleCancel}
          onOk={handleSignUp}
        >
          {/* <Modal open={isEmailModalOpen}> */}
          <SignUpEmailModal />
        </Modal>
      </Container>
    </motion.div>
  );
};

export default SignUp;

const IconContainer = styled.div`
  margin-right: 20px;
`;
const MoveSingIn = styled(Link)`
  text-align: center;
  margin-bottom: 20px;
  font-size: 12px;
  font-weight: bold;
  text-decoration: none;
  color: #1c49ff;
  span {
    color: #909090;
    font-weight: normal;
  }
`;
