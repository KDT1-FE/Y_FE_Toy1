import React, { PropsWithChildren, useState } from "react";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { auth } from "@/firebase/firebase";

import * as style from "./signupStyle";

interface ModalDefaultType {
  onClickToggleModal: () => void;
}

function Modal({
  onClickToggleModal,
  children,
}: PropsWithChildren<ModalDefaultType>) {
  /** 회원가입 위한 선언 */
  const [email, setEmail] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handlePwd = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPwd(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleClickCreate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, pwd)
      .then(() => {
        alert("회원가입에 성공하였습니다. 로그인 페이지로 이동합니다.");
        if (onClickToggleModal) {
          onClickToggleModal();
        }
      })
      .catch((e) => {
        if (e.code == "auth/email-already-in-use") {
          alert("이미 사용 중인 이메일입니다.");
        }
        if (e.code == "auth/weak-password") {
          alert("비밀번호는 6글자 이상이어야 합니다.");
        }
        if (e.code == "auth/network-request-failed") {
          alert("네트워크 연결에 실패 하였습니다. 잠시 후 다시 시도해주세요.");
        }
        if (e.code == "auth/invalid-email") {
          alert("잘못된 이메일 형식입니다.");
        }
      });
  };

  return (
    <style.ModalContainer>
      <style.DialogBox>
        {children}
        <style.JoinBox>
          <style.ModalTitle>회원가입</style.ModalTitle>
          <style.Content>
            <style.Info>
              <style.InfoTitle>반갑습니다! 🙋‍♀️ </style.InfoTitle>
              9굴 직원 여러분 안녕하세요. {"\n"}
              원활한 업무를 위하여 WIKI페이지를 신설하였사오니, {"\n"}
              많은 활동 부탁드립니다.{"\n"}
              {"\n"}
              이용을 위해선 회원가입이 필수이므로,{"\n"}
              아래의 규칙을 참고하셔서 가입 후 접속해주세요.{"\n"}
              {"\n"}
              📌 ID(아이디)는 이메일 형태로 입력해야 합니다.{"\n"}
              📌 PW(비밀번호)는 6자 이상 입력해야 합니다.{"\n"}
              {"\n"}
              비밀번호 찾기 기능은 현재 개발중입니다.{"\n"}
              비밀번호 재발급을 원하신다면 아래로 연락주세요.{"\n"}
              💌 ewinkite@gmail.com {"\n"}
            </style.Info>
            <style.Form onSubmit={handleSubmit}>
              <style.InputWrap className="EmailWrap">
                ID (email)
                <style.Input
                  type="email"
                  name="email"
                  onChange={handleEmail}
                  value={email}
                />
              </style.InputWrap>

              <style.InputWrap className="PwWrap">
                PW
                <style.Input
                  type="password"
                  name="pwd"
                  onChange={handlePwd}
                  value={pwd}
                />
              </style.InputWrap>

              <style.HighlightButton type="button" onClick={handleClickCreate}>
                {" "}
                가입하기
              </style.HighlightButton>
              <style.NormalButton
                type="button"
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault();

                  if (onClickToggleModal) {
                    onClickToggleModal();
                  }
                }}
              >
                돌아가기 🥺
              </style.NormalButton>
            </style.Form>
          </style.Content>
        </style.JoinBox>
      </style.DialogBox>

      <style.Backdrop
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();

          if (onClickToggleModal) {
            onClickToggleModal();
          }
        }}
      />
    </style.ModalContainer>
  );
}

export default Modal;
