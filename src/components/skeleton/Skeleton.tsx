import React from 'react';
import styled from 'styled-components';

// styled-components
const Skeleton = styled.div`
  &.skeleton {
    position: relative;
    overflow: hidden;
    border-radius: 10px;
    background-color: #e7e7e7;
  }

  &.skeleton::after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-image: linear-gradient(
      270deg,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.1),
      rgba(0, 0, 0, 0)
    );
    transform: translateX(-100%);
    animation: skeleton-loader 2s infinite;
  }

  &.title {
    width: 40%;
    height: 60px;
  }

  &.button {
    width: 8rem;
    height: 3rem;
    border-radius: 30px;

    transform: translateY(1px);
  }

  &.viewer {
    box-sizing: border-box;
    width: 100%;
    height: 60vh;
    margin-top: 50px;
    padding: 20px 30px 40px;
    border-radius: 15px;
  }

  &.item {
    --length: 14rem;
    width: var(--length);
    height: var(--length);
    border-radius: 1rem;
    box-sizing: border-box;
  }

  @keyframes skeleton-loader {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;

const SkeletonElement = ({ type }: { type: string }) => {
  const classes = `skeleton ${type}`;

  return <Skeleton className={classes} />;
};

export default SkeletonElement;
