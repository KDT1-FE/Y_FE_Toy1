import { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavDetail } from './aside';
import { AiFillHome, AiOutlineRight } from 'react-icons/ai';
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
        <ul className="nav-depth">
          <li className="nav-depth__item on">
            <Link to={'/'} className="nav-depth__link">
              <AiFillHome className="nav-depth__logo" />
              Home
            </Link>
          </li>
          <li className="nav-depth__item">
            <button className={`nav-depth__btn ${isShow ? 'show' : ''}`} type="button" onClick={toggleShowDetail}>
              <BsFillBuildingFill className="nav-depth__logo" />
              회사 소개
              <AiOutlineRight className="nav-depth__icon" />
            </button>
            {isShow ? <NavDetail /> : ''}
          </li>
          <li className="nav-depth__item">
            <Link to={'/project'} className="nav-depth__link">
              <FaListUl className="nav-depth__logo" />
              프로젝트
            </Link>
          </li>
          <li className="nav-depth__item">
            <Link to={'/gallery'} className="nav-depth__link">
              <HiPhotograph className="nav-depth__logo" />
              갤러리
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default SideBar;
