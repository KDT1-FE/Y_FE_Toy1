import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import SideBar from './components/SideBar';

function App() {
  return (
    <>
      <Header />
      <SideBar />
      <Outlet />
    </>
  );
}

export default App;
