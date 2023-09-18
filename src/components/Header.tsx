import React, { useEffect, useState, useContext } from "react";
import { Modal } from "./Modal";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "authentication/authContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
// import { firestore, serverTimestamp, updateDoc, doc } from "firebase/firestore";
import StudyTime from "./StudyTime";
import UserInfo from "./UserInfo";

const Header = () => {
  const pageLink = ["Wiki", "Gallery"];
  const user = useContext(AuthContext);
  const [pathLink, setPathLink] = useState("");
  const location = useLocation();
  const [displayUserInfo, setDisplayUserInfo] = useState(false)

  const [isModalActive, setIsModalActive] = useState(false);
  const [studyStartTime, setStudyStartTime] = useState<number | null>(null);
  const [studyEndTime, setStudyEndTime] = useState<number | null>(null);
  const [isStudying, setIsStudying] = useState(false);

  const openModal = () => {
    setIsModalActive(true);
  };

  const toggleStudyStatus = () => {
    if (!isStudying) {
      const startTime = new Date().getTime();
      setStudyStartTime(startTime);
    }
    setIsStudying(!isStudying);
  };

  useEffect(() => {
    setPathLink(location.pathname.split("/")[1]);
  }, [location]);

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
                  <h2 className={name}> {pageLink[idx]} </h2>{" "}
                </Link>
              </li>
            );
          })}
          <li>
            <StyledButton onClick={openModal}>
              <p> 학습 기록</p>{" "}
            </StyledButton>
          </li>
          <li>
            {user?.displayName ? (
              <>
                <div className='header__user-name' >
                    <p onClick={()=>{setDisplayUserInfo(prev=>!prev)}}>{sliceStr(user.displayName, 7)}님</p>
                    <div className='header__user-info'>
                      {displayUserInfo? <UserInfo 
                        handlerLogout= {handlerLogout}
                        user={user}
                        /> : <></>}
                    </div>
                </div>
              </>
            ) : (
              <Link to={`/login`}>
                <h3>로그인</h3>{" "}
              </Link>
            )}{" "}
          </li>
        </ul>
      </InnerContainer>
      {isModalActive && (
        <Modal
          setModal={setIsModalActive}
          width="400"
          height="200"
          element={
            <StudyTime
              isStudying={isStudying}
              studyStartTime={studyStartTime}
              toggleStudyStatus={toggleStudyStatus}
            />
          }
        />
      )}
    </Container>
  );
};

const sliceStr = (str: string, n: number) => {
  return str.length >= n ? str.slice(0, n) + "..." : str;
};

const handlerLogout = () => {
  signOut(auth);
};

const StyledButton = styled.button`
  color: var(--main-color);
  border: 0.8px solid var(--main-color);
  border-radius: 5px;
  width: 100px;
  height: 35px;
  background-color: #ffff;
  cursor: pointer;
  p {
    margin: 0 auto;
  }
`;

const InnerContainer = styled.div`
  margin: 0 auto;
  padding: 0 2rem;
  box-sizing: border-box;
  max-width: 1200px;
  display:flex;
  align-items:center;
  justify-content: space-between;
  word-break: keep-all;
`;

const Container = styled.nav`
  user-select:none;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  width: 100%;
  height: 60px;
  border-bottom: 2px solid #ddd;
  font-size: 1rem;
  z-index: 10;
  background-color: #fff;
  h1{
    font-size: 1.4rem;
    font-weight : bold;
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
    gap: 50px;
    align-items: center;
  }
  .header__user-name{
    position: relative;
  }
  .header__user-name p{
    cursor:pointer;
    text-decoration: underline solid 1px;
  }
  .header__user-info{
    position:absolute;
    top:60px;
    right:0;

  }
`;

export default Header;
