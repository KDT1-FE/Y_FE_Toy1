import React from 'react';
import styled from 'styled-components';
import SkeletonElement from './Skeleton';

const MarkdownSkeleton = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 1070px;
  margin: 0 0 0 5%;
  height: 79vh;

  .HeaderWrapper {
    padding-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    height: 70px;

    display: flex;
    justify-content: space-between;
  }
`;

const SkeletonMarkdown = () => {
  return (
    <MarkdownSkeleton>
      <div className="HeaderWrapper">
        <SkeletonElement type="title" />
        <SkeletonElement type="button" />
      </div>
      <SkeletonElement type="viewer" />
    </MarkdownSkeleton>
  );
};

export default SkeletonMarkdown;
