import React, { PropsWithChildren, useState } from "react";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../../../firebase";

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
    console.log("안녕하세요");
    createUserWithEmailAndPassword(auth, email, pwd)
      .then(() => {
        alert("회원가입 성공");
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <style.ModalContainer>
      <style.DialogBox>
        {children}
        <style.JoinBox>
          <style.ModalTitle>회원가입</style.ModalTitle>
          <style.Form onSubmit={handleSubmit}>
            <style.InputWrap className="EmailWrap">
              EMAIL
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
          </style.Form>
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
