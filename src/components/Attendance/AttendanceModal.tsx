import React, { useState, useEffect } from 'react';
import { collection, addDoc, doc, updateDoc, Timestamp } from 'firebase/firestore';
import db from '../../firebase/fireStore';
import Modal from '../Modal';

import '../../scss/components/_attendanceModal.scss';

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
  const [docId, setDocId] = useState<string | null>(null);

  const toggleAttendance = async () => {
    const currentTime = Timestamp.fromDate(new Date());

    if (attendStatus === '출근') {
      try {
        const docRef = await addDoc(collection(db, 'attendance'), {
          date: currentTime.toDate().toISOString().split('T')[0],
          checkIn: currentTime,
          checkOut: null,
        });
        setDocId(docRef.id);

        // LocalStorage에 checkIn 시간과 docId 저장
        localStorage.setItem('checkIn', currentTime.toDate().toISOString());
        localStorage.setItem('docId', docRef.id);

        setAttendStatus('퇴근');
        setCounter('근무 시작');
        setAttendActive(true);
        setStartTime(new Date());
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    } else {
      try {
        if (docId) {
          await updateDoc(doc(db, 'attendance', docId), {
            checkOut: currentTime,
          });

          // LocalStorage에서 데이터 제거
          localStorage.removeItem('checkIn');
          localStorage.removeItem('docId');
        }
        setAttendStatus('출근');
        setCounter('출근 전');
        setAttendActive(false);
        setStartTime(null);
      } catch (error) {
        console.error('Error updating document: ', error);
      }
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

  useEffect(() => {
    // 페이지 로딩 시 LocalStorage에서 데이터 로드
    const storedCheckIn = localStorage.getItem('checkIn');
    const storedDocId = localStorage.getItem('docId');

    if (storedCheckIn) {
      setAttendStatus('퇴근');
      setCounter('근무 시작');
      setAttendActive(true);
      setStartTime(new Date(storedCheckIn));
    }

    if (storedDocId) {
      setDocId(storedDocId);
    }
  }, []);

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
