import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Gallery from '../pages/Gallery/Gallery';
import Member from '../pages/Gallery/Member';
import Project from '../pages/Gallery/Project';
import RegisterProject from '../pages/Gallery/RegisterProject';
import Wiki from '../pages/wiki/Wiki';
import Info from '../pages/wiki/Info';
import Rule from '../pages/wiki/Rule';
import Team from '../pages/wiki/Team';
import Auth from '../pages/auth/Auth';
import Login from '../pages/auth/Login';
import Join from '../pages/auth/Join';
import Detail from '../pages/detail/Detail';
import Modify from '../pages/mypage/modify';
import Mypage from '../pages/mypage/Mypage';
import UserInfo from '../pages/mypage/UserInfo';
import Notice from '../pages/Notice';
import About from '../pages/about/About';
import Figma from '../pages/about/Figma';
import Notion from '../pages/about/Notion';
import Github from '../pages/about/Github';

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
          {
            path: 'rule',
            element: <Rule />,
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
        path: 'mypage',
        element: <Mypage />,
        children: [
          {
            index: true,
            element: <UserInfo />,
          },
          {
            path: 'userinfo',
            element: <UserInfo />,
          },
          {
            path: 'modify',
            element: <Modify />,
          },
        ],
      },
      {
        path: '/about',
        element: <About />,
        children: [
          {
            index: true,
            element: <Figma />,
          },
          {
            path: 'figma',
            element: <Figma />,
          },
          {
            path: 'notion',
            element: <Notion />,
          },
          {
            path: 'github',
            element: <Github />,
          },
        ],
      },
      {
        path: 'notice/:index',
        element: <Notice />,
      },
      {
        path: 'login',
        element: <Auth />,
        children: [
          {
            index: true,
            element: <Login />,
          },
          {
            path: 'join',
            element: <Join />,
          },
        ],
      },
    ],
  },
]);
