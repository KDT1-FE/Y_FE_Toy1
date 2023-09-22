import { Outlet } from 'react-router-dom';
import SideBar from '../../components/SideBar';
import { MainContainer } from '../../styles/commonComponents';

const Gallery = () => {
  return (
    <MainContainer>
      <SideBar />
      <Outlet />
    </MainContainer>
  );
};

export default Gallery;
