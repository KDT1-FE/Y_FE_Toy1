import moment from "moment";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";

const CustomCalendarContainer = styled.div`
  /* 원하는 스타일을 여기에 추가하세요 */
  max-width: 1400px; /* 예시: 컬럼의 너비를 늘릴 때 */
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  padding: 0 100px;

  .react-calendar {
    line-height: 5em;
  }
`;

const CustomCalendar = styled(Calendar)`
  /* Calendar 컴포넌트에 대한 추가 스타일을 여기에 추가하세요 */
  /* 예시: 크기 조정 */
  width: 100%;
  background-color: rgba(150, 160, 255, 0.2);
  height: 400px; /* 원하는 높이로 조절 */
`;

function Calendars() {
  const [value, onChange] = useState(new Date());
  return (
    <CustomCalendarContainer>
      <div className="text-gray-500 mt-4">
        {moment(value).format("YYYY년 MM월 DD일")}
      </div>
      <CustomCalendar onClickDay={onChange} value={value} />
    </CustomCalendarContainer>
  );
}

export default Calendars;
