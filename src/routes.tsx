import Home from 'Home';
import { ProfilePage } from 'pages/Profile';
import Signup from 'pages/Signup';

export const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
];
