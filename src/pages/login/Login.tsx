import React from "react";
import { Container }from "./containerStyle";
import { Info, Logo, CompanyName, ServiceName } from "./infoStyle";
import { Content, Title, LoginBox }from "./contentStyle";
import { Form, Id, Pw, IdInput, PwInput}from "./formStyle";
import { ButtonSet,  Enter, Join  }from "./buttonStyle";



const LoginPage = () => {
  return (
    <Container>

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
            <Id>ID
              <IdInput 
              />
            </Id>
            <Pw>PW
              <PwInput 
              type="password" 
              />
            </Pw>
          </Form>

        <ButtonSet>
          <Enter>들어가기</Enter>
          <Join>회원가입</Join>
        </ButtonSet>

        </LoginBox>
      </Content>

    </Container>
  );
};

export default LoginPage;
