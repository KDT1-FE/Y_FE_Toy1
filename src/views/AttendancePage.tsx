import React, { useState } from 'react';

import AttendanceModal from '../components/AttendanceModal';

import '../scss/attendancePage.scss';

const Attendance = (): JSX.Element => {
  const [modal, setModal] = useState<boolean>(false);

  return (
    <>
      <div id="attendancePage">
        <div className="attendancePage__title-box">
          <h2>이번 주 근무 내역</h2>
          <div
            onClick={() => {
              setModal(true);
            }}>
            출퇴근
          </div>
        </div>
        <div className="attendance__list-wrap">
          <div className="attendance__list__title">
            <div>날짜</div>
            <div>출근 시간</div>
            <div>퇴근 시간</div>
          </div>
          <div className="attendance__list-box">
            <div className="attendance__list">
              <div>기록 날짜</div>
              <div>출근 시간 기록</div>
              <div>퇴근 시간 기록</div>
            </div>
            <div className="attendance__list">
              <div>기록 날짜</div>
              <div>출근 시간 기록</div>
              <div>퇴근 시간 기록</div>
            </div>
            <div className="attendance__list">
              <div>기록 날짜</div>
              <div>출근 시간 기록</div>
              <div>퇴근 시간 기록</div>
            </div>
            <div className="attendance__list">
              <div>기록 날짜</div>
              <div>출근 시간 기록</div>
              <div>퇴근 시간 기록</div>
            </div>
            <div className="attendance__list">
              <div>기록 날짜</div>
              <div>출근 시간 기록</div>
              <div>퇴근 시간 기록</div>
            </div>
          </div>
          <div className="attendance__list__pagination"></div>
        </div>
      </div>
      {modal && <AttendanceModal isOpen={modal} onClose={() => setModal(false)} />}
    </>
  );
};

export default Attendance;
