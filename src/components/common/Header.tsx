import Button from "./Button";
import * as style from "./headerStyle";
import { Link, useLocation } from "react-router-dom";
import CommuteModal from "./CommuteModal";
import { useState } from "react";

export default function Header() {
  const location = useLocation();
  if (location.pathname === "/login") return null;

  const [showModal, setShowModal] = useState(false);
  const onCommuteClick = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <style.Container>
        <style.Top>
          <style.Wrapper>
            <style.Logo>9굴 WIKI</style.Logo>
            <Link to={"/login"}>임시 로그인</Link>
          </style.Wrapper>
          <style.Wrapper>
            <style.UserName>아무개님</style.UserName>
            <Button
              text={"출근하기"}
              margin={"0rem 1.25rem 0rem 0rem"}
              padding={"0.3125rem 0.75rem"}
              onClick={onCommuteClick}
            />
            <style.LogoutBtn>Logout</style.LogoutBtn>
          </style.Wrapper>
        </style.Top>
        <style.Bottom>
          <style.Wrapper>
            <style.NavSpan to={"/"}>HOME</style.NavSpan>
          </style.Wrapper>
          <style.Wrapper>
            <style.NavSpan to={"/wiki"} margin_r={"1.5625rem"}>
              WIKI
            </style.NavSpan>
            <style.NavSpan to={"/gallery"}>GALLERY</style.NavSpan>
          </style.Wrapper>
        </style.Bottom>
      </style.Container>
      {showModal && <CommuteModal onCommuteClick={onCommuteClick} />}
    </>
  );
}
