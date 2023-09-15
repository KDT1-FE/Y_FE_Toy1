import { Link } from 'react-router-dom';

const NavDetail = () => {
  return (
    <ul className="nav__detail">
      <li className="nav__detail__item">
        <Link to={'/company/notice'} className="nav__detail__link on">
          공지사항
        </Link>
      </li>
      <li className="nav__detail__item">
        <Link to={'/company/chart'} className="nav__detail__link">
          회사 조직도
        </Link>
      </li>
      <li className="nav__detail__item">
        <Link to={'/company/bylaws'} className="nav__detail__link">
          회사 내규
        </Link>
      </li>
    </ul>
  );
};

export default NavDetail;
