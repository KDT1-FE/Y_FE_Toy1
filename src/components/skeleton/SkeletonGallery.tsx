import React from 'react';
import styled from 'styled-components';
import SkeletonElement from './Skeleton';

const GallerySkeleton = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem 3%;

  width: 1030px;
  height: 30rem;
  margin-top: 20px;
`;

const SkeletonGallery = () => {
  return (
    <GallerySkeleton>
      <SkeletonElement type="item" />
      <SkeletonElement type="item" />
      <SkeletonElement type="item" />
      <SkeletonElement type="item" />
      <SkeletonElement type="item" />
      <SkeletonElement type="item" />
      <SkeletonElement type="item" />
      <SkeletonElement type="item" />
    </GallerySkeleton>
  );
};

export default SkeletonGallery;
