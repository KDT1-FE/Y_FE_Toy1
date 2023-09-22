import React from "react";
import "../../styles/ranking/rankingList.css";
import {ListProps} from "../../types/Ranking";

function List({num, name, time}: ListProps) {
  return (
    <div
      className="ListContainer"
      style={num <= 3 ? {backgroundColor: "#fff39e"} : {}}
    >
      <div>
        {num}등 {num <= 3 ? <span>&#127894;</span> : null}
      </div>
      <div>{name}</div>
      <div style={num <= 3 ? {color: "red"} : {}}>
        {time?.hrs}시간 {time?.mins}분 {time?.secs}초
      </div>
    </div>
  );
}

export default List;
