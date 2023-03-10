import { Amplify, Hub, Storage } from 'aws-amplify';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import awsExports from './aws-exports';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { routes } from './routes';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { authEventListener } from 'api/authen/authEventListener';
import { ConfiguredToaster } from 'components/ConfiguredToaster';

Amplify.configure(awsExports);
Storage.configure({ track: true });
Hub.listen('auth', authEventListener);

const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Authenticator.Provider>
      <RouterProvider router={router} />
      <ConfiguredToaster />
    </Authenticator.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
