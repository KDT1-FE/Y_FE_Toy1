import React, { useRef } from 'react';
import styled from 'styled-components';
import GalleryButton from '../GalleryButton/index';

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
  handleDelete: (id: string, category: string) => void;
  updateModalID: string | null;
  openUpdateModal: (id: string) => void;
  closeUpdateModal: () => void;
  deleteModalID: string | null;
  openDeleteModal: (id: string) => void;
  closeDeleteModal: () => void;
  initialValue: string;
}

// styled-components
const Item = styled.div`
  width: var(--length);
  height: var(--length);
`;

const ItemImage = styled.img`
  width: 100%;
  height: 100%;

  object-fit: cover;
  transition: all 0.3s;
`;

const ItemHover = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;

  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;

  background: rgba(0, 0, 0, 0.5);
  visibility: hidden;
`;

const ItemWrapper = styled.div`
  --length: 14rem;
  width: var(--length);
  height: var(--length);

  position: relative;

  border-radius: 1rem;
  box-shadow: 2px 3px 5px 0 gray;
  box-sizing: border-box;
  overflow: hidden;

  &:hover ${ItemHover} {
    visibility: visible;
  }

  &:hover ${ItemImage} {
    transform: scale(1.1);
  }
`;

const ContentWrapper = styled.div`
  width: 14rem;

  position: absolute;
  bottom: 0;
  left: 0;

  margin: 1rem;
`;

const Title = styled.h1`
  width: 11.7rem;
  line-height: 1.3;
  font-size: 1.8rem;
  color: var(--color-white);
  margin-bottom: 0.8rem;

  @media screen and (min-width: 1600px) {
    --length: 17rem;
    width: 14.6rem;
    font-size: 2.3rem;
  }
`;

const Content = styled.p`
  width: 11.7rem;
  font-size: 0.9rem;
  color: #d0d0d0;
  margin-bottom: 0.5rem;
  white-space: pre-line;
  line-height: 1.3;

  @media screen and (min-width: 1600px) {
    --length: 17rem;
    width: 14.6rem;
    font-size: 1.2rem;
  }
`;

// Component
const GalleryItems: React.FC<OwnProps> = ({
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
  return (
    <ItemWrapper>
      <Item>
        <ItemImage
          src={photo}
          alt={restaurant}
        />
      </Item>
      <ItemHover>
        <GalleryButton
          id={id}
          restaurant={restaurant}
          location={location}
          photo={photo}
          category={category}
          handleDelete={handleDelete}
          updateModalID={updateModalID}
          openUpdateModal={openUpdateModal}
          closeUpdateModal={closeUpdateModal}
          deleteModalID={deleteModalID}
          openDeleteModal={openDeleteModal}
          closeDeleteModal={closeDeleteModal}
          initialValue={initialValue}
        />
        <ContentWrapper>
          <Title>{restaurant}</Title>
          <Content>{location}</Content>
        </ContentWrapper>
      </ItemHover>
    </ItemWrapper>
  );
};

export default GalleryItems;
