import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Modal } from "./Modal";
import "./Header.css";

const Header = () => {
  const pageLink = ["", "Wiki/", "Gallery"];
  const pageName = ["Home", "Wiki", "Gallery"];

  const [isModalActive, setIsModalActive] = useState(false);
  const openModal = () => {
    setIsModalActive(true);
  };

  return (
    <>
      <Container>
        <ul className="header__link_wrapper">
          {pageLink.map((link, idx) => (
            <li key={pageName[idx]}>
              <Link to={`/${link}`}> {pageName[idx]} </Link>
            </li>
          ))}
        </ul>
      </Container>

      {isModalActive && (
        <Modal
          setModal={setIsModalActive}
          width="400"
          height="200"
          element={<div>Hello Modal!</div>}
        />
      )}
    </>
  );
};

export const Container = styled.nav`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  width: 100%;
  height: 60px;
  background-color: #999;
  font-size: 1rem;
  z-index: 10;
`;

export default Header;
