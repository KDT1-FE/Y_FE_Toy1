import { useState } from 'react';
import { Link } from 'react-router-dom';
import NavDetail from '@components/Aside/NavDetail';
import { AiFillHome, AiOutlineRight } from 'react-icons/ai';
import { BsFillBuildingFill } from 'react-icons/bs';
import { FaListUl } from 'react-icons/fa6';
import { HiPhotograph } from 'react-icons/hi';
import { BiTime } from 'react-icons/bi';

import '@scss/components/_sidebar.scss';

const navItems = [
  { name: 'Home', path: '/', icon: <AiFillHome className="nav-depth__logo" /> },
  { name: '회사 소개', path: '#', icon: <BsFillBuildingFill className="nav-depth__logo" /> },
  { name: '프로젝트', path: '/project', icon: <FaListUl className="nav-depth__logo" /> },
  { name: '갤러리', path: '/gallery', icon: <HiPhotograph className="nav-depth__logo" /> },
  { name: '근태관리', path: '/attendance', icon: <BiTime className="nav-depth__logo" /> },
];

const SideBar = (): JSX.Element => {
  const [isShow, setIsShow] = useState(false);
  const [selectedPath, setSelectedPath] = useState<string>('');

  const toggleShowDetail = () => {
    setIsShow(!isShow);
  };
  const handleItemClick = (path: string) => {
    setSelectedPath(path);
    if (selectedPath === '회사 소개') toggleShowDetail();
  };

  return (
    <>
      <aside className="nav">
        <ul className="nav-depth">
          {navItems.map(item => (
            <li
              key={item.name}
              className={`nav-depth__item ${selectedPath === item.path ? 'active' : ''}`}
              onClick={() => handleItemClick(item.path)}>
              {item.name === '회사 소개' ? (
                <>
                  <button
                    className={`nav-depth__btn ${isShow ? 'show' : ''}`}
                    type="button"
                    onClick={() => toggleShowDetail()}>
                    {item.icon}
                    {item.name}
                    <AiOutlineRight className="nav-depth__icon" />
                  </button>
                  {isShow ? <NavDetail /> : ''}
                </>
              ) : (
                <Link to={item.path} className="nav-depth__link">
                  {item.icon}
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default SideBar;
