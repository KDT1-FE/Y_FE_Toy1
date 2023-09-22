import React, { useState } from 'react';
import styled from 'styled-components';
import swal from 'sweetalert';
import { useRecoilValue } from 'recoil';
import WithItem from './WIthItem';
import Modal from './Modal';
import getLoginAuth from '../../../hooks/getLoginAuth';
import { isCountSelector } from '../../../recoil/countRecoil';
import * as S from '../Layout/WikiLayout.styled';

export interface Root {
  id: string;
}

export type Props = {
  data: Root[];
};

export interface WithProp {
  title: string;
  id: string;
  contents: string;
  location: string;
  people: number;
  time: number;
  joined: number;
}

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  margin-bottom: 20px;
`;

const index: React.FC<Props> = ({ data }): JSX.Element => {
  const isLogin = getLoginAuth();
  const isCount = useRecoilValue(isCountSelector);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [modalData, setModalData] = useState({
    restaurantLocation: '',
    title: '',
    contents: '',
    recruitmentTime: '',
    maxPeople: 0,
  });

  const openModal = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isLogin) {
      swal({
        title: '로그인이 필요합니다.',
        text: '로그인 좋은 말로 할 때 하세요~! 🤬',
        icon: 'warning',
      });
      return;
    }
    if (isCount) {
      swal({
        title: '이미 선택하셨습니다...',
        text: '당신을 기다리고 있는 맛있는 밥 약속이 곧 성사됩니다 😘',
        icon: 'success',
      });
      return;
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLocationChange = (props: string) => {
    setModalData({
      ...modalData,
      restaurantLocation: props,
    });
  };

  const handleInputTextChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setModalData({
      ...modalData,
      title: event.target.value,
    });
  };

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setModalData({
      ...modalData,
      contents: event.target.value,
    });
  };

  const handleRecruitmentTimeChange = (
    event: React.ChangeEvent<HTMLButtonElement>,
  ) => {
    setModalData({
      ...modalData,
      recruitmentTime: event.target.value,
    });
  };

  const handleMaxPeopleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setModalData({
      ...modalData,
      maxPeople: parseInt(event.target.value, 10),
    });
  };

  return (
    <S.WikiContainer>
      <S.WikiHeader>
        <S.Title>
          <S.Primary>같이 먹을 사람</S.Primary> 구해요
        </S.Title>
        <S.WikiButton
          type="button"
          onClick={openModal}
        >
          밥 약속 만들기
        </S.WikiButton>
      </S.WikiHeader>

      <S.Contents color="white">
        {data &&
          data.map((item: Root) => {
            const { id } = item;
            const { title, joined, contents, location, people, time } =
              item as WithProp;
            return (
              <ItemWrapper key={id}>
                <WithItem
                  id={id}
                  title={title}
                  contents={contents}
                  location={location}
                  people={people}
                  time={time}
                  joined={joined}
                />
              </ItemWrapper>
            );
          })}
      </S.Contents>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onLocationChange={handleLocationChange}
        onTitleChange={handleInputTextChange}
        onContentsChange={handleTextareaChange}
        onRecruitmentTimeChange={handleRecruitmentTimeChange}
        onMaxPeopleChange={handleMaxPeopleChange}
      />
    </S.WikiContainer>
  );
};

export default index;
