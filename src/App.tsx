import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Root from 'pages/Root';
import { SignUp } from 'pages/SignUp';
import { Gallery } from 'pages/Gallery';
import { Study } from 'pages/Study';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,

      children: [
        { path: '/study', element: <Study /> },
        { path: '/gallery', element: <Gallery /> },
      ],
    },
    {
      path: '/signup',
      element: <SignUp />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
