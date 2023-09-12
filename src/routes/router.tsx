import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Wiki from '../pages/Wiki';
import Gallery from '../pages/Gallery';

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
      },
      {
        path: 'gallery',
        element: <Gallery />,
        children: [
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
    ],
  },
]);
