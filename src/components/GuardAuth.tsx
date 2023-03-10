import { Authenticator } from '@aws-amplify/ui-react';
import { ROUTES } from 'myConstants';
import React from 'react';
import { Navigate } from 'react-router-dom';

interface GuardAuthProps {
  children?: any;
}

const GuardAuth: React.FC<GuardAuthProps> = ({ children }) => {
  return (
    <Authenticator
      initialState="signUp"
      components={{
        SignUp: {
          FormFields() {
            return (
              <>
                <Navigate to={ROUTES.login} />
              </>
            );
          },
        },
      }}
    >
      {children}
    </Authenticator>
  );
};

export { GuardAuth };
