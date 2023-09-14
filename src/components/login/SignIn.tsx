import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../../../firebase";
import Modal from "./SignUp";

import * as style from "./signinStyle";

export default function SignIn() {
  const navigate = useNavigate();

  /** 모달 위한 선언 */

  const [isOpenModal, setOpenModal] = useState<boolean>(false);

  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  /** 로그인 위한 선언 */
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

    signInWithEmailAndPassword(auth, email, pwd)
      .then(() => {
        alert("로그인 성공");
        navigate("/");
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <>
      {isOpenModal && <Modal onClickToggleModal={onClickToggleModal}></Modal>}
      <style.LoginBox>
        <style.Title>로그인</style.Title>

        <style.Form>
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
        </style.Form>

        <style.ButtonWrap>
          <style.HighlightButton type="button" onClick={handleClickCreate}>
            {" "}
            들어가기
          </style.HighlightButton>
          <style.NormalButton type="button" onClick={onClickToggleModal}>
            회원가입
          </style.NormalButton>
        </style.ButtonWrap>
      </style.LoginBox>
    </>
  );
}
