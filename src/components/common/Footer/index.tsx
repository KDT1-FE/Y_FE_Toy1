import React from 'react';
import styled from 'styled-components';
import github from '../../../assets/github-logo.png';
import fastCampus from '../../../assets/fastcampus.png';

const FooterWrapper = styled.footer`
  font-family: 'IBMPlexSansKR-Regular';
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 18rem;
  color: #939393;
  background-color: var(--color-black);
  line-height: 1.4;

  @media screen and (max-width: 1200px) {
    height: 14rem;
    font-size: 0.9rem;
  }

  @media screen and (max-width: 950px) {
    height: 10rem;
    font-size: 0.6rem;
  }
`;

const Heading = styled.h2`
  font-family: 'BMDOHYEON';
  color: var(--color-btn);
  font-size: 1.3rem;
  margin-bottom: 1rem;

  @media screen and (max-width: 1200px) {
    font-size: 1rem;
  }

  @media screen and (max-width: 950px) {
    font-size: 0.9rem;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const LogoImage = styled.img`
  width: 2rem;
  margin-right: 1rem;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <div>
        <Heading>Developer</Heading>
        <div className="company">
          패스트캠퍼스 프론트엔드 개발 1기 토이프로젝트
        </div>
        <div className="developer">
          참여자: 김민섭, 이승현, 한은지, 김다빈, 소유나
        </div>
        <LogoWrapper>
          <a
            href="https://github.com/dabin-Hailey/IKUZO-WIKI"
            target="_blank"
            rel="noreferrer"
          >
            <LogoImage
              src={github}
              alt="github"
            />
          </a>
          <a
            href="https://fastcampus.co.kr/"
            target="_blank"
            rel="noreferrer"
          >
            <LogoImage
              src={fastCampus}
              alt="fastCampus"
            />
          </a>
        </LogoWrapper>
      </div>
    </FooterWrapper>
  );
};

export default Footer;
