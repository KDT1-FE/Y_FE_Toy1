import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Gallery from '../pages/Gallery';
import Wiki from '../pages/wiki/Wiki';
import Info from '../pages/wiki/Info';
import Team from '../pages/wiki/Team';
import Login from '../pages/Login';
import Join from '../pages/Join';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // errorElement:
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'wiki',
        element: <Wiki />,
        children: [
          {
            index: true,
            element: <Info />,
          },
          {
            path: 'info',
            element: <Info />,
          },
          {
            path: 'team',
            element: <Team />,
          },
        ],
      },
      {
        path: 'gallery',
        element: <Gallery />,
        children: [
          {
            index: true,
            element: <div>Gallery</div>,
          },
          {
            path: 'profile',
            element: <div>Profile</div>,
          },
          {
            path: 'achievement',
            element: <div>Achievement</div>,
          },
        ],
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'join',
        element: <Join />,
      },
    ],
  },
]);
