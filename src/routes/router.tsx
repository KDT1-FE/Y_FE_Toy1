import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Gallery from '../pages/Gallery';
import { Wiki } from '../pages/Wiki';

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
      },
    ],
  },
]);
