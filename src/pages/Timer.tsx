import React, { useState } from "react";
import { styled } from "styled-components";
import TimerApp from "../components/Timer/TimerApp";

const TimerModalContent = styled.div`
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 0;
  display: flex;
  justify-content: flex-end;
  line-height: 1.2;
  text-align: right;
  padding-right: 5rem;
`;

const Timer = () => {
  return (
    <TimerModalContent>
      <TimerApp />
    </TimerModalContent>
  );
};

export default Timer;
