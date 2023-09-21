import { useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderDropDown from './HeaderDropDown';
import AttendanceModal from './Attendance/AttendanceModal';
import { useSelector } from 'react-redux/es/hooks/useSelector';

import '../scss/components/_headerDropDown.scss';
import '../scss/components/_header.scss';

interface StateValue {
  isLogin: boolean;
  name: string;
  email: string;
}

interface State {
  loginUpdate: StateValue;
}

const Header = (): JSX.Element => {
  const [dropDownOpen, setDropDownOpen] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

  const loginState = useSelector((state: State) => {
    const isLogin = state.loginUpdate.isLogin;
    const name = state.loginUpdate.name;

    return { isLogin, name };
  });

  return (
    <>
      <header className="header shadow">
        <div className="header__logo">
          <Link to="/">
            <span> HIGH FIVE</span>
            {/* <img src="" alt="" />*/}
          </Link>
        </div>
        <div className="header__user">
          {loginState.isLogin ? (
            <div
              className="header__user-info"
              onClick={() => {
                setDropDownOpen(!dropDownOpen);
              }}>
              <div className="header__user-info-img"></div>
              <span className="header__user-info-name">{loginState.name}</span>
            </div>
          ) : (
            <Link to="/login">
              <button className="header__user-login-btn btn">로그인</button>
            </Link>
          )}
        </div>

        {dropDownOpen && <HeaderDropDown setModal={setModal} />}
      </header>
      {modal && <AttendanceModal isOpen={modal} onClose={() => setModal(false)} />}
    </>
  );
};

export default Header;
