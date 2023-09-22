import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import "../styles/Header.css";
import { Layout, theme, Modal } from "antd";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authState } from "../store/sign";
import { auth } from "../libs/firebase";
import Timer from "../pages/Timer";
interface MenuListItem {
  key: number;
  to: string;
  text: string;
}

const { Header } = Layout;
const MainHeader = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const menuList: MenuListItem[] = [
    {
      key: 1,
      to: "/wiki",
      text: "위키",
    },
    {
      key: 2,
      to: "/project",
      text: "프로젝트",
    },
    {
      key: 3,
      to: "/employee",
      text: "직원정보",
    },
    // {
    //   key: 4,
    //   to: "/wiki",
    //   text: "위키",
    // },
  ];

  // 출퇴근 타이머 모달
  const [isTimerOn, setIsTimerOn] = useState<boolean>(false);
  const showTimerModal = () => {
    setIsTimerOn(true);
  };
  const closeTimerModal = () => {
    setIsTimerOn(false);
  };
  // 로그아웃
  const [isSignIn, setIsSignIn] = useRecoilState(authState);
  const handleSignOut = () => {
    const user = auth.currentUser;
    if (user) {
      setIsSignIn(false);
      localStorage.removeItem("userData");
      auth.signOut();
      swal("Success", "로그아웃 되었습니다!", "success").then(() => {
        window.location.reload();
      });
    }
  };
  return (
    <Header style={{ background: colorBgContainer }}>
      <div className="header-wrap">
        <h1 className="header-logo fe3-wiki-logo">
          <a href="/">Logo</a>
        </h1>
        <div className="header-nav">
          <nav>
            <ul>
              {menuList.map((menu) => (
                <li key={menu.key}>
                  <Link to={menu.to}>{menu.text}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="header-user">
          <ul>
            <li>
              <button onClick={showTimerModal} className="user-link timer-btn">
                출퇴근 타이머
              </button>
            </li>
            <li>
              {isSignIn ? (
                <>
                  <button
                    className="user-link signin-link"
                    onClick={handleSignOut}
                  >
                    로그아웃
                  </button>
                  <Link to={"/user-register"} className="user-link info-link">
                    내 정보 수정
                  </Link>
                </>
              ) : (
                <Link to={"/signin"} className="user-link signin-link">
                  로그인
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>

      <Modal
        title=""
        open={isTimerOn}
        onCancel={closeTimerModal}
        footer={""}
        width="340px"
        style={{
          position: "fixed",
          top: "8%",
          right: "9%",
        }}
      >
        <div
          className="TimerModalContent"
          style={{ paddingRight: "1.3rem", paddingTop: "0.8rem" }}
        >
          <Timer />
          {isSignIn ? (
            <div style={{ textAlign: "center", marginTop: "0.3rem" }}>
              <Link to="/WorkTime" onClick={closeTimerModal}>
                출퇴근 기록 페이지
              </Link>
            </div>
          ) : (
            ""
          )}
        </div>
      </Modal>
    </Header>
  );
};

export default MainHeader;
