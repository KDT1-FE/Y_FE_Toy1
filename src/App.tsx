import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Root from 'pages/Root';
import { SignUp } from 'pages/SignUp';
import { Study } from 'pages/Study';
import { SignIn } from 'pages/SignIn';

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
      path: '/signin',
      element: <SignIn />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
