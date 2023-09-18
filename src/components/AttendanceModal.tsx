import React, { useState, useEffect } from 'react';
import Modal from './Modal';

import '../scss/components/_attendanceModal.scss';

interface AttendanceProps {
  isOpen: boolean;
  onClose: () => void;
}

const Attendance = ({ isOpen, onClose }: AttendanceProps) => {
  const [time, setTime] = useState(new Date());
  const [attendStatus, setAttendStatus] = useState('출근');
  const [attendActive, setAttendActive] = useState<boolean>(false);
  const [counter, setCounter] = useState<'출근 전' | string>('출근 전');
  const [startTime, setStartTime] = useState<Date | null>(null);

  const toggleAttendance = () => {
    if (attendStatus === '출근') {
      setAttendStatus('퇴근');
      setCounter('근무 시작');
      setAttendActive(true);
      setStartTime(new Date());
    } else {
      setAttendStatus('출근');
      setCounter('출근 전');
      setAttendActive(false);
      setStartTime(null);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
      if (startTime) {
        const diff = new Date().getTime() - startTime.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        if (minutes < 1) {
          setCounter(`${seconds}초 동안 근무중`);
        } else {
          setCounter(`${hours}시간 ${minutes}분 동안 근무중`);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [startTime]);

  if (!isOpen) return null;

  return (
    <Modal onClose={onClose} showCloseButton={true}>
      <div className="attendance">
        <div className="attendance__clock">{time.toLocaleTimeString()}</div>
        <div className="attendance__btn-box">
          <div className={`attendance__btn__counter ${attendActive === true ? 'active' : ''}`}>{counter}</div>
          <div
            className={`attendance__btn__attend ${attendActive === true ? 'active' : ''}`}
            onClick={toggleAttendance}>
            {attendStatus}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Attendance;
