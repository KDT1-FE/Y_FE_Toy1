import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import swal from 'sweetalert';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../../utils/firebase.config';
import WikiModal from '../../../../assets/wiki-modal.png';
import MapComponent from '../../../map';
import { setWithModalData } from '../../../../utils/util';
import { countIdState, countState } from '../../../../recoil/countRecoil';
import { emailState } from '../../../../recoil/authRecoil';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationChange: (props: string) => void;
  onTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onContentsChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onRecruitmentTimeChange: (
    event: React.ChangeEvent<HTMLButtonElement>,
  ) => void;
  onMaxPeopleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 3;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  position: relative;
  width: 60rem;
  height: 75%;
  max-height: 80%;
  overflow-x: hidden;
  padding-bottom: 7rem;
  box-sizing: border-box;

  border-radius: 1.5rem;
  background-color: var(--color-white);

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ModalInput = styled.input`
  height: 4rem;
  border: 1px solid #ccc;
  border-radius: 5px;

  font-size: 1.3rem;
`;

const ModalTextarea = styled.textarea`
  height: 7rem;
  font-size: 1.3rem;

  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ModalImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 22rem;

  border-radius: 1rem 1rem 0 0;

  background-image: url(${WikiModal});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const StringLabel = styled.label`
  display: flex;
  flex-direction: column;

  margin: 4rem 10rem 0;

  color: #525252;
  font-size: 1.3rem;
  font-weight: 700;
  gap: 1rem;
`;

const StringLabelInfo = styled.label`
  margin-top: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: #747474;
`;

const ButtonWrapper = styled.label`
  display: flex;
  justify-content: space-around;
  align-items: center;

  width: 100%;

  gap: 1rem;
`;

const WithBtn = styled.div<{ $active?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 20%;

  padding: 0.6rem 1.5rem;

  font-size: 1.5rem;
  font-weight: 400;
  background-color: ${props => {
    return props.$active ? '#ffa800' : '#ffd337';
  }};
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: #ffe071;
  }
`;

const EnrollButton = styled.button`
  font-family: 'IBMPlexSansKR-Regular';
  position: relative;
  bottom: -2rem;
  right: 0;
  left: 0;
  padding: 0.5rem 1.5rem;

  color: var(--color-white);
  font-size: 2rem;
  background-color: #ffd337;
  border: none;
  border-radius: 3rem;

  cursor: pointer;
  &:hover {
    background-color: #ffda4f;
  }
`;

const ExitButton = styled.button`
  font-family: 'IBMPlexSansKR-Regular';
  position: absolute;
  top: 3rem;
  right: 3rem;
  width: 5rem;
  height: 3rem;

  color: var(--color-white);
  font-size: 1.5rem;
  background-color: #ffd337;
  border: none;
  border-radius: 3rem;
  cursor: pointer;

  &:hover {
    background-color: #ffda4f;
  }
  z-index: 10;
`;

const setData = async (collectionName: string, props: any): Promise<void> => {
  const date = new Date();
  const dataId = `${collectionName}-${date.getTime()}`;

  await setDoc(doc(db, collectionName, dataId), props);
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onLocationChange,
  onTitleChange,
  onContentsChange,
  onRecruitmentTimeChange,
  onMaxPeopleChange,
}) => {
  const [location, setLocation] = useState('');
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [recruitmentTime, setRecruitmentTime] = useState(10);
  const [active, setActive] = useState<boolean[]>([false, false, false]);
  const [maxPeople, setMaxPeople] = useState(2);

  const [isTitleValid, setIsTitleValid] = useState(false);
  const [isContentValid, setIsContentValid] = useState(false);
  const [isLocationValid, setIsLocationValid] = useState(false);
  const setCount = useSetRecoilState(countState);
  const setCountId = useSetRecoilState(countIdState);
  const getEmail = useRecoilValue(emailState);

  const handlePlaceSelection = (address: string) => {
    setLocation(address);
    onLocationChange(address);
    setIsLocationValid(address.length > 0);
  };

  const handleRegister = async () => {
    if (!isTitleValid || !isContentValid || !isLocationValid) {
      return;
    }
    const ids = `${getEmail}-${Date.now()}`;
    try {
      await setWithModalData('with-collection', {
        id: ids,
        contents,
        joined: 1,
        location,
        people: maxPeople,
        time: Math.floor(Date.now() / 1000) + recruitmentTime * 60,
        title,
      });
      setCountId(ids);
      setCount((prev: number) => {
        return prev + 1;
      });

      onClose();
    } catch (error) {
      swal({
        title: '오류가 발생했습니다.',
        text: '잠시 후 다시 시도해주세요.',
        icon: 'error',
      });
    }
  };

  const activeBtn = (props: number) => {
    const updatedState = Array(3).fill(false);
    updatedState[props - 1] = true;
    setActive(updatedState);
    setRecruitmentTime(props * 10);
  };

  const setMaxPeopleValue = (props: number) => {
    let value = props;
    if (Number.isNaN(value)) {
      value = 1;
    }

    if (value <= 2) {
      value = 2;
    } else if (value >= 9) {
      value = 9;
    }
    setMaxPeople(value);
  };

  const modalClose = () => {
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      setLocation('');
      setTitle('');
      setContents('');
      setRecruitmentTime(10);
      setActive([false, false, false]);
      setMaxPeople(2);
      setIsTitleValid(false);
      setIsContentValid(false);
      setIsLocationValid(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <ModalWrapper
      onClick={() => {
        modalClose();
      }}
    >
      <ModalContent
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <ModalImageContainer />

        <StringLabel htmlFor="title">
          📌 제목
          <ModalInput
            type="text"
            id="title"
            value={title}
            required
            onChange={e => {
              setTitle(e.target.value);
              onTitleChange(e);
              setIsTitleValid(e.target.value.length > 0);
            }}
            placeholder={isTitleValid ? '' : '제목을 입력해주세요'}
          />
        </StringLabel>

        <StringLabel htmlFor="content">
          📌 내용
          <ModalTextarea
            id="content"
            value={contents}
            required
            placeholder={isContentValid ? '' : '내용을 입력해주세요'}
            onChange={e => {
              setContents(e.target.value);
              onContentsChange(e);
              setIsContentValid(e.target.value.length > 0);
            }}
          />
        </StringLabel>

        <StringLabel htmlFor="location">
          📌 위치
          <StringLabelInfo htmlFor="location">
            📍 선택한 장소: {location}
          </StringLabelInfo>
          <MapComponent onAddressSelect={handlePlaceSelection} />
        </StringLabel>

        <StringLabel htmlFor="recruitmentTime">
          📌 모집 시간 : {recruitmentTime}분
          <ButtonWrapper>
            <WithBtn
              $active={active[0]}
              onClick={() => {
                activeBtn(1);
              }}
            >
              10분
            </WithBtn>
            <WithBtn
              $active={active[1]}
              onClick={() => {
                activeBtn(2);
              }}
            >
              20분
            </WithBtn>
            <WithBtn
              $active={active[2]}
              onClick={() => {
                activeBtn(3);
              }}
            >
              30분
            </WithBtn>
          </ButtonWrapper>
        </StringLabel>

        <StringLabel htmlFor="maxPeople">
          📌 모집 인원
          <ModalInput
            type="number"
            id="maxPeople"
            value={maxPeople}
            onChange={e => {
              setMaxPeopleValue(Number(e.target.value));
              onMaxPeopleChange(e);
            }}
          />
          <EnrollButton
            type="button"
            onClick={handleRegister}
          >
            등록하기
          </EnrollButton>
        </StringLabel>

        <ExitButton
          type="button"
          onClick={modalClose}
        >
          닫기
        </ExitButton>
      </ModalContent>
    </ModalWrapper>
  );
};

export default Modal;
