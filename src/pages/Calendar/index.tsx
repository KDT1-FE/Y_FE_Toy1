import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import closeButton from '../../assets/icons/closeButton.svg';
import { FormEvent, useEffect, useState } from 'react';
import {
  deleteCalendarData,
  getCalendarData,
  uploadCalendarData,
} from 'apis/Calendar';
import { CloseImg } from 'components/CommuteModal';
import { dayFormat } from 'utils/format';
import Swal from 'sweetalert2';
import { getName } from 'utils/user';
import { EventClickArg } from '@fullcalendar/core';
import { media } from 'styles/media';

interface IEvent {
  title: string;
  start: Date;
  end: Date;
}

function Calendar() {
  const [events, setEvents] = useState<IEvent[] | []>();
  const [showModal, setShowModal] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const getEvents = async () => {
    console.log('실행');
    const responseArray = await getCalendarData();
    setEvents(responseArray);
  };

  const checkValidate = (endDate: string, startDate: string) => {
    if (new Date(endDate) > new Date(startDate)) {
      alert('종료일이 시작일보다 먼저입니다 다시 작성해주세요');
      return false;
    }
    return true;
  };

  const handleEventAlert = async (info: EventClickArg) => {
    const result = await Swal.fire({
      title: `${info.event._def?.title}`,
      text: `${dayFormat(info.event._instance?.range.end)}~${dayFormat(
        info.event._instance?.range.start,
      )}`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#001529',
      confirmButtonText: '일정 삭제',
      cancelButtonText: '취소',
    });
    if (result.isConfirmed) {
      await deleteCalendarData(info.event._def?.publicId);
      setIsDelete(!isDelete);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (event.currentTarget instanceof HTMLFormElement) {
      const formData = new FormData(event.currentTarget);
      const content = formData.get('content');
      const startDate = formData.get('start_date');
      const endDate = formData.get('end_date');
      if (
        typeof endDate !== 'string' ||
        typeof startDate !== 'string' ||
        typeof content !== 'string'
      )
        return;
      if (!checkValidate(startDate, endDate)) return;
      await uploadCalendarData({ content, startDate, endDate });
      setShowModal(false);
    }
  };

  useEffect(() => {
    getEvents();
  }, [showModal, isDelete]);

  return (
    <>
      <StyledContainer>
        <StyledCalendarContainer>
          <StyledCalendarText>{`${getName()}님의 캘린더`}</StyledCalendarText>
          <StyledMobileText>
            pc에서 캘린더의 더 다양한 기능을 <br />
            만날 수 있습니다
          </StyledMobileText>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={events}
            headerToolbar={{
              right: 'prev,next addButton',
            }}
            customButtons={{
              addButton: {
                text: '일정 등록',
                click: () => {
                  setShowModal(true);
                },
              },
            }}
            eventClick={(info) => {
              handleEventAlert(info);
            }}
          />
        </StyledCalendarContainer>
      </StyledContainer>

      {/* 일정 등록 모달 */}
      <ReactModal isOpen={showModal} ariaHideApp={false} style={StyledModal}>
        <StyledTopContainer>
          일정을 등록해주세요
          <CloseImg
            src={closeButton}
            onClick={() => {
              setShowModal(false);
            }}
            alt="close icon"
          />
        </StyledTopContainer>
        <StyledForm onSubmit={handleSubmit}>
          <label>일정 내용</label>
          <StyledTextInput type="text" id="content" name="content" required />
          <label>시작 날짜</label>
          <input type="date" id="start_date" name="start_date" required />
          <label>종료 날짜</label>
          <input type="date" id="end_date" name="end_date" required />
          <StyledBottomContainer>
            <StyledButton type="submit">등록</StyledButton>
          </StyledBottomContainer>
        </StyledForm>
      </ReactModal>
    </>
  );
}

const StyledModal: ReactModal.Styles = {
  overlay: {
    backgroundColor: ' rgba(0, 0, 0, 0.4)',
    inset: '0px',
    position: 'fixed',
    zIndex: '90000',
  },
  content: {
    width: '34.25rem',
    height: '27.5rem',
    zIndex: '90000',

    position: 'absolute',
    top: '50%',
    left: '50%',

    borderRadius: '0.375rem',
    paddingTop: '3rem',
    border: 'none',

    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    outline: 'none',

    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
};

const StyledTopContainer = styled.section`
  font-size: 2rem;
  font-weight: 600;

  display: flex;
  justify-content: space-between;
`;

const StyledForm = styled.form`
  font-size: 1.2rem;
  font-weight: 500;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledTextInput = styled.input`
  height: 1.7rem;
`;

const StyledButton = styled.button`
  background-color: #3584f4;
  color: #fff;

  font-size: 1.25rem;
  font-weight: 500;

  width: 7rem;
  height: 2rem;
  border-radius: 0.375rem;
  margin-top: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: #1b64da;
  }
`;

const StyledBottomContainer = styled.section`
  display: flex;
  justify-content: flex-end;
`;

const StyledContainer = styled.div`
  padding: 10vh 0 0 0;
  max-width: 75rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledCalendarContainer = styled.section`
  height: 20rem;
  width: 50rem;

  ${media.desktop_lg(`
  height: 20rem;
  width: 40rem;
`)}

  ${media.mobile(`
  width: 30rem;
  height: 27rem;
  padding:0 3rem;
`)}
`;

const StyledCalendarText = styled.div`
  font-size: 2.2rem;
  font-weight: 700;

  margin-bottom: 2rem;

  ${media.desktop_lg(`
  font-size: 1.9rem;
`)}

  ${media.mobile(`
 font-size: 1.7rem;
`)}
`;
const StyledMobileText = styled.div`
  display: none;
  ${media.mobile(`
  display:block;
  font-size: 1.1rem;
  margin-bottom:1rem;
  color:#dcdcdc
 `)}
`;
export default Calendar;
