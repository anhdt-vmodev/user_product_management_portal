import { GuardAuth } from 'components/GuardAuth';

import { SignUpProvider } from 'contexts/SignUpContext';
import Home from 'Home';
import { ROUTES } from 'myConstants';
import { Login } from 'pages/Login';
import ProductCreation from 'pages/ProductCreation';
import ProductDetail from 'pages/ProductDetail';
import Products from 'pages/Products';
import Signup from 'pages/Signup';
import { Navigate } from 'react-router-dom';

export const routes = [
  {
    path: ROUTES.signup,
    element: (
      <SignUpProvider>
        <Signup />
      </SignUpProvider>
    ),
  },

  {
    path: ROUTES.login,
    element: <Login />,
  },

  {
    path: ROUTES.products.list,
    children: [
      {
        path: '',
        element: (
          <GuardAuth>
            <Products />
          </GuardAuth>
        ),
      },
      {
        path: ':id',
        element: (
          <GuardAuth>
            <ProductDetail />
          </GuardAuth>
        ),
      },
      {
        path: 'create',
        element: (
          <GuardAuth>
            <ProductCreation />
          </GuardAuth>
        ),
      },
    ],
  },
  {
    path: ROUTES.home,
    element: (
      <GuardAuth>
        <Home />
      </GuardAuth>
    ),
  },
  {
    path: '*',
    element: <Navigate to={ROUTES.home} replace />,
  },
];
