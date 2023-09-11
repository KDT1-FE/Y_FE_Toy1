import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Root from 'pages/Root';
import { SignUp } from 'pages/SignUp';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
    },
    {
      path: '/signup',
      element: <SignUp />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
