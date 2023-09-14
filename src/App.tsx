import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import {BoardNav } from 'components/Wiki/BoardNav';
import { BoardContent } from 'components/Wiki/BoardContent';
import { Wiki } from 'components/Wiki/Wiki';
import {Provider} from 'react-redux'
import { store } from 'redux/store';
import Root from 'pages/Root';
import { SignUp } from 'pages/SignUp';
import { Study } from 'pages/Study';
import { WikiDetail } from 'components/Wiki/WikiDetail';
import { PostAdd } from 'components/Wiki/PostAdd';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [{ path: '/study', element: <Study /> }],
    },
    {
      path: '/signup',
      element: <SignUp />,
    },
    {
      path : '/wiki',
      element: 
      <Provider store={store}>
      <Wiki/>,
    </Provider>
    
    },
    {
      path : '/wiki/:boardState/:id',
      element : <Provider store={store}>
      <WikiDetail />,
    </Provider>
    },
    {
      path : '/wiki/:boardState/new',
      element : <Provider store={store}>
      <PostAdd />,
    </Provider>
    }
  ]);
  return <RouterProvider router={router} />;
}

export default App;
