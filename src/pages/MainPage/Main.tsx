import React from "react";
import Carousel from "./Carousel";
import Calendars from "./Calendar"; // Calendars 컴포넌트를 가져옵니다.

function Main() {
  return (
    <div>
      <Carousel />
      <Calendars /> {/* Calendars 컴포넌트를 사용합니다. */}
    </div>
  );
}

export default Main;
