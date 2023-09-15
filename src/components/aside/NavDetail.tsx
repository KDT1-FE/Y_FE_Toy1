import { useState } from 'react';
import { Link } from 'react-router-dom';

interface Link {
  to: string;
  text: string;
}

const NavDetail = () => {
  const [isClicked, setIsClicked] = useState(0);

  const handleClickLink = (index: number) => {
    setIsClicked(index);
  };

  const links = [
    { to: '/company/notice', text: '공지사항' },
    { to: '/company/chart', text: '회사 조직도' },
    { to: '/company/bylaws', text: '회사 내규' },
  ];

  return (
    <ul className="nav__detail">
      {links.map((link: Link, index: number) => (
        <li key={index} className="nav__detail__item">
          <Link
            to={link.to}
            className={`nav__detail__link ${index === isClicked ? 'on' : ''}`}
            onClick={() => {
              handleClickLink(index);
            }}>
            {link.text}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavDetail;
