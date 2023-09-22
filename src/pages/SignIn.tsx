import React from "react";
import { MailOutlined } from "@ant-design/icons";
import { styled } from "styled-components";
import SignInEmailModal from "../components/Signin/SignInEmail";
import { Col, Divider, Modal, Row } from "antd";
import SignInGoogle from "../components/Signin/SignInGoogle";
import { Link } from "react-router-dom";
import { MainTitle } from "../components/SignUp/Title";
import { motion } from "framer-motion";
import useModal from "../hooks/SignIn/useModal";
import { useSign } from "../hooks/SignIn/useSign";

const SignIn = () => {
  const { isEmailModalOpen, showModal, handleCancel, handleOk } = useModal();
  const { handleSignIn } = useSign();
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
              <SignInLeftImg $img={"/secure_login.svg"} />
            </Col>
            <Col span={12}>
              <SignInRight>
                <Logo src="/fe3-wiki-logo.png" alt="logo"></Logo>
                <LoginBtnContainer>
                  <Divider>로그인</Divider>
                  <MainTitle>
                    Wiki에 오신 것을 환영합니다!
                    <br />
                    시작하시기 전에 로그인을 해주세요!
                  </MainTitle>
                  <SignInEmailModal />
                  <Divider plain>OR</Divider>
                  <SignInGoogle />
                  {/* <EmailLogin onClick={showModal}>
                    <IconContainer>
                      <MailOutlined />
                    </IconContainer>
                    <span>직접 이메일 입력</span>
                  </EmailLogin> */}
                </LoginBtnContainer>
                <MoveSingUp to="/signup">
                  <span>아직 계정이 없으신가요?</span> 회원가입하기
                </MoveSingUp>
              </SignInRight>
            </Col>
          </Row>
        </SignInContainer>
        <Modal
          open={isEmailModalOpen}
          onCancel={handleCancel}
          onOk={handleSignIn}
        >
          <SignInEmailModal />
        </Modal>
      </Container>
    </motion.div>
  );
};

export default SignIn;

export const Container = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f7f7f7;
`;
export const SignInContainer = styled.div`
  width: 100%;
  max-width: 900px;
  border-radius: 20px;
  box-shadow: 3px 4px 16px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  padding: 10px;
  background-color: #fff;
`;
export const SignInLeftImg = styled.div<{ $img: string }>`
  width: 100%;
  height: 100%;
  background: #dbdaf3 url(${process.env.PUBLIC_URL}${(props) => props.$img}) 50%
    50% /60% no-repeat;
  border-radius: 10px;
  object {
    max-width: 100%;
  }
`;
export const SignInRight = styled.div`
  padding: 50px 30px;
  text-align: center;
`;
export const Logo = styled.img`
  width: 120px;
`;
export const LoginBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;
export const GoogleLogin = styled.button`
  border: none;
  border-radius: 10px;
  width: 330px;
  height: 40px;
  text-align: center;
  display: flex;
  align-items: center;
  border: 1px solid #6c63ff;
  color: #6c63ff;
  font-weight: bold;
  padding-left: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    color: #6c63ff;
    background-color: #ddd;
  }
  span {
    padding-left: 35px;
  }
`;
export const EmailLogin = styled(GoogleLogin)`
  margin-bottom: 20px;
`;

const IconContainer = styled.div`
  margin-right: 20px;
`;
const MoveSingUp = styled(Link)`
  text-align: center;
  font-size: 12px;
  font-weight: bold;
  text-decoration: none;
  color: #1c49ff;
  span {
    color: #909090;
    font-weight: normal;
  }
`;
