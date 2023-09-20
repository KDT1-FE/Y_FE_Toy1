import React, {useEffect, useState} from "react";
import "../styles/ranking/rankingList.css";
import List from "../components/Ranking/List";
import {secsToMins} from "../utils/timerAndRanking";

function Ranking() {
  const [data, setData] = useState<any[]>();

  useEffect(() => {
    const rankingData = JSON.parse(sessionStorage.getItem("ranking") as string);
    setData(rankingData);
  }, []);

  return (
    <div className="RankingContainer">
      <div className="RankingInnerContainer">
        <h1 className="RankingTitle"> ✍ 오늘의 스터디 랭킹 ✍ </h1>
        {data?.length !== 0 ? (
          data?.map((list, index) => (
            <List
              num={index + 1}
              name={list.name}
              time={secsToMins(list.time)}
            />
          ))
        ) : (
          <>아직 기록하신 분이 없어요 ㅜ</>
        )}
      </div>
    </div>
  );
}

export default Ranking;
