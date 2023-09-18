import { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavDetail } from './aside';
import { AiFillHome } from 'react-icons/ai';
import { BsFillBuildingFill } from 'react-icons/bs';
import { FaListUl } from 'react-icons/fa6';
import { HiPhotograph } from 'react-icons/hi';

import '../scss/components/_sidebar.scss';

const SideBar = (): JSX.Element => {
  const [isShow, setIsShow] = useState(false);

  const toggleShowDetail = () => {
    setIsShow(!isShow);
  };

  return (
    <>
      <aside className="nav">
        <ul className="nav__depth">
          <li className="nav__depth__item on">
            <Link to={'/'} className="nav__depth__link">
              <AiFillHome className="nav__depth__logo" />
              Home
            </Link>
          </li>
          <li className="nav__depth__item">
            <button
              className={`nav__depth__btn ${isShow ? 'show' : ''}`}
              data-type="toggle"
              type="button"
              onClick={toggleShowDetail}>
              <BsFillBuildingFill className="nav__depth__logo" />
              회사 소개
            </button>
            {isShow ? <NavDetail /> : ''}
          </li>
          <li className="nav__depth__item">
            <Link to={'/project'} className="nav__depth__link">
              <FaListUl className="nav__depth__logo" />
              프로젝트
            </Link>
          </li>
          <li className="nav__depth__item">
            <Link to={'/gallery'} className="nav__depth__link">
              <HiPhotograph className="nav__depth__logo" />
              갤러리
            </Link>
          </li>
          <li className="nav__depth__item">
            <Link to={'/attendance'} className="nav__depth__link">
              <img src="./src/assets/clock.svg" alt="근태관리" className="nav__depth__logo" />
              근태관리
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default SideBar;
