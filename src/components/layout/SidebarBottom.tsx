import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const SidebarBottom = (): JSX.Element => {
  return (
    <SidebarBottomBox>
      <hr />
      <a
        href="https://app.slack.com/client/T057XJP4T34/C05FRTBDHDL"
        target="_blank"
        rel="noreferrer"
      >
        <img
          src={process.env.PUBLIC_URL + "/svg/AttendanceQR.svg"}
          alt="QR코드"
        />
      </a>
      <div>
        <a
          href="https://www.notion.so/X-24f85bf2ff4e4c69bd45ddc4e05d464b"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="svg_icon"
            src={process.env.PUBLIC_URL + "/svg/notion_icon.svg"}
            alt="notion"
          />
        </a>
        <a
          href="https://docs.google.com/spreadsheets/d/1Ffg--2TCzecwLMODoBHrTAk7zWufPLrJoyLVCwE4ea4/edit#gid=1823006152"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="svg_icon"
            src={process.env.PUBLIC_URL + "/svg/sheet_icon.svg"}
            alt="sheet"
          />
        </a>
        <a
          href="https://us06web.zoom.us/j/4912611157?pwd=N2swc3kxRG9uYTFKa2lBTUI2dS9NZz09#success"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="svg_icon"
            src={process.env.PUBLIC_URL + "/svg/zoom_icon.svg"}
            alt="zoom"
          />
        </a>
      </div>
    </SidebarBottomBox>
  );
};

const SidebarBottomBox = styled.div`
  bottom: 0;
  text-align: center;
`;

export default SidebarBottom;
