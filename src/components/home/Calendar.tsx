import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../../firebase";
import { EventData } from "../../types/home";
import AddEventModal from "./AddEventModal";
import EventDetailModal from "./EventDetailModal";
import { useAuth } from "../../context/AuthContext";

const CalendarBox = styled.div`
  position: relative;
  width: 100%;
  height: 90vh;
  border: 1.2px solid #d2d2d2;
  border-radius: 10px;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;

  .fc .fc-toolbar-title::after {
    content: "일정";
    margin-left: 0.5rem;
  }
  .fc .fc-toolbar-title {
    font-family: "NotoSansKR-bold";
    font-size: 1.5rem;
  }

  .fc .fc-button-primary {
    background-color: #f6f7f9;
    border: none;
    color: #7a7b7c;
  }

  .fc-col-header-cell {
    padding: 1rem;
  }

  .fc .fc-button {
    font-family: "NotoSansKR-Medium";
    padding: 0.2rem;
    font-size: 0.9rem;
  }

  .fc .fc-button-group {
    display: inline-flex;
    gap: 0.5rem;
  }
  .fc-theme-standard th {
    background-color: #f6f7f9;
    font-size: 1.1rem;
    font-family: "NotoSansKR-regular";
  }

  .fc .fc-daygrid-day-top {
    font-family: "NotoSansKR-medium";
    font-size: 0.6rem;
  }

  .fc-event {
    padding: 5px 8px;
    margin-bottom: 5px;
    border-radius: 5px;
    border: none;
    background-color: #a5d8ff;
    font-size: 0.5rem;
    font-family: "NotoSansKR-medium";
  }
  .fc-sticky {
    color: #000;
  }

  .fc .fc-daygrid-day.fc-day-today {
    background-color: #e9ecef;
  }

  .fc .fc-daygrid-day-frame {
    cursor: pointer;
  }
`;

const AddContentButton = styled.button`
  position: absolute;
  right: 10rem;
  top: 1.6rem;
  height: 1.7rem;
  font-size: 0.6rem;
  display: flex;
  align-items: center;
  background-color: #1555c3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: "NotoSansKR-Medium";
`;

const HomeCalendar = () => {
  const [isAddModal, setIsModal] = useState<boolean>(false);
  const [isDetailModal, setIsDetailModal] = useState<boolean>(false);
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [events, setEvents] = useState<EventData[] | []>([]);
  const [selectedDay, setSelectedDay] = useState<string>("");
  const { currentUser } = useAuth();

  const handelAddModal = () => {
    setIsModal(!isAddModal);
  };

  const handelDetailModal = () => {
    setIsDetailModal(!isDetailModal);
  };

  const handleDayClick = (day: string) => {
    setSelectedDay(day);
    handelDetailModal();
  };

  const handleFatchEvent = () => {
    setIsFetched(!isFetched);
  };

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "events"));
    const data: any[] = [];
    querySnapshot.forEach(doc => {
      data.push({ id: doc.id, ...doc.data() });
    });
    setEvents(data);
  };

  useEffect(() => {
    fetchData();
  }, [isFetched]);

  return (
    <CalendarBox>
      {isAddModal && (
        <AddEventModal
          isModalChange={handelAddModal}
          handleFatchEvent={handleFatchEvent}
        />
      )}
      {isDetailModal && (
        <EventDetailModal
          isModalChange={handelDetailModal}
          handleFatchEvent={handleFatchEvent}
          selectedDay={selectedDay}
        />
      )}
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        events={events}
        height="100%"
        locale="ko"
        selectable
        dateClick={info => handleDayClick(info.dateStr)}
      />
      {currentUser?.displayName && (
        <AddContentButton type="button" onClick={handelAddModal}>
          일정 추가하기
        </AddContentButton>
      )}
    </CalendarBox>
  );
};

export default HomeCalendar;
