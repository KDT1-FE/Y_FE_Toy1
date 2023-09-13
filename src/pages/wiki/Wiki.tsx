import { Outlet } from 'react-router-dom';
import SideBar from '../../components/SideBar';
import { MainContainer } from '../../styles/commonComponents';

const Wiki = () => {
  return (
    <MainContainer>
      <SideBar />
      <Outlet />
    </MainContainer>
  );
};

export default Wiki;
