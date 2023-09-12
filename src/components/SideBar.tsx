import '../scss/components/_sidebar.scss';
import { Link } from 'react-router-dom';

const SideBar = (): JSX.Element => {
  return (
    <>
      <aside className="nav">
        <ul className="nav__depth">
          <li className="nav__depth__item on">
            <Link to={'/'} className="nav__depth__link">
              <img src="./src/assets/home.svg" alt="홈" className="nav__depth__logo" />
              Home
            </Link>
          </li>
          <li className="nav__depth__item">
            <Link to={'/company'} className="nav__depth__link" data-type="toggle">
              <img src="./src/assets/company.svg" alt="회사 소개" className="nav__depth__logo" />
              회사 소개
            </Link>
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
          </li>
          <li className="nav__depth__item">
            <Link to={'/project'} className="nav__depth__link">
              <img src="./src/assets/project.svg" alt="프로젝트" className="nav__depth__logo" />
              프로젝트
            </Link>
          </li>
          <li className="nav__depth__item">
            <Link to={'/gallery'} className="nav__depth__link">
              <img src="./src/assets/gallery.svg" alt="갤러리" className="nav__depth__logo" />
              갤러리
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default SideBar;
