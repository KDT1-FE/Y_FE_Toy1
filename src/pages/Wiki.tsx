import React from "react";
import "../styles/wiki/wiki.css";
import WikiSidebar from "../components/Wiki/WikiSidebar";
import Content from "../components/Wiki/Content";

function Wiki() {
  return (
    <div className="WikiWrap">
      <WikiSidebar />
      <Content />
    </div>
  );
}

export default Wiki;
