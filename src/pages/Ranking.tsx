import React, {useEffect, useState} from "react";

import "../styles/RankingList.css";
import List from "../components/Ranking/List";
import {
  sortRanking,
  getDayAndReset,
  getDocsToArr,
  secsToMins,
} from "../utils/ranking";

function Ranking() {
  const [data, setData] = useState<any[]>();

  useEffect(() => {
    getDocsToArr().then(doc => {
      const sortedData = sortRanking(doc);
      setData(sortedData);
    });
    getDayAndReset();
  }, []);

  return (
    <div className="RankingContainer">
      <div className="RankingInnerContainer">
        <h1 className="RankingTitle"> ✍ 오늘의 스터디 랭킹 ✍ </h1>
        {data?.length !== 0 ? (
          data?.map((x, index) => (
            <List num={index + 1} name={x.name} time={secsToMins(x.time)} />
          ))
        ) : (
          <>아직 기록하신 분이 없어요 ㅜ</>
        )}
      </div>
    </div>
  );
}

export default Ranking;
