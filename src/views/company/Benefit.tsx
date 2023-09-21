import React from 'react';
import '../../scss/benefit.scss';
import { BsHospital } from 'react-icons/bs';
import {
  PiClockAfternoonBold,
  PiBabyBold,
  PiTreePalmDuotone,
  PiBuildingsBold,
  PiHandHeartBold,
  PiConfettiDuotone,
  PiGuitarBold,
} from 'react-icons/pi';

const Benefit = (): JSX.Element => {
  return (
    <div className="benefit">
      <div className="benefit__top">
        <h1>복리후생</h1>
      </div>

      <div className="inner">
        <h3 className="subtitle">HIGHFIVE는 직원들이 마음 편히 몰입하고 성장할 수 있도록 지원합니다.</h3>

        <dl className="benefit__list">
          <dt className="icon">
            <PiClockAfternoonBold />
          </dt>
          <div className="benefit__list__text-box">
            <dt className="title">
              <i>Work!</i>{' '}
              <dfn>
                직원 중심의 조직 문화 <PiBuildingsBold />
              </dfn>
            </dt>
            <dd>플렉서블 탄력근무제 / 재택근무</dd>
            <dd>수평적 조직문화</dd>
            <dd>사내 스터디 및 교육비 지원</dd>
            <dd>인센티브 및 성과금</dd>
          </div>
        </dl>
        <dl className="benefit__list">
          <dt className="icon">
            <PiHandHeartBold />
          </dt>
          <div className="benefit__list__text-box">
            <dt className="title">
              <i>Health! </i>
              <dfn>
                건강한 하이파이브 <BsHospital />
              </dfn>
            </dt>
            <dd>병원 및 편의시설 제휴 / 정기 건강 검진</dd>
            <dd>남녀 수면실 및 휴식 공간 운영</dd>
            <dd>사내 헬스클럽 운영 & 체형 관리 서비스 제공(체형 관리사 상주)</dd>
            <dd>저녁 식대 및 간식비 지원</dd>
          </div>
        </dl>
        <dl className="benefit__list">
          <dt className="icon">
            <PiConfettiDuotone />
          </dt>
          <div className="benefit__list__text-box">
            <dt className="title">
              <i>Family! </i>
              <dfn>
                가족과 함께 행복할 수 있도록 <PiBabyBold />
              </dfn>
            </dt>
            <dd>출산 휴가 및 육아휴직 제도 </dd>
            <dd>생일 선물 및 휴가 지원</dd>
            <dd>경조사 발생 시 경조금, 화환, 휴가 지원</dd>
            <dd>명절 귀향비 지급</dd>
          </div>
        </dl>
        <dl className="benefit__list">
          <dt className="icon">
            <PiTreePalmDuotone />
          </dt>
          <div className="benefit__list__text-box">
            <dt className="title">
              <i>Enjoy! </i>
              <dfn>
                최고의 복지는 휴가 <PiGuitarBold />
              </dfn>
            </dt>
            <dd>자유로운 연차 사용 </dd>
            <dd>전국 유명 콘도 휴양시설 지원 </dd>
            <dd>장기 근속자 휴가 및 휴가비 제공</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default Benefit;
