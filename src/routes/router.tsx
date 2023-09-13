import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Wiki from '../pages/Wiki';
import Gallery from '../pages/Gallery/Gallery';
import Member from '../pages/Gallery/Member';
import Project from '../pages/Gallery/Project';

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
            index: true,
            element: <Member />,
          },
          {
            path: 'members',
            element: <Member />,
          },
          {
            path: 'projects',
            element: <Project />,
          },
        ],
      },
    ],
  },
]);
