import React, {useEffect, useState} from "react";
import "../../styles/Wiki.css";
import {useParams} from "react-router-dom";
import TextEditor from "./TextEditor";

function Content() {
  const {id} = useParams() as {id: string};
  const [text, setText] = useState("");
  const [editTrue, setEditTrue] = useState(false);

  const clickEdit = () => {
    setEditTrue(!editTrue);
    console.log(editTrue);
  };

  useEffect(() => {
    console.log(id);
    setText(id);
    console.log(text);
  }, [id]);

  return (
    <div style={{width: "80%", fontSize: "100%"}}>
      <h1>{text}</h1>
      <button type="button" onClick={clickEdit}>
        {editTrue ? "수정취소" : "수정하기"}
      </button>
      <div id="main-content">
        {editTrue ? (
          <TextEditor />
        ) : (
          <div>Url 파라미터값을 키로 갖는 데이터를 가져와 렌더링해줍니다</div>
        )}
      </div>
    </div>
  );
}

export default Content;
