import React from "react";
import { useState, useCallback } from "react";
import Modal from "./SignUp";

import { ModalTitle, JoinBox } from "./modalStyle";
import { Container } from "./containerStyle";
import { Info, Logo, CompanyName, ServiceName } from "./infoStyle";
import { Content, Title, LoginBox } from "./contentStyle";
import { Form, InputWrap, Input } from "./formStyle";
import { ButtonSet, HighlightButton, NormalButton } from "./buttonStyle";

const LoginPage = () => {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);

  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  return (
    <Container>
      {isOpenModal && (
        <Modal onClickToggleModal={onClickToggleModal}>
          <JoinBox>
            <ModalTitle>회원가입</ModalTitle>
            <Form>
              <InputWrap className="IdWrap">
                ID
                <Input className="IdInput" />
              </InputWrap>

              <InputWrap className="IdWrap">
                PW
                <Input className="PWInput" />
              </InputWrap>

              <InputWrap className="NameWrap">
                이름
                <Input className="NameInput" />
              </InputWrap>
            </Form>
            <HighlightButton> 가입하기</HighlightButton>
          </JoinBox>
        </Modal>
      )}

      <Info>
        <Logo>
          <CompanyName>9굴</CompanyName>
          <ServiceName>WIKI</ServiceName>
        </Logo>
      </Info>

      <Content>
        <LoginBox>
          <Title>로그인</Title>

          <Form>
            <InputWrap className="IdWrap">
              ID
              <Input className="IdInput" />
            </InputWrap>

            <InputWrap className="PwWrap">
              PW
              <Input className="PwInput" type="password" />
            </InputWrap>
          </Form>

          <ButtonSet>
            <HighlightButton> 들어가기</HighlightButton>
            <NormalButton onClick={onClickToggleModal}>회원가입</NormalButton>
          </ButtonSet>
        </LoginBox>
      </Content>
    </Container>
  );
};

export default LoginPage;
