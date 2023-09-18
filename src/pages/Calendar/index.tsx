import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import styled from 'styled-components';
import { EventContentArg } from '@fullcalendar/core';
import ReactModal from 'react-modal';
import { FormEvent } from 'react';
import { uploadCalendarData } from 'apis/Calendar';

export const renderEventContent = (eventInfo: EventContentArg) => {
  return (
    <>
      <i style={{ color: '#3584F4' }}>{eventInfo.event.title}</i>
    </>
  );
};

function Calendar() {
  const events = [
    { title: 'Meeting1', start: new Date('2023-9-29') },
    { title: 'Meeting2', start: new Date('2023-9-30') },
  ];

  const checkValidate = (endDate: string, startDate: string) => {
    if (new Date(endDate) > new Date(startDate)) {
      alert('종료일이 시작일보다 먼저입니다 다시 작성해주세요');
      return false;
    }
    return true;
  };

  const handleSubmit = (event: FormEvent) => {
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
      uploadCalendarData({ content, startDate, endDate });
    }
  };

  return (
    <>
      <StyledContainer>
        <StyledInfo>
          <StyledInfoImg />
          <StyledInfoText>박가현님</StyledInfoText>
          <StyledLogoutButton>로그아웃</StyledLogoutButton>
        </StyledInfo>
        <StyledCalendarContainer>
          <StyledCalendarText>나의 캘린더</StyledCalendarText>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={events}
            headerToolbar={{
              right: 'prev,next myCustomButton',
            }}
            eventContent={renderEventContent}
            customButtons={{
              myCustomButton: {
                text: '일정 등록',
                click: () => {
                  console.log('first');
                },
              },
            }}
          />
        </StyledCalendarContainer>
      </StyledContainer>
      <ReactModal isOpen={true} ariaHideApp={false} style={StyledModal}>
        일정을 등록해주세요
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

    fontSize: '2rem',
    fontWeight: '600',

    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
};

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
  padding: 18vh 0 0 0;
  max-width: 75rem;
  margin: 0 auto;
  display: flex;
  gap: 7rem;
`;
const StyledInfo = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  border: 1px solid blue;
`;
const StyledCalendarContainer = styled.section`
  height: 20rem;
  width: 50rem;
`;
const StyledInfoImg = styled.img`
  width: 5rem;
  height: 4.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  background-color: #d9d9d9;
`;
const StyledInfoText = styled.div`
  font-size: 2rem;
  font-weight: 700;
`;
const StyledLogoutButton = styled.button`
  border-radius: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.26);
  padding: 0.375rem 1rem;
`;
const StyledCalendarText = styled.div`
  font-size: 2.2rem;
  font-weight: 700;
`;
export default Calendar;
