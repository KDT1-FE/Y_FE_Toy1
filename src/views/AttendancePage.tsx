import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { collection, getDocs, Timestamp, query, orderBy } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

import Placeholder from '../components/Placeholder';
import AttendanceModal from '../components/Attendance/AttendanceModal';

import '../scss/attendancePage.scss';

interface AttendanceRecord {
  date: string;
  checkIn: Timestamp;
  checkOut: Timestamp | null;
  id?: string;
}
interface StateValue {
  isLogin: boolean;
  name: string;
  email: string;
}
interface State {
  loginUpdate: StateValue;
}

const Attendance = (): JSX.Element => {
  const [modal, setModal] = useState(false);
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([]);
  const [startPage, setStartPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 18;
  const maxPageNumbersToShow = 10;
  const totalPages = Math.ceil(attendanceData.length / itemsPerPage);
  const lastPageToShow = Math.min(startPage + maxPageNumbersToShow - 1, totalPages);
  const currentItems = attendanceData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const loginState = useSelector((state: State) => state.loginUpdate);

  const fetchAttendanceData = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const qSnapshot = await getDocs(
      query(collection(db, 'attendance', user.uid, 'records'), orderBy('checkIn', 'desc')),
    );
    const data: AttendanceRecord[] = qSnapshot.docs.map(doc => ({ ...(doc.data() as AttendanceRecord), id: doc.id }));
    setAttendanceData(data);
  };

  const formatTimestamp = (timestamp: Timestamp | null): string => {
    if (!timestamp) return '-';
    const date = timestamp.toDate();
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date
      .getSeconds()
      .toString()
      .padStart(2, '0')}`;
  };

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
    const unsubscribe = auth.onAuthStateChanged(() => fetchAttendanceData());
    return () => unsubscribe();
  }, []);

  return (
    <>
      <div id="attendancePage">
        <div className="attendancePage__top">
          <h1>근무 내역</h1>
          <span className="attendancePage__top__add-btn">
            <div
              className="attendancePage__top__attend-btn"
              onClick={() => {
                if (!loginState.isLogin) {
                  alert('로그인이 필요합니다');
                  return;
                }
                setModal(true);
              }}>
              출퇴근
            </div>
          </span>
        </div>
        <div className="attendance__list-wrap">
          <div className="attendance__list__title">
            <div>날짜</div>
            <div>출근 시간</div>
            <div>퇴근 시간</div>
          </div>
          <div className="attendance__list-box">
            {loginState.isLogin ? (
              <>
                {currentItems.map(record => (
                  <div className="attendance__list" key={record.id}>
                    <div>{record.date}</div>
                    <div>{formatTimestamp(record.checkIn)}</div>
                    <div>{formatTimestamp(record.checkOut)}</div>
                  </div>
                ))}
                {Array(18 - currentItems.length)
                  .fill(0)
                  .map((_, idx) => (
                    <Placeholder key={idx} type="attendance" />
                  ))}
                <div className="attendance__list__pagination">
                  <button onClick={handlePrevPageNumbers} disabled={startPage === 1}>
                    <AiOutlineArrowLeft />
                  </button>
                  {renderPageNumbers}
                  <button onClick={handleNextPageNumbers} disabled={lastPageToShow === totalPages}>
                    <AiOutlineArrowRight />
                  </button>
                </div>
              </>
            ) : (
              <div className="attendance__list--logout">로그인이 필요합니다.</div>
            )}
          </div>
        </div>
      </div>
      {modal && <AttendanceModal isOpen={modal} onClose={() => setModal(false)} />}
    </>
  );
};

export default Attendance;
