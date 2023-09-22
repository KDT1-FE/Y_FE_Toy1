import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { db } from "../../firebase";
import { ThemeContext } from "../../provider/darkModeProvider";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { IsMobile } from "utils/mediaQuery";

interface UsersData {
  id: string;
  class: number;
  email: string;
  nickName: string;
  studyTime: number;
}

const StudyTimeRanking = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [users, setUsers] = useState<UsersData[]>([]);
  const q = query(
    collection(db, "user"),
    orderBy("studyTime", "desc"),
    limit(5)
  );
  const { currentTheme } = useContext(ThemeContext);
  const theme: "dark" | "light" = currentTheme;

  const medalSelector = (index: number): string => {
    switch (index) {
      case 0:
        return process.env.PUBLIC_URL + "/png/1등.png";
      case 1:
        return process.env.PUBLIC_URL + "/png/2등.png";
      case 2:
        return process.env.PUBLIC_URL + "/png/3등.png";
      default:
        return process.env.PUBLIC_URL + "/png/빈사진.png";
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const postSnap = await getDocs(q);
        const data = postSnap.docs.map((doc) => {
          const docData = doc.data();
          return {
            // 다양한 falsy값으로 누락되면 ||로 바꿔야함
            id: doc.id,
            class: docData.class ?? 0,
            email: docData.email ?? "",
            nickName: docData.nickName ?? "",
            studyTime: docData.studyTime ?? 0,
          };
        });
        setUsers(data);
      } catch (error) {
        console.error("데이터를 불러오는데 실패했습니다.", error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % users.length);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [currentIndex, users.length]);
  if (IsMobile()) {
    return (
      <>
        <Link to="/Rank">
          <h1>공부시간 랭킹</h1>
          <RankWrapper>
            {users.map((usersData: UsersData, index: number) => (
              <div
                className={`userList ${currentIndex === index ? "hover" : ""}`}
                key={usersData.id}
              >
                <div className="userList__icon">
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      `/svg/number/${theme}/${index + 1}_icon-${theme}.svg`
                    }
                    alt="오류"
                  />
                </div>
                <img
                  className="user_image"
                  src={process.env.PUBLIC_URL + "/png/user_default.png"}
                  alt="프로필"
                />
                <div className="userList__nickName">{usersData.nickName}</div>
                <div className="userList__studyTime">
                  <div className="studyTime">{usersData.studyTime}분</div>
                </div>
              </div>
            ))}
          </RankWrapper>
        </Link>
      </>
    );
  } else {
    return (
      <>
        <Link to="/Rank">
          <h1>공부시간 랭킹</h1>
          <RankWrapper>
            {users.map((usersData: UsersData, index: number) => (
              <div
                className={`userList ${currentIndex === index ? "hover" : ""}`}
                key={usersData.id}
              >
                <div className="userList__icon">
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      `/svg/number/${theme}/${index + 1}_icon-${theme}.svg`
                    }
                    alt="오류"
                  />
                </div>
                <img
                  className="user_image"
                  src={process.env.PUBLIC_URL + "/png/user_default.png"}
                  alt="프로필"
                />
                <div className="userList__nickName">{usersData.nickName}</div>
                <div className="userList__studyTime">
                  <div className="studyTime">{usersData.studyTime}분</div>
                </div>
                <img
                  className="userList_medal"
                  src={medalSelector(index)}
                  alt="메달"
                />
              </div>
            ))}
          </RankWrapper>
        </Link>
      </>
    );
  }
};

const RankWrapper = styled.div`
  display: flex;
  width: auto;
  height: auto;
  text-align: center;
  flex-direction: column;
  border-radius: 4px;
  margin-bottom: 50px;
  margin-top: 16px;

  .userList {
    box-sizing: border-box;
    max-width: 100%;
    font-weight: 700;
    font-size: 18px;
    display: flex;
    align-items: center;
    transition: all 1s ease;
    margin: 5px;
    padding: 10px;
    /* background-color: ${(props) => props.theme.body}; */
    // background-color: ${(props) => props.theme.studyRank};
    border: 1px solid var(--main-color);
    border-radius: 4px;
  }

  .userList_medal {
    height: 60px;
  }

  .userList:hover {
    transition: all 0.3s ease;
    /* background-color: ${(props) => props.theme.studyRank}; */
    transform: scale(1.05);
  }

  .userList.hover {
    background-color: var(--main-color);
    transform: scale(1.02);
  }

  .userList__icon {
    flex: 1 1 20%;
  }

  .userList__nickName {
    flex: 1 1 30%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .userList__studyTime {
    flex: 1 1 50%;
    display: flex;
    justify-content: center;
  }
  .user_image {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin: 10px;
  }

  .studyTime {
    width: 100px;
    height: auto;
    background-color: ${(props) => props.theme.body};
    border-radius: 4px;
    padding: 10px;
  }

  .user_image img {
    object-fit: contain;
  }

  .studyTime,
  .userList__nickName {
    color: ${(props) => props.theme.text};
  }

  @media screen and (max-width: 600px) {
    .userList__icon {
      flex: 1 1 5%;
    }

    .userList__nickName {
      flex: 1 1 50%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .userList__studyTime {
      flex: 1 1 20%;
      display: flex;
      justify-content: center;
    }

    .studyTime {
      width: 50px;
      height: auto;
      background-color: ${(props) => props.theme.body};
      border-radius: 4px;
      padding: 10px;
    }
  }
`;

export default StudyTimeRanking;
