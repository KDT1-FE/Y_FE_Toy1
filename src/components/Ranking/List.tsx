import React from "react";
import "../../styles/RankingList.css";

interface Props {
  num: number;
  name: string;
  time: number;
}

function List({num, name, time}: Props) {
  return (
    <div className="ListContainer">
      <div>
        {num}등 {num <= 3 ? <span>&#127881;</span> : null}
      </div>
      <div>{name}</div>
      <div>{time}분</div>
    </div>
  );
}

export default List;
