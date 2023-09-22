import React, { useEffect, useState, useContext } from "react";
import { Modal, MobileModal } from "../template/Modal";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "provider/userContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import StudyTime from "components/template/StudyTime";
import UserInfo from "components/template/UserInfo";
import DarkModeBtn from "provider/darkModeContext";
import { IsMobile } from "utils/mediaQuery";
import { ThemeContext } from "../../provider/darkModeProvider";

const Header = () => {
  const pageLink = ["Wiki", "Gallery", "Rank"];
  const user = useContext(AuthContext);
  const [pathLink, setPathLink] = useState("");
  const location = useLocation();
  const [displayUserInfo, setDisplayUserInfo] = useState(false);

  const [isModalActive, setIsModalActive] = useState(false);
  const [studyStartTime, setStudyStartTime] = useState<number | null>(null);
  const [isStudying, setIsStudying] = useState(false);
  const [modalButtonText, setModalButtonText] = useState("학습 기록");
  const [mobileUserInfo, setMobileUserInfo] = useState(false);

  const { currentTheme } = useContext(ThemeContext);
  const theme: "dark" | "light" = currentTheme;

  const handlerLogout = () => {
    setDisplayUserInfo(false);
    signOut(auth);
    setIsStudying(false);
  };

  const openModal = () => {
    setIsModalActive(true);
  };

  const handleIsStudyingChange = (newIsStudying: boolean) => {
    setIsStudying(newIsStudying);

    // 버튼 텍스트 업데이트
    if (isStudying) {
      setModalButtonText("기록 중");
    } else {
      setModalButtonText("학습 기록");
    }
  };

  const toggleStudyStatus = () => {
    setIsStudying((prev) => !prev);
  };

  useEffect(() => {
    setPathLink(location.pathname.split("/")[1]);
  }, [location]);

  const MobileUserInfo = () => {
    if (user) {
      return (
        <MobileUserInfoContainer>
          <div
            className="header__mobile-close-wrap"
            onClick={() => {
              setMobileUserInfo(false);
            }}
          >
            <img
              src={process.env.PUBLIC_URL + "/svg/icon_close.svg"}
              alt="닫기 버튼"
            />
          </div>
          <UserInfo handlerLogout={handlerLogout} user={user} isborder="true" />
          <div className="header__mobile-darkmode-wrap">
            <DarkModeBtn />
          </div>
        </MobileUserInfoContainer>
      );
    } else {
      return (
        <MobileUserInfoContainer>
          <div
            className="header__mobile-close-wrap"
            onClick={() => {
              setMobileUserInfo(false);
            }}
          >
            <img
              src={process.env.PUBLIC_URL + "/svg/icon_close.svg"}
              alt="닫기 버튼"
            />
          </div>
          <li key={"login"}>
            <Link
              to={`/login`}
              onClick={() => {
                setMobileUserInfo(false);
              }}
            >
              <h2> 로그인 </h2>
            </Link>
          </li>
          <li key={"signup"}>
            <Link
              to={`/signup`}
              onClick={() => {
                setMobileUserInfo(false);
              }}
            >
              <h2> 회원가입 </h2>
            </Link>
          </li>
        </MobileUserInfoContainer>
      );
    }
  };

  // 모바일 헤더
  if (IsMobile()) {
    return (
      <>
        <MobileContainer>
          <MobileFirstHeader>
            <div></div>
            <Link to={`/`}>
              <h1>FASTWIKI</h1>
            </Link>
            <img
              onClick={() => {
                setMobileUserInfo((prev) => !prev);
              }}
              className="header__mobile-user"
              src={process.env.PUBLIC_URL + `/svg/icon_user_${theme}.svg`}
              alt="유저모양아이콘"
            />
          </MobileFirstHeader>
          <MobileSecondHeader>
            {pageLink.map((link, idx) => {
              let name = "";
              if (pathLink === pageLink[idx]) name += "active";
              return (
                <li key={pageLink[idx]}>
                  <Link to={`/${link}`}>
                    <h2 className={name}> {pageLink[idx]} </h2>
                  </Link>
                </li>
              );
            })}
            <li>
              <MobileStyledButton onClick={openModal}>
                <p>{isStudying ? "기록 중" : "학습 기록"}</p>
              </MobileStyledButton>
            </li>
          </MobileSecondHeader>
          {isModalActive ? (
            <MobileModal
              width="150"
              height="180"
              setModal={setIsModalActive}
              element={
                <StudyTime
                  isStudying={isStudying}
                  studyStartTime={studyStartTime}
                  onIsStudyingChange={handleIsStudyingChange}
                  toggleStudyStatus={toggleStudyStatus}
                  setStudyStartTime={setStudyStartTime}
                />
              }
            />
          ) : null}
        </MobileContainer>
        {mobileUserInfo ? <MobileUserInfo /> : <></>}
      </>
    );
  } else {
    // 일반 테스크톱 헤더
    return (
      <Container>
        <InnerContainer>
          <li>
            <Link to={`/`}>
              <h1>FASTWIKI</h1>
            </Link>
          </li>
          <ul className="header__link-wrapper">
            {pageLink.map((link, idx) => {
              let name = "";
              if (pathLink === pageLink[idx]) name += "active";
              return (
                <li key={pageLink[idx]}>
                  <Link to={`/${link}`}>
                    <h2 className={name}> {pageLink[idx]} </h2>
                  </Link>
                </li>
              );
            })}
            <li>
              <StyledButton onClick={openModal}>
                <p>{isStudying ? "기록 중" : "학습 기록"}</p>
              </StyledButton>
            </li>
            <li>
              {user?.displayName ? (
                <>
                  <div className="header__user-name">
                    <p
                      onClick={() => {
                        setDisplayUserInfo((prev) => !prev);
                      }}
                    >
                      {sliceStr(user.displayName, 7)}님
                    </p>
                    <div className="header__user-info">
                      {displayUserInfo ? (
                        <UserInfo
                          handlerLogout={handlerLogout}
                          user={user}
                          isborder="true"
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                    {displayUserInfo ? (
                      <div
                        onClick={() => {
                          setDisplayUserInfo(false);
                        }}
                        className="header__user-info-block"
                      >
                        {" "}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </>
              ) : (
                <Link to={`/login`}>
                  <h3>로그인</h3>
                </Link>
              )}
            </li>
            <DarkModeBtn />
          </ul>
        </InnerContainer>
        {isModalActive && (
          <Modal
            setModal={setIsModalActive}
            width="400"
            height="250"
            element={
              <StudyTime
                isStudying={isStudying}
                onIsStudyingChange={handleIsStudyingChange}
                studyStartTime={studyStartTime}
                toggleStudyStatus={toggleStudyStatus}
                setStudyStartTime={setStudyStartTime}
              />
            }
          />
        )}
      </Container>
    );
  }
};

const sliceStr = (str: string, n: number) => {
  return str.length >= n ? str.slice(0, n) + "..." : str;
};

const MobileContainer = styled.nav`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  width: 100%;
  height: 100px;
  border-bottom: 2px solid #ddd;
  font-size: 1rem;
  z-index: 20;
  background-color: #fff;
  padding: 0 20px;
  display: flex;
  flex-flow: column;
  box-sizing: border-box;

  h1 {
    font-weight: 700;
    font-size: 20px;
    color: ${(props) => props.theme.text};
  }

  h2 {
    color: ${(props) => props.theme.text};
  }

  .header__mobile-user {
    width: 30px;
    height: 30px;
    cursor: pointer;
  }

  .header__mobile-logo {
    cursor: pointer;
    width: 100px;
    height: 30px;
  }
  .active {
    color: var(--main-color);
  }

  h2 {
    font-size: 1.1rem;
  }
`;
const MobileUserInfoContainer = styled.div`
  position: absolute;
  z-index: 21;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  padding: 80px 20px;
  box-sizing: border-box;
  display: flex;
  flex-flow: column;
  align-items: center;
  .header__mobile-close-wrap {
    position: absolute;
    top: 10px;
    right: 15px;
    cursor: pointer;
    img {
      width: 40px;
      height: 40px;
    }
  }
  .header__mobile-darkmode-wrap {
    margin-top: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  h2 {
    font-size: 2.5rem;
  }
`;

const MobileFirstHeader = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const MobileSecondHeader = styled.ul`
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledButton = styled.button`
  color: var(--main-color);
  border: 0.8px solid var(--main-color);
  border-radius: 5px;
  width: 100px;
  height: 35px;
  background-color: #fff;
  cursor: pointer;
  p {
    margin: 0 auto;
  }
`;

const MobileStyledButton = styled(StyledButton)`
  width: 75px;
  height: 25px;
`;

const InnerContainer = styled.div`
  margin: 0 auto;
  padding: 0 2rem;
  box-sizing: border-box;
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  word-break: keep-all;
`;

const Container = styled.nav`
  user-select: none;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  width: 100%;
  height: 60px;
  border-bottom: 2px solid #ddd;
  font-size: 1rem;
  z-index: 20;
  background-color: #fff;
  h1 {
    font-size: 1.4rem;
    color: ${(props) => props.theme.text};
  }
  h2 {
    font-size: 1.2rem;
  }
  h3 {
    font-size: 0.9rem;
  }
  .active {
    color: var(--main-color);
  }
  .header__link-wrapper {
    display: flex;
    justify-content: flex-end;
    margin-right: 3rem;
    gap: 45px;
    align-items: center;
  }
  @media (max-width: 900px) {
    .header__link-wrapper {
      gap: 25px;
    }
  }

  @media (max-width: 768px) {
    .header__link-wrapper {
      gap: 10px;
    }
  }
  .header__user-name {
    position: relative;
  }
  .header__user-name p {
    cursor: pointer;
    text-decoration: underline solid 1px;
  }
  .header__user-info {
    position: absolute;
    top: 60px;
    right: 0;
    z-index: 20;
  }
  .header__user-info-block {
    position: fixed;
    z-index: 19;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

export default Header;
