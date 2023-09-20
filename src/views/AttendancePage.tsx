import React, { useState, useEffect } from 'react';
import { collection, getDocs, Timestamp, query, orderBy } from 'firebase/firestore';
import db from '../firebase/fireStore';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

import AttendanceModal from '../components/Attendance/AttendanceModal';

import '../scss/attendancePage.scss';

interface AttendanceRecord {
  date: string;
  checkIn: Timestamp;
  checkOut: Timestamp | null;
  id?: string;
}

const Attendance = (): JSX.Element => {
  const [modal, setModal] = useState<boolean>(false);
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([]);
  const [startPage, setStartPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 18;
  const maxPageNumbersToShow = 10;
  const totalPages = Math.ceil(attendanceData.length / itemsPerPage);
  const lastPageToShow = Math.min(startPage + maxPageNumbersToShow - 1, totalPages);

  const formatTimestamp = (timestamp: Timestamp | null): string => {
    if (!timestamp) return '-';
    const date = timestamp.toDate();
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date
      .getSeconds()
      .toString()
      .padStart(2, '0')}`;
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = attendanceData.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = [];
  for (let i = startPage; i <= lastPageToShow; i++) {
    renderPageNumbers.push(
      <span className={`number ${currentPage === i ? 'active' : ''}`} key={i} onClick={() => setCurrentPage(i)}>
        {i}
      </span>,
    );
  }
  const handleNextPageNumbers = () => {
    if (lastPageToShow < totalPages) {
      setStartPage(prev => prev + maxPageNumbersToShow);
    }
  };

  const handlePrevPageNumbers = () => {
    if (startPage > 1) {
      setStartPage(prev => prev - maxPageNumbersToShow);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(query(collection(db, 'attendance'), orderBy('checkIn', 'desc')));
      const data: AttendanceRecord[] = [];
      querySnapshot.forEach(doc => {
        data.push({ ...(doc.data() as AttendanceRecord), id: doc.id });
      });
      setAttendanceData(data);
    };

    fetchData();
  }, []);

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
            {currentItems.map(record => (
              <div className="attendance__list" key={record.id}>
                <div>{record.date}</div>
                <div>{formatTimestamp(record.checkIn)}</div>
                <div>{formatTimestamp(record.checkOut)}</div>
              </div>
            ))}
          </div>
          <div className="attendance__list__pagination">
            <button onClick={handlePrevPageNumbers} disabled={startPage === 1}>
              <AiOutlineArrowLeft />
            </button>
            {renderPageNumbers}
            <button onClick={handleNextPageNumbers} disabled={lastPageToShow === totalPages}>
              <AiOutlineArrowRight />
            </button>
          </div>
        </div>
      </div>
      {modal && <AttendanceModal isOpen={modal} onClose={() => setModal(false)} />}
    </>
  );
};

export default Attendance;
