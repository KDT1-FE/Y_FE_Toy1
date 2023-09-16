import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Gallery from '../pages/Gallery/Gallery';
import Member from '../pages/Gallery/Member';
import Project from '../pages/Gallery/Project';
import RegisterProject from '../pages/Gallery/RegisterProject';
import Wiki from '../pages/wiki/Wiki';
import Info from '../pages/wiki/Info';
import Team from '../pages/wiki/Team';
import Login from '../pages/Login';
import Join from '../pages/Join';
import Detail from '../pages/detail/Detail';

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
        path: 'detail',
        element: <Detail />,
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
            element: <Member />,
          },
          {
            path: 'members',
            element: <Member />,
          },
          {
            path: 'projects',
            children: [
              {
                index: true,
                element: <Project state="ongoing" />,
              },
              {
                path: 'ongoing',
                element: <Project state="ongoing" />,
              },
              {
                path: 'scheduled',
                element: <Project state="scheduled" />,
              },
              {
                path: 'completed',
                element: <Project state="completed" />,
              },
              {
                path: 'add',
                element: <RegisterProject />,
              },
            ],
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
