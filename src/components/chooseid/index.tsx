import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { findAccesKey } from '../../hooks/getStorageAuthData';
import StyledHeader from '../common/Header';
import Footer from '../common/Footer';
import ChooseEmailButton from './ChooseEmailButton';
import loginImg from '../../assets/yelloBg.avif';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 90vh;
  margin-top: 4.6rem;

  background-image: url(${loginImg});
  background-size: cover;
  background-repeat: no-repeat;

  gap: 1rem;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 5rem 0;
  padding: 1.5rem;
  border-radius: 1rem;
  border: 3px solid var(--color-beige);

  background-color: #ffd850;
  max-width: 20rem;
  width: 60%;
  height: 8rem;
  z-index: 2;

  .emailEnter {
    margin-bottom: 2rem;
  }
`;

const OtherLink = styled.div`
  .otherLink {
    color: #007edb;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const viewId = () => {
  const ids = [];
  const keys = findAccesKey();
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    const value = localStorage.getItem(key);
    ids.push(value);
  }
  return ids;
};

const index = () => {
  const ids = viewId();

  return (
    <>
      <StyledHeader transparent="false" />
      <PageContainer>
        <PageWrapper>
          {ids &&
            ids.map((id: string | null) => {
              const data = id as string;
              return (
                <div
                  key={data}
                  className="emailEnter"
                >
                  <ChooseEmailButton data={data} />
                </div>
              );
            })}
          <OtherLink>
            <NavLink
              to="/login"
              className="otherLink"
            >
              다른 아이디로 접속하기
            </NavLink>
          </OtherLink>
        </PageWrapper>
      </PageContainer>
      <Footer />
    </>
  );
};

export default index;
