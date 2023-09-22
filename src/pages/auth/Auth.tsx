import { Outlet } from 'react-router-dom';
import SideBar from '../../components/SideBar';
import { MainContainer } from '../../styles/commonComponents';

const Auth = () => {
  return (
    <MainContainer>
      <SideBar />
      <Outlet />
    </MainContainer>
  );
};

export default Auth;
