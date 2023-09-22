import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getDataByField, deleteData } from '../../utils/util';
import GalleryItems from './GalleryItem/index';
import PaginationComponent from './Pagination';
import SkeletonGallery from '../skeleton/SkeletonGallery';

// type
export interface Root {
  id: string;
}

export type Props = {
  list: Root[];
};

type State = {
  category: string;
};

export interface OwnProps {
  id: string;
  restaurant: string;
  location: string;
  photo: string;
  category: string;
  initialValue: string;
}

// styled-components
const GalleryList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem 3%;

  width: 1030px;
  height: 30rem;
  margin-top: 20px;
`;

// Component
const GalleryListing = ({ category }: State): JSX.Element => {
  const [list, setList] = useState<Root[]>([]);
  const [updateModalID, setUpdateModalID] = useState<string | null>(null);
  const [deleteModalID, setDeleteModalID] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(true);

  const openUpdateModal = (id: string) => {
    setUpdateModalID(id);
  };

  const closeUpdateModal = () => {
    setUpdateModalID(null);
  };

  const openDeleteModal = (id: string) => {
    setDeleteModalID(id);
  };

  const closeDeleteModal = () => {
    setDeleteModalID(null);
  };

  // 모달에서 사용할 삭제 버튼
  const handleDelete = async (id: string, category: string) => {
    const newList = list.filter(item => {
      return item.id !== id;
    });
    setList(newList);

    await deleteData(
      `data-collection/best-restaurant-collection/${category}-food`,
      id,
    );
  };

  const fetchData = async (category: string) => {
    const data = await getDataByField(
      `data-collection/best-restaurant-collection/${category}-food`,
      'category',
      category,
    );
    setList(data);
    setLoading(false);
  };

  useEffect(() => {
    setTimeout(() => {
      fetchData(category);
    }, 500);
  }, []);

  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = list.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (PageNumber: number) => {
    setLoading(true);
    setCurrentPage(PageNumber);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  if (loading) {
    return <SkeletonGallery />;
  }
  return (
    <div>
      <GalleryList>
        {currentItems.map((item: Root) => {
          const { id } = item;
          const { restaurant, location, photo, category } = item as OwnProps;
          const initialValue = restaurant;
          return (
            <GalleryItems
              key={id}
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
          );
        })}
      </GalleryList>
      <PaginationComponent
        activePage={currentPage}
        totalItems={list.length}
        itemsPerPage={itemsPerPage}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default GalleryListing;
