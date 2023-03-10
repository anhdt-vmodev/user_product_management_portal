import { useAuthenticator } from '@aws-amplify/ui-react';
import { ROUTES } from 'myConstants';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useGuestOnly = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(ROUTES.home);
    }
  }, [user, navigate]);
};
