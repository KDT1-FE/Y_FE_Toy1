import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Wiki } from 'pages/Wiki';
import { Provider } from 'react-redux';
import { wikiStore } from 'redux/store';
import Root from 'pages/Root';
import { SignUp } from 'pages/SignUp';
import { Gallery } from 'pages/Gallery';
import { Study } from 'pages/Study';
import { WikiDetail } from 'components/Wiki/WikiDetail';
import { PostAdd } from 'components/Wiki/PostAdd';
import { PostEdit } from 'components/Wiki/PostEdit';
import { SignIn } from 'pages/SignIn';
import { Error } from 'pages/Error';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      errorElement: <Error />,
      children: [
        { path: '/study', element: <Study /> },
        { path: '/gallery', element: <Gallery /> },
        {
          path: '/wiki/:boardState/:id',
          element: (
            <Provider store={wikiStore}>
              <WikiDetail />,
            </Provider>
          ),
        },
        {
          path: '/wiki/:boardState/new',
          element: (
            <Provider store={wikiStore}>
              <PostAdd />,
            </Provider>
          ),
        },
        {
          path: '/wiki/:boardState/:id/edit',
          element: (
            <Provider store={wikiStore}>
              <PostEdit />,
            </Provider>
          ),
        },
        {
          path: '/wiki',
          element: (
            <Provider store={wikiStore}>
              <Wiki />,
            </Provider>
          ),
        },
        {
          path: '/wiki/:boardState/:id',
          element: (
            <Provider store={wikiStore}>
              <WikiDetail />,
            </Provider>
          ),
        },
        {
          path: '/wiki/:boardState/new',
          element: (
            <Provider store={wikiStore}>
              <PostAdd />,
            </Provider>
          ),
        },
        {
          path: '/wiki/:boardState/:id/edit',
          element: (
            <Provider store={wikiStore}>
              <PostEdit />,
            </Provider>
          ),
        },
        {
          path: '/wiki',
          element: (
            <Provider store={wikiStore}>
              <Wiki />,
            </Provider>
          ),
        },
      ],
    },
    {
      path: '/signup',
      element: <SignUp />,
    },
    {
      path: '/signin',
      element: <SignIn />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
