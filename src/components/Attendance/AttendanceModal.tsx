import React, { useState, useEffect } from 'react';
import { collection, addDoc, doc, updateDoc, Timestamp } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';
import { db, auth } from '../../firebase';
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
  const [user, setUser] = useState<null | User>(null);

  const setLocalStorage = (checkIn: string, docId: string) => {
    localStorage.setItem('checkIn', checkIn);
    localStorage.setItem('docId', docId);
  };

  const removeLocalStorage = () => {
    localStorage.removeItem('checkIn');
    localStorage.removeItem('docId');
  };

  const currentTime = Timestamp.fromDate(new Date());
  const commonDate = currentTime.toDate().toISOString().split('T')[0];

  const toggleAttendance = async () => {
    if (!user) return;

    if (attendStatus === '출근') {
      try {
        const docRef = await addDoc(collection(db, 'attendance', user.uid, 'records'), {
          date: commonDate,
          checkIn: currentTime,
          checkOut: null,
        });
        setDocId(docRef.id);
        setLocalStorage(commonDate, docRef.id);

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
          await updateDoc(doc(db, 'attendance', user.uid, 'records', docId), { checkOut: currentTime });
          removeLocalStorage();
        }
        setAttendStatus('출근');
        setCounter('출근 전');
        setAttendActive(false);
        setStartTime(null);
        onClose();
        window.location.reload();
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

        const counterMsg = minutes < 1 ? `${seconds}초 동안 근무중` : `${hours}시간 ${minutes}분 동안 근무중`;
        setCounter(counterMsg);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  useEffect(() => {
    const storedCheckIn = localStorage.getItem('checkIn');
    const storedDocId = localStorage.getItem('docId');
    if (storedCheckIn) setStartTime(new Date(storedCheckIn));
    if (storedDocId) setDocId(storedDocId);

    setAttendActive(!!storedCheckIn);
    setCounter(storedCheckIn ? '근무 시작' : '출근 전');
    setAttendStatus(storedCheckIn ? '퇴근' : '출근');
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  if (!isOpen) return null;

  return (
    <Modal onClose={onClose} showCloseButton={true}>
      <div className="attendance">
        <div className="attendance__date">{commonDate}</div>
        <div className="attendance__clock">{time.toLocaleTimeString()}</div>
        <div className="attendance__btn-box">
          <div className={`attendance__btn__counter ${attendActive === true ? 'active' : ''}`}>{counter}</div>
          <div
            className={`attendance__btn__attend ${attendActive === true ? 'active' : ''}`}
            onClick={user ? toggleAttendance : undefined}
            style={{ cursor: user ? 'pointer' : 'not-allowed' }}>
            {attendStatus}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Attendance;
