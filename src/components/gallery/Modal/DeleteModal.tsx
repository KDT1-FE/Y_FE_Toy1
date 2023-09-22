import React from 'react';
import styled from 'styled-components';
import warning from '../../../assets/warning.png';

// type
export interface Root {
  id: string;
}

export interface OwnProps {
  id: string;
  restaurant: string;
  category: string;
  handleDelete: (id: string, category: string) => void;
  closeDeleteModal: () => void;
}

// styled components
const ModalBackground = styled.div`
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
`;

const ModalWindow = styled.div`
  width: 420px;
  height: 250px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  position: absolute;
  top: 50%;
  left: 50%;

  background-color: var(--color-white);
  border-radius: 20px;
  overflow: hidden;
  transform: translate(-50%, -50%);
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;
`;

const WarningIcon = styled.img`
  width: 50px;
`;

const Title = styled.h1`
  font-size: 1.7rem;
  font-weight: 700;
  text-align: center;
  color: #ee404c;
`;

const Text = styled.div`
  font-size: 1rem;
  line-height: 1.5;

  & > span {
    color: #ee404c;
  }
`;

const ButtonWrapper = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 1rem;
`;

const Button = styled.button`
  width: 90px;
  padding: auto 0.8rem;
  background-color: var(--color-primary);
  font-size: 1.2rem;
  color: var(--color-black);
  border: 2px solid var(--color-primary);
  border-radius: 4px;
  box-sizing: border-box;
  transition: all 0.2s linear;

  &:hover {
    background-color: var(--color-white);
    color: var(--color-black);
    cursor: pointer;
  }
`;

const DeleteModal: React.FC<OwnProps> = ({
  id,
  restaurant,
  category,
  handleDelete,
  closeDeleteModal,
}) => {
  return (
    <ModalBackground
      onClick={() => {
        closeDeleteModal();
      }}
    >
      <ModalWindow
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <Header>
          <WarningIcon src={warning} />
          <Title>정말 삭제하시겠습니까?</Title>
        </Header>
        <Text>
          선택하신 맛집은 <span>{restaurant}</span> 입니다. <br />
          삭제한 맛집은 복구 불가능합니다.
        </Text>
        <ButtonWrapper>
          <Button
            onClick={() => {
              closeDeleteModal();
            }}
          >
            취소
          </Button>
          <Button
            onClick={() => {
              handleDelete(id, category);
            }}
          >
            삭제
          </Button>
        </ButtonWrapper>
      </ModalWindow>
    </ModalBackground>
  );
};

export default DeleteModal;
