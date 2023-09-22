import React from 'react';
import styled from 'styled-components';
import swal from 'sweetalert';
import { useRecoilValue } from 'recoil';
import { isLoginSelector } from '../../../recoil/authRecoil';
import DeleteModal from '../Modal/DeleteModal';
import UpdateModal from '../Modal/UpdateModal';
import UpdateIconSvg from '../../../assets/UpdateIcon.svg';
import DeleteIconSvg from '../../../assets/DeleteIcon.svg';

// type
export interface Root {
  id: string;
}

export interface OwnProps {
  id: string;
  restaurant: string;
  location: string;
  photo: string;
  category: string;
  initialValue: string;
  handleDelete: (id: string, category: string) => void;
  updateModalID: string | null;
  openUpdateModal: (id: string) => void;
  closeUpdateModal: () => void;
  deleteModalID: string | null;
  openDeleteModal: (id: string) => void;
  closeDeleteModal: () => void;
}

const ButtonWrapper = styled.div`
  display: flex;
  gap: 0.3rem;

  position: absolute;
  top: 0;
  right: 0;

  margin: 0.5rem;
`;

const Button = styled.button`
  vertical-align: middle;

  font-size: 0.5rem;
  font-weight: 700;
  border: none;
  border-radius: 1rem;
  outline: none;
  background-color: var(--color-primary);
  cursor: pointer;
  padding: 0.2rem 0.5rem;
`;

const GalleryButton: React.FC<OwnProps> = ({
  id,
  restaurant,
  location,
  photo,
  category,
  handleDelete,
  updateModalID,
  openUpdateModal,
  closeUpdateModal,
  deleteModalID,
  openDeleteModal,
  closeDeleteModal,
  initialValue,
}) => {
  const isLogin = useRecoilValue(isLoginSelector);
  return (
    <ButtonWrapper>
      <Button
        onClick={() => {
          if (!isLogin) {
            return swal({
              title: '로그인이 필요합니다.',
              text: '로그인 좋은 말로 할 때 하세요~! 🤬',
              icon: 'warning',
            });
          }
          return openUpdateModal(id);
        }}
      >
        <img
          src={UpdateIconSvg}
          alt="UpdateIcon"
        />
        변경
      </Button>
      {updateModalID === id && (
        <UpdateModal
          id={id}
          restaurant={restaurant}
          location={location}
          photo={photo}
          category={category}
          closeUpdateModal={closeUpdateModal}
          initialValue={initialValue}
        />
      )}
      <Button
        onClick={() => {
          if (!isLogin) {
            return swal({
              title: '로그인이 필요합니다.',
              text: '로그인 좋은 말로 할 때 하세요~! 🤬',
              icon: 'warning',
            });
          }
          return openDeleteModal(id);
        }}
      >
        <img
          src={DeleteIconSvg}
          alt="DeleteIcon"
        />
        삭제
      </Button>
      {deleteModalID === id && (
        <DeleteModal
          id={id}
          restaurant={restaurant}
          category={category}
          handleDelete={handleDelete}
          closeDeleteModal={closeDeleteModal}
        />
      )}
    </ButtonWrapper>
  );
};

export default GalleryButton;
